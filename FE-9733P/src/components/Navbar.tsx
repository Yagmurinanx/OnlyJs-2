import React from "react";
import { Link } from "react-router-dom";
import useFavoritesStore from "../store/useFavoritesStore";

const Navbar = () => {
  const { photos, posts } = useFavoritesStore();
  const favoritePhotosCount = photos.length;
  const favoritePostsCount = posts.length;

  return (
    <nav style={{ borderBottom: "1px solid #ccc", paddingBottom: "1rem" }}>
      <ul>
        <li>
          <Link to="/">Ana Sayfa</Link>
        </li>
        <li>
          <Link to="/users">Kullanıcılar</Link>
        </li>
        <li>
          <Link to="/favorites">
            Favoriler (Photos: {favoritePhotosCount}, Posts:{" "}
            {favoritePostsCount})
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
