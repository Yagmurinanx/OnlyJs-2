import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <h1>Ana Sayfa</h1>
      <Link to="/users">Kullanıcıları Görüntüle</Link>
    </div>
  );
};

export default HomePage;
