import { createHashRouter, RouterProvider } from "react-router-dom";

const router = createHashRouter([
  { path: "/", element: <UsersPage /> },
  { path: "/user/:id", element: <UserEditPage /> },
]);

export const App = () => {
  return <RouterProvider router={router} />;
};
