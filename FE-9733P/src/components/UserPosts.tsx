import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const UserPosts = ({ userId }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${userId}/posts`
      );
      const data = await response.json();
      setPosts(data);
      setLoading(false);
    };

    fetchPosts();
  }, [userId]);

  if (loading) return <p>Yükleniyor...</p>;

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <h3>
            <Link to={`/users/${userId}/posts/${post.id}`}>{post.title}</Link>
          </h3>
        </div>
      ))}
    </div>
  );
};

export default UserPosts;
