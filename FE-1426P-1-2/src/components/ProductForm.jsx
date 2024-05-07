import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { markets, categories } from "./constants";

const ProductForm = ({ addProduct }) => {
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

      addProduct(newProduct);

      setSelectedMarket("");
      setSelectedCategory("");
      setProductName("");
    }
  };

  return (
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
  );
};

export default ProductForm;
