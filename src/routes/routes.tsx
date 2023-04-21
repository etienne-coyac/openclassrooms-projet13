import { createBrowserRouter } from "react-router-dom";
import App from "../views/App";
import HomePage from "../views/HomePage";
import SignIn from "../views/SignIn";
import User from "../views/User";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: "sign-in",
        element: <SignIn />
      },
      {
        path: "user",
        element: <User />
      }
    ]
  }
]);

export default router;
