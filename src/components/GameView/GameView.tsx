import Konva from "konva";
import {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Layer, Rect, Sprite, Stage } from "react-konva";
import { useNavigate } from "react-router";
import useImage from "use-image";

import {
  GameStates,
  IAnimationType,
  ICommandForGame,
  ILevelConfig,
  IObstacles,
  IPosition,
  IPositionResponse,
} from "../../interfaces";

import { MessageContextValues } from "../MainPage/MessageContext";

import storageActions from "../../utils/storageActions";
import coinAnimation from "../../utils/gameViewActions/coinAnimation";
import obstacleSprites from "../../utils/gameViewActions/obstacleSprites";
import changePosition from "../../utils/gameViewActions/changePosition";
import { AnimationType, CharacterConfig, CHARACTER_SPRITE_ANIMATIONS } from "../../utils/constants";
import soundActions from "../../utils/gameViewActions/soundActions";

import EmptyConfig from "./fragments/EmptyConfig";
import CoinsCounter from "./fragments/CoinsCounter";
import GameViewSettings from "./fragments/GameViewSettings";
import LevelFailed from "./fragments/LevelFailed";
import LevelComplete from "./fragments/LevelComplete";
import PlayButton from "./fragments/PlayButton";

import coinSfx from "../../assets/Audio/coin.mp3";
import deathSfx from "../../assets/Audio/death.mp3";
import levelCompleteSfx from "../../assets/Audio/levelComplete.wav";
import BgImagePNG from "../../assets/Background/Floor.png";
import characterPNG from "../../assets/Character/character.png";

import styles from "./GameView.module.scss";

