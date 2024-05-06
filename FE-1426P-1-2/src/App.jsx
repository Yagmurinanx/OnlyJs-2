import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Form, Button, Table } from "react-bootstrap";
import styled from "styled-components";
import JSConfetti from "js-confetti";

const markets = [
  { id: 1, name: "Migros" },
  { id: 2, name: "Teknosa" },
  { id: 3, name: "BİM" },
];

const categories = [
  { id: 1, name: "Elektronik" },
  { id: 2, name: "Şarküteri" },
  { id: 3, name: "Oyuncak" },
  { id: 4, name: "Bakliyat" },
  { id: 5, name: "Fırın" },
];

const AppContainer = styled(Container)`
  max-width: 800px;
  margin-top: 50px;
`;
const jsConfetti = new JSConfetti();

const App = () => {
  const [products, setProducts] = useState([]);
  const [selectedMarket, setSelectedMarket] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [productName, setProductName] = useState("");



  const generateRandomId = () => {
    return Math.floor(Math.random() * 10000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedMarket && selectedCategory && productName) {
      const newProduct = {
        id: generateRandomId(),
        market: markets.find(
          (market) => market.id === parseInt(selectedMarket)
        ),
        category: categories.find(
          (category) => category.id === parseInt(selectedCategory)
        ),
        name: productName,
        isBought: false,
      };

      setProducts([...products, newProduct]);

      setSelectedMarket("");
      setSelectedCategory("");
      setProductName("");
    }
  };

  const handleDeleteProduct = (productId) => {
    setProducts(products.filter((product) => product.id !== productId));
  };

  const handleProductClick = (productId) => {
    const updatedProducts = products.map((product) =>
      product.id === productId
        ? { ...product, isBought: !product.isBought }
        : product
    );

    setProducts(updatedProducts);
  };

  const handleShoppingCompletion = () => {
    setProducts((prevProducts) => {
      const allPurchased = prevProducts.every((product) => product.isBought);
      if (allPurchased && prevProducts.length > 0) {
        alert("Alışveriş Tamamlandı");
        
      
      }
      return prevProducts;
    });
  };

  useEffect(() => {
    const allPurchased =
      products.length > 0 && products.every((product) => product.isBought);
    if (allPurchased) {
      jsConfetti.addConfetti({
        emojis: ["🌈", "⚡️", "✨", "💫", "🌸"],
      });
      alert("Alışveriş Tamamlandı");
    }
  }, [products]);
  return (
    <AppContainer>
      <h1>Alışveriş Listesi</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formMarket">
          <Form.Label>Market</Form.Label>
          <Form.Control
            as="select"
            value={selectedMarket}
            onChange={(e) => setSelectedMarket(e.target.value)}
          >
            <option value="">Seç</option>
            {markets.map((market) => (
              <option key={market.id} value={market.id}>
                {market.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formCategory">
          <Form.Label>Kategori</Form.Label>
          <Form.Control
            as="select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Seç</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formProduct">
          <Form.Label>Ürün</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ürün ismi giriniz"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3 mb-3">
          Listeye Ekle
        </Button>
      </Form>
      <h2>Ürün Listesi</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>İsim</th>
            <th>Market</th>
            <th>Kategori</th>
            <th>Durum</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr
              key={product.id}
              style={product.isBought ? { textDecoration: "line-through" } : {}}
              onClick={() => handleProductClick(product.id)}
            >
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.market.name}</td>
              <td>{product.category.name}</td>
              <td>{product.isBought ? "Satın Alındı" : "Satın Alınmadı"}</td>
              <td>
                <Button
                  variant="danger"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteProduct(product.id);
                  }}
                >
                  Sil
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button variant="success" onClick={handleShoppingCompletion}>
        Satın Al
      </Button>
    </AppContainer>
  );
};

export default App;
