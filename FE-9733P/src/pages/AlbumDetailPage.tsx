import React from "react";
import { useLoaderData, Link } from "react-router-dom";
import useFavoritesStore from "../store/useFavoritesStore";

type LoaderData = {
  album: {
    id: number;
    title: string;
    userId: number;
  };
  photos: {
    id: number;
    title: string;
    thumbnailUrl: string;
  }[];
  user: {
    id: number;
    username: string;
  };
};

type FavoritePhoto = {
  id: number;
  title: string;
  thumbnailUrl: string;
  userId: number;
  albumId: number;
};

type LoaderFunction = ({
  params: { albumId, userId },
}: {
  params: { albumId: number; userId: number };
}) => Promise<LoaderData>;

export const loader: LoaderFunction = async ({ params }) => {
  const [albumResponse, photosResponse, userResponse] = await Promise.all([
    fetch(`https://jsonplaceholder.typicode.com/albums/${params.albumId}`),
    fetch(
      `https://jsonplaceholder.typicode.com/albums/${params.albumId}/photos`
    ),
    fetch(`https://jsonplaceholder.typicode.com/users/${params.userId}`),
  ]);

  const album = await albumResponse.json();
  const photos = await photosResponse.json();
  const user = await userResponse.json();

  return { album, photos, user };
};

const AlbumDetailPage: React.FC = () => {
  const { album, photos, user } = useLoaderData<LoaderData>();
  const {
    photos: favoritePhotos,
    addFavorite,
    removeFavorite,
  } = useFavoritesStore();

  const toggleFavorite = (photo: FavoritePhoto) => {
    const isFavorite = favoritePhotos.some((fav) => fav.id === photo.id);
    if (isFavorite) {
      removeFavorite(photo.id);
    } else {
      addFavorite({ ...photo, userId: user.id, albumId: album.id });
    }
  };

  return (
    <div>
      <h1>{album.title}</h1>
      <p>
        <Link to={`/users/${user.id}`}>Yazar: {user.username}</Link>
      </p>
      <h2>Fotoğraflar</h2>
      <div>
        {photos.map((photo) => {
          const isFavorite = favoritePhotos.some((fav) => fav.id === photo.id);
          return (
            <div key={photo.id} className="photo-container">
              <img src={photo.thumbnailUrl} alt={photo.title} />
              <p>{photo.title}</p>
              <button
                className={`favorite-button ${isFavorite ? "favorite" : ""}`}
                onClick={() => toggleFavorite(photo)}
              >
                {isFavorite ? "❤️" : "🤍"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AlbumDetailPage;
