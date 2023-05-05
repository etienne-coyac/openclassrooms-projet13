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
        path: "login",
        element: <SignIn />
      },
      {
        path: "profile",
        element: <User />
      }
    ]
  }
]);

export default router;
