import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { UsersPage } from "../pages/UsersPage";
import { UserEditPage } from "../pages/UserEditPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UsersPage />,
  },
  {
    path: "/user/:id",
    element: <UserEditPage />,
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
