import React, { useEffect, useState } from "react";

const UserTodos = ({ userId }) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${userId}/todos`
      );
      const data = await response.json();
      setTodos(data);
      setLoading(false);
    };

    fetchTodos();
  }, [userId]);

  if (loading) return <p>Yükleniyor...</p>;

  return (
    <div>
      {todos.map((todo) => (
        <div key={todo.id}>
          <h4>{todo.title}</h4>
          <p>{todo.completed ? "Completed" : "Not Completed"}</p>
        </div>
      ))}
    </div>
  );
};

export default UserTodos;
