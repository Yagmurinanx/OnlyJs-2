import React from "react";
import { Table, Button } from "react-bootstrap";
import deleteIcon from "../assets/trash-solid.svg"

const ProductList = ({ products, handleProductClick, handleDeleteProduct }) => {
  return (
    <>
      {products.length > 0 ? (
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
                style={
                  product.isBought ? { textDecoration: "line-through" } : {}
                }
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
                    <img src={deleteIcon} alt="Sil" style={{ width: '16px', height: '16px' }} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <div>Hiç ürün bulunamadı.</div>
      )}
    </>
  );
};

export default ProductList;
