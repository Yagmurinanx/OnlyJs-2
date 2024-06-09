import React, { useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import UserPosts from "../components/UserPosts";
import UserAlbums from "../components/UserAlbums";
import UserTodos from "../components/UserTodos";

export const loader = async ({ params }) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${params.userId}`
  );
  const user = await response.json();
  return { user };
};

const UserDetailPage = () => {
  const { user } = useLoaderData();
  const { userId } = useParams();
  const [activeTab, setActiveTab] = useState("posts");

  return (
    <div>
      <h1>{user.name}</h1>
      <div>
        <button onClick={() => setActiveTab("posts")}>Posts</button>
        <button onClick={() => setActiveTab("albums")}>Albums</button>
        <button onClick={() => setActiveTab("todos")}>Todos</button>
      </div>
      <div>
        {activeTab === "posts" && <UserPosts userId={userId} />}
        {activeTab === "albums" && <UserAlbums userId={userId} />}
        {activeTab === "todos" && <UserTodos userId={userId} />}
      </div>
    </div>
  );
};

export default UserDetailPage;
