import { createBrowserRouter } from "react-router";
import Landing from "../routes/Landing";
import App from "../App";
import Demo from "../routes/Demo";
import Preview from "../routes/Preview";
import Help from "../routes/Help";

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
        path: "preview",
        element: <Preview />,
      },
      {
        path: "demo",
        element: <Demo />,
      },
      {
        path: "help",
        element: <Help />,
      },
    ],
  },
]);

export default router;
