import { createBrowserRouter } from "react-router";
import Landing from "../routes/Landing";
import App from "../App";
import Demo from "../routes/Demo";
import Preview from "../routes/Preview";
import Help from "../routes/Help";
import PreviewStats from "../routes/PreviewStats";
import PublicLayout from "../routes/layouts/PublicLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "public",
        element: <PublicLayout />,
        children: [
          {
            path: "preview",
            element: <Preview />,
          },
          {
            path: "stats",
            element: <PreviewStats />,
          },
          {
            path: "help",
            element: <Help />,
          },
        ],
      },
      {
        path: "demo",
        element: <Demo />,
      },
    ],
  },
]);

export default router;
