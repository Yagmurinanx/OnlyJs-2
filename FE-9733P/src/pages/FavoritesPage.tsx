import React from "react";
import { useNavigate } from "react-router-dom";
import useFavoritesStore from "../store/useFavoritesStore";

const FavoritesPage = () => {
  const { photos, posts, removeFavoritePhoto, removeFavoritePost } =
    useFavoritesStore();
  const navigate = useNavigate();

  const handlePhotoClick = (photoId) => {
    navigate(`/albums/${photoId}`);
  };

  const handlePostClick = (userId, postId) => {
    navigate(`/users/${userId}/posts/${postId}`);
  };

  return (
    <div>
      <h1>Favoriler</h1>
      <h2>Favori Fotoğraflar</h2>
      <ul>
        {photos.length === 0 && <li>Favori fotoğraf yok.</li>}
        {photos.map((photo) => (
          <li key={photo.id}>
            <img
              src={photo.thumbnailUrl}
              alt={photo.title}
              style={{ cursor: "pointer" }}
              onClick={() => handlePhotoClick(photo.id)}
            />
            <button onClick={() => removeFavoritePhoto(photo.id)}>
              Favorilerden Kaldır
            </button>
          </li>
        ))}
      </ul>
      <h2>Favori Postlar</h2>
      <ul>
        {posts.length === 0 && <li>Favori post yok.</li>}
        {posts.map((post) => (
          <li key={post.id}>
            <div
              onClick={() => handlePostClick(post.userId, post.id)}
              style={{ cursor: "pointer" }}
            >
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </div>
            <button onClick={() => removeFavoritePost(post.id)}>
              Favorilerden Kaldır
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoritesPage;
