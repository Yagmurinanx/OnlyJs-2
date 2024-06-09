import React from "react";
import { useLoaderData } from "react-router-dom";
import useFavoritesStore from "../store/useFavoritesStore";

export async function loader({ params }) {
  const post = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.postId}`
  ).then((res) => res.json());
  const user = await fetch(
    `https://jsonplaceholder.typicode.com/users/${post.userId}`
  ).then((res) => res.json());
  const comments = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.postId}/comments`
  ).then((res) => res.json());
  return { post, user, comments };
}

const PostDetailPage = () => {
  const { post, user, comments } = useLoaderData();
  const { posts, addFavoritePost, removeFavoritePost } = useFavoritesStore();
  const isFavorite = posts.some((favoritePost) => favoritePost.id === post.id);

  const handleFavoriteClick = () => {
    if (isFavorite) {
      removeFavoritePost(post.id);
    } else {
      addFavoritePost(post);
    }
  };

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <p>
        Author: <a href={`/users/${user.id}`}>{user.username}</a>
      </p>
      <button onClick={handleFavoriteClick}>
        {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      </button>
      <h2>Comments</h2>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            <p>{comment.body}</p>
            <p>By: {comment.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostDetailPage;
