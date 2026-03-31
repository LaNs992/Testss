import { createHashRouter, RouterProvider } from "react-router-dom";
import { UsersPage } from "./pages/UsersPage";
import { UserEditPage } from "./pages/UserEditPage";
import { AppProviders } from "./app/providers";

const router = createHashRouter([
  { path: "/", element: <UsersPage /> },
  { path: "/user/:id", element: <UserEditPage /> },
]);

export const App = () => {
  return (
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  );
};
