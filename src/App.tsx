import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LevelConfig from "./components/LevelConfig/LevelConfig";
import { MainPage } from "./components/MainPage/MainPage";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <MainPage />,
    },
    {
      path: "/config",
      element: <LevelConfig />,
    },
  ],
  {
    basename: import.meta.env.DEV ? "/" : "/Dungeon-game",
  }
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
