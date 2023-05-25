import { useState } from "react";
import { GameView } from "./components/GameView/GameView";

import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
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
    basename: "/",
  }
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
