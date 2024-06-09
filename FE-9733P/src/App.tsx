import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import HomePage from "./pages/HomePage";
import UsersPage, { loader as usersLoader } from "./pages/UsersPage";
import UserDetailPage, { loader as userLoader } from "./pages/UserDetailPage";
import AlbumDetailPage, {
  loader as albumLoader,
} from "./pages/AlbumDetailPage";
import PostDetailPage, { loader as postLoader } from "./pages/PostDetailPage";
import FavoritesPage from "./pages/FavoritesPage";
import Navbar from "./components/Navbar";

const Layout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "users", element: <UsersPage />, loader: usersLoader },
      {
        path: "users/:userId",
        element: <UserDetailPage />,
        loader: userLoader,
      },
      {
        path: "users/:userId/posts/:postId",
        element: <PostDetailPage />,
        loader: postLoader,
      },
      {
        path: "users/:userId/albums/:albumId",
        element: <AlbumDetailPage />,
        loader: albumLoader,
      },
      { path: "favorites", element: <FavoritesPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
