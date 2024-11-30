import { createBrowserRouter } from "react-router";
import Landing from "../routes/Landing";
import App from "../App";
import Demo from "../routes/Demo";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
            index: true,
            element: <Landing/>,
        },
        {
            path: "demo",
            element: <Demo/>,
        }
    ],
  },
]);

export default router;
