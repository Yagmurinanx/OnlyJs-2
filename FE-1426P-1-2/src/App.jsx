import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Button, Form, Row, Col } from "react-bootstrap";
import styled from "styled-components";
import JSConfetti from "js-confetti";
import ProductForm from "../src/components/ProductForm";
import ProductList from "./components/ProductList.jsx";
import FuzzySearch from "fuzzy-search";
import { categories, markets } from "./components/constants.jsx";

const AppContainer = styled(Container)`
  max-width: 800px;
  margin-top: 50px;
`;

const jsConfetti = new JSConfetti();

const App = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filterMarket, setFilterMarket] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterName, setFilterName] = useState("");
  const [searchText, setSearchText] = useState("");

  const addProduct = (newProduct) => {
    setProducts([...products, newProduct]);
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

  useEffect(() => {
    const allPurchased =
      products.length > 0 && products.every((product) => product.isBought);
    if (allPurchased) {
      jsConfetti.addConfetti({
        emojis: [ "⚡️", "✨", "💫", "🌸"],
      });
      alert("Alışveriş Tamamlandı");
    }
  }, [products]);

  useEffect(() => {
    handleFilterChange();
  }, [filterMarket, filterCategory, filterStatus, filterName, searchText]);

  const handleFilterChange = () => {
    let filtered = products.filter((product) => {
      const marketMatch =
        !filterMarket || product.market.id === parseInt(filterMarket);
      const categoryMatch =
        !filterCategory || product.category.id === parseInt(filterCategory);
      const nameMatch =
        !filterName ||
        product.name.toLowerCase().includes(filterName.toLowerCase());
  
      let statusMatch = true;
      if (filterStatus) {
        statusMatch =
          filterStatus === "all"
            ? true
            : product.isBought === (filterStatus === "bought");
      }
  
      return marketMatch && categoryMatch && statusMatch && nameMatch;
    });
  
    const searcher = new FuzzySearch(filtered, ["name"], {
      caseSensitive: false,
    });
    filtered = searchText ? searcher.search(searchText) : filtered;
  
    setFilteredProducts(filtered);
  };
  const clearAllFilters = () => {
    setFilterMarket("");
    setFilterCategory("");
    setFilterStatus("");
    setFilterName("");
    setSearchText("");
    setFilteredProducts([]);
  };

  return (
    <AppContainer>
      <h1>Alışveriş Listesi</h1>
      <ProductForm addProduct={addProduct} />
      <Form>
        <Row>
          <Col>
            <Form.Group controlId="formMarket">
              <Form.Label>Market</Form.Label>
              <Form.Control
                as="select"
                value={filterMarket}
                onChange={(e) => setFilterMarket(e.target.value)}
              >
                <option value="">Hepsi</option>
                {markets.map((market) => (
                  <option key={market.id} value={market.id}>
                    {market.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formCategory">
              <Form.Label>Kategori</Form.Label>
              <Form.Control
                as="select"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                <option value="">Hepsi</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Durum</Form.Label>
              <Form.Check
                type="radio"
                label="Tümü"
                name="status"
                id="allStatus"
                value="all"
                checked={filterStatus === "all"}
                onChange={(e) => setFilterStatus(e.target.value)}
              />
              <Form.Check
                type="radio"
                label="Satın Alınanlar"
                name="status"
                id="boughtStatus"
                value="bought"
                checked={filterStatus === "bought"}
                onChange={(e) => setFilterStatus(e.target.value)}
              />
              <Form.Check
                type="radio"
                label="Satın Alınmayanlar"
                name="status"
                id="notBoughtStatus"
                value="notBought"
                checked={filterStatus === "notBought"}
                onChange={(e) => setFilterStatus(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formProductName">
              <Form.Label>Ürün İsmi</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ürün ismi giriniz"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
      <Button variant="secondary" onClick={clearAllFilters} className="mb-3">
        Tüm Filtreleri Temizle
      </Button>
      <h2>Ürün Listesi</h2>
      <ProductList
        products={filteredProducts.length > 0 ? filteredProducts : products}
        handleProductClick={handleProductClick}
        handleDeleteProduct={handleDeleteProduct}
      />
    </AppContainer>
  );
};

export default App;
