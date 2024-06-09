import React from "react";
import { useLoaderData } from "react-router-dom";
import UserList from "../components/UserList";

export const loader = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await response.json();
  return { users };
};

const UsersPage = () => {
  const { users } = useLoaderData();

  return (
    <div>
      <h1>Kullanıcılar</h1>
      <UserList users={users} />
    </div>
  );
};

export default UsersPage;
