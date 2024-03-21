import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { useState, useCallback } from "react";
import Users from "../Containers/Users";
import UserTasks from "../Containers/UserTasks";
import RootLayout from "../Containers/Roots";
import ErrorPage from "../Containers/ErrorPage";
import NewTask from "../Containers/NewTask";
import Auth from "../Containers/Auth";
import Subscribe from "../Containers/Subscribe";
import UpdateTask from "../Containers/UpdateTask";
import { AuthContext } from "../context/auth-context";
const routerLongin = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "", element: <Users /> },
      { path: "users", element: <Users /> },
      { path: ":userId/tasks", element: <UserTasks /> },
      { path: "/tasks/new", element: <NewTask /> },
      { path: "/tasks/:taskId", element: <UpdateTask /> },
    ],
  },
]);
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "users", element: <Users /> },
      { path: ":userId/tasks", element: <UserTasks /> },
      { path: "/auth", element: <Auth /> },
      { path: "/subscribe", element: <Subscribe /> },
    ],
  },
]);

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);
  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);
  if (isLoggedIn)
    return (
      <AuthContext.Provider
        value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
      >
        <RouterProvider router={routerLongin} />
      </AuthContext.Provider>
    );
  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
    >
      <RouterProvider router={router} />
    </AuthContext.Provider>
  );
};

export default App;
