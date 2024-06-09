import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const UserAlbums = ({ userId }) => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlbums = async () => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${userId}/albums`
      );
      const data = await response.json();
      setAlbums(data);
      setLoading(false);
    };

    fetchAlbums();
  }, [userId]);

  if (loading) return <p>Yükleniyor...</p>;

  return (
    <div>
      {albums.map((album) => (
        <div key={album.id}>
          <h3>
            <Link to={`/users/${userId}/albums/${album.id}`}>
              {album.title}
            </Link>
          </h3>
        </div>
      ))}
    </div>
  );
};

export default UserAlbums;