export const GameView = () => {
  const navigate = useNavigate();

  const { runCode, setGameIsOver, isGameRunning, currentCommand } =
    useContext(MessageContextValues);

  const viewRef = useRef<Konva.Stage>(null);
  const characterRef = useRef<Konva.Sprite>(null);
  const keyUpRef = useRef<boolean>(false);
  const keyDownTimeoutRef = useRef<number>();
  const sectionRef = useRef<HTMLInputElement>(null);

  const gameOverRef = useRef<boolean>(false);
  const positionRef = useRef<IPosition>({
    x: CharacterConfig.START_POSITION_X,
    y: CharacterConfig.START_POSITION_Y,
  });
  const coinsCountRef = useRef<number>(0);

  const [posX, setPosX] = useState<number>(CharacterConfig.START_POSITION_X);
  const [posY, setPosY] = useState<number>(CharacterConfig.START_POSITION_Y);
  const [animationType, setAnimationType] = useState<IAnimationType>(AnimationType.IDLE);
  const [coinsCount, setCoinsCount] = useState<number>(0);
  const [gameState, setGameState] = useState<GameStates>(1);
  const [gameOverView, setGameOverView] = useState<JSX.Element | null>(null);
  const [levelConfig, setLevelConfig] = useState<ILevelConfig | null>(
    storageActions.getLevelConfig()
  );

  const obstacles: IObstacles = useMemo(() => obstacleSprites(levelConfig), [levelConfig]);

  const [bgImage] = useImage(BgImagePNG);
  const [characterImage] = useImage(characterPNG);
  const coinGetSound = useMemo(() => new Audio(coinSfx), [coinSfx]);
  const deathSound = useMemo(() => new Audio(deathSfx), [deathSfx]);
  const levelCompleteSound = useMemo(() => new Audio(levelCompleteSfx), [levelCompleteSfx]);

  const arrowTimeout = () =>
    setTimeout(() => {
      keyDownTimeoutRef.current = undefined;
      if (keyUpRef.current) {
        setAnimationType(AnimationType.IDLE);
        keyUpRef.current = false;
      }
    }, 500);

  const playCompleteSound = () => {
    soundActions.playSound(levelCompleteSound);
    setAnimationType(AnimationType.IDLE);
    coinGetSound.removeEventListener("ended", playCompleteSound);
  };

  const handleUserKeyPress = useCallback(
    (message: ICommandForGame, operationCount: number = 1) => {
      if (!levelConfig || operationCount > message.count || gameOverRef.current) {
        if (gameOverRef.current) {
          setGameIsOver(true);
        }
        setAnimationType((prev) => {
          if (prev !== AnimationType.DEAD) {
            prev = AnimationType.IDLE;
          }
          return prev;
        });

        return;
      }

      let absolutePosition: IPosition = positionRef.current;

      let response: IPositionResponse = { code: 0, id: "" };

      switch (message.command) {
        case "up":
          response = changePosition(characterRef, absolutePosition, setPosY, "y", -1, levelConfig);
          setAnimationType(AnimationType.UP);
          break;
        case "down":
          response = changePosition(characterRef, absolutePosition, setPosY, "y", 1, levelConfig);
          setAnimationType(AnimationType.DOWN);
          break;
        case "left":
          response = changePosition(characterRef, absolutePosition, setPosX, "x", -1, levelConfig);
          setAnimationType(AnimationType.LEFT);
          break;
        case "right":
          response = changePosition(characterRef, absolutePosition, setPosX, "x", 1, levelConfig);
          setAnimationType(AnimationType.RIGHT);
          break;

        default:
          break;
      }

      switch (response.code) {
        case 1:
          gameOverRef.current = true;
          setTimeout(() => setAnimationType(AnimationType.DEAD), 100);
          setTimeout(() => {
            characterRef.current?.stop();
          }, 670);
          setGameState(0);
          soundActions.playSound(deathSound);
          break;
        case 2:
          let currentCoinsCount = coinsCountRef.current + 1;
          let sprite = viewRef.current?.findOne(`#${response.id}`) as Konva.Sprite;

          if (!sprite) break;

          if (currentCoinsCount === obstacles.coins) {
            setGameState(2);
            gameOverRef.current = true;
            coinGetSound.addEventListener("ended", playCompleteSound);
          }
          soundActions.playSound(coinGetSound);
          coinAnimation(sprite, response);
          coinsCountRef.current = currentCoinsCount;
          setCoinsCount(currentCoinsCount);
          break;
        default:
          break;
      }

      setTimeout(() => {
        handleUserKeyPress(message, operationCount + 1);
      }, CharacterConfig.ANIMATION_DURATION_SECONDS * 1000);
    },
    [posX, posY, levelConfig]
  );

  const restartGame = () => {
    characterRef.current?.to({
      duration: 0,
      x: CharacterConfig.START_POSITION_X,
      y: CharacterConfig.START_POSITION_Y,
    });
    characterRef.current?.start();
    keyDownTimeoutRef.current = 0;
    gameOverRef.current = false;
    coinsCountRef.current = 0;
    soundActions.stopSound(levelCompleteSound);
    soundActions.stopSound(deathSound);
    setCoinsCount(0);
    setPosX(CharacterConfig.START_POSITION_X);
    setPosY(CharacterConfig.START_POSITION_Y);
    setAnimationType(AnimationType.IDLE);
    setGameOverView(null);
    setGameState(1);
    setGameIsOver(false);
    setLevelConfig(storageActions.getLevelConfig());
  };

  const changeGameState = () => {
    clearTimeout(keyDownTimeoutRef.current);
    if (gameState === 0) {
      setTimeout(() => setGameOverView(<LevelFailed restartGame={restartGame} />), 300);
      return;
    }
    if (gameState === 2) {
      setTimeout(() => setGameOverView(<LevelComplete restartGame={restartGame} />), 400);
      return;
    }
  };

  const runGame = () => {
    restartGame();
    setTimeout(() => {
      runCode();
    }, 100);
  };

  useEffect(() => {
    changeGameState();
  }, [gameState]);

  useEffect(() => {
    positionRef.current = { x: posX, y: posY };
  }, [posX, posY]);

  useEffect(() => {
    if (!currentCommand) {
      return;
    }
    handleUserKeyPress(currentCommand);
  }, [currentCommand]);

  useLayoutEffect(() => {
    characterRef.current?.start();
  }, [characterImage]);

  return (
    <section
      className={
        "w-1/2 h-full flex flex-col items-center justify-between relative " + styles.gameViewSection
      }
      onClick={() => sectionRef.current?.focus()}
    >
      <input type="text" name="" ref={sectionRef} className="w-0 h-0" />
      {levelConfig ? (
        <>
          <header className="py-3 px-4 w-full flex justify-between items-center">
            <GameViewSettings />
            <CoinsCounter currentCoinsCount={coinsCount} allCoins={obstacles.coins} />
          </header>
          <main className="stage flex items-center grow">
            <div className="relative">
              {gameOverView}
              <Stage height={levelConfig.height()} width={levelConfig.width()} ref={viewRef}>
                <Layer>
                  <Rect
                    fillPatternImage={bgImage as HTMLImageElement}
                    width={levelConfig.width()}
                    height={levelConfig.height()}
                  />
                  {obstacles?.elements}
                  <Sprite
                    ref={characterRef}
                    width={CharacterConfig.CHARACTER_SIZE}
                    height={CharacterConfig.CHARACTER_SIZE}
                    x={CharacterConfig.START_POSITION_X}
                    y={CharacterConfig.START_POSITION_Y}
                    scale={{ x: 0.65, y: 0.65 }}
                    image={characterImage as HTMLImageElement}
                    animations={CHARACTER_SPRITE_ANIMATIONS}
                    frameRate={7}
                    frameIndex={0}
                    animation={animationType}
                  />
                </Layer>
              </Stage>
            </div>
          </main>
          <footer className="flex items-center justify-center w-full py-5 px-4">
            <PlayButton onClick={runGame} disabled={isGameRunning} />
          </footer>
        </>
      ) : (
        <EmptyConfig navigate={navigate} />
      )}
    </section>
  );
};
