import { ControlView } from "../ControlView/ControlView";
import { GameView } from "../GameView/GameView";

import styles from "./MainPage.module.scss";
import { MessageContextProvider } from "./MessageContext";

export const MainPage = () => {
  return (
    <section className={styles.mainLayout}>
      <MessageContextProvider>
        <GameView />
        <ControlView />
      </MessageContextProvider>
    </section>
  );
};
