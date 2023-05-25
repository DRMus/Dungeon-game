
// [./LevelConfig/fragments/AreaActions] Анимация появления сообщения "Шаблон сохранен" при нажатии на кнопку
//
// const [showSaveMessage, setShowSaveMessage] = useState<JSX.Element>(<></>);
// const showTimer = useRef<number>(0);
// const handlerSave = () => {
//     if (showTimer.current > 0) {
//       clearTimeout(showTimer.current);
//       showTimer.current = 0;
//     }
//     showTimer.current = setTimeout(() => {
//       showTimer.current = 0;
//     }, 2000);
//     setShowSaveMessage(
//       <p
//         key={showTimer.current}
//         className="absolute opacity-0 select-none -top-10 left-6 text-sm font-normal text-emerald-400 animate-btn"
//       >
//         Шаблон сохранен
//       </p>
//     );
//     saveAreaValues();
//   };
