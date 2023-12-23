import express from "express";
import products from "../backend/data.js";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to my server!");
});

app.get("/products", (req, res) => {
  let filteredProducts = [...products];
  const { name, processor, memory, minPrice, maxPrice, os, sort, search } =
    req.query;

  if (search) {
    search.toLowerCase();
    filteredProducts = products.filter((product) => {
      if (
        product.name.toLowerCase().includes(search) ||
        product.description.toLowerCase().includes(search) ||
        product.OS.toLowerCase().includes(search)
      )
        return true;
      else return false;
    });
  }

  if (name) {
    filteredProducts = filteredProducts.filter((product) =>
      product.name.toLowerCase().includes(name.toLowerCase())
    );
  }
  if (os) {
    filteredProducts = filteredProducts.filter((product) =>
      product.OS.toLowerCase().includes(os.toLowerCase())
    );
  }
  if (sort) {
    if (sort === "asc") filteredProducts.sort((a, b) => a.price - b.price);
    if (sort === "dsc") filteredProducts.sort((a, b) => b.price - a.price);
  }
  if (processor) {
    filteredProducts = filteredProducts.filter(
      (product) => product.processor === processor
    );
  }
  if (memory) {
    filteredProducts = filteredProducts.filter(
      (product) => product.memory === parseInt(memory)
    );
  }
  if (minPrice) {
    filteredProducts = filteredProducts.filter(
      (product) => product.price >= parseFloat(minPrice)
    );
  }
  if (maxPrice) {
    filteredProducts = filteredProducts.filter(
      (product) => product.price <= parseFloat(maxPrice)
    );
  }

  res.json(filteredProducts);
});

app.get("/products/:id", (req, res) => {
  const phone = products.find((product) => product.id == req.params.id);
  res.json(phone);
});

// app.get("/product/search", (req, res) => {
//   let filteredProducts = [];
//   const search = req.query.q;
//   search.toLowerCase();
//   filteredProducts = products.filter((product) => {
//     if (
//       product.name.toLowerCase().includes(search) ||
//       product.description.toLowerCase().includes(search) ||
//       product.OS.toLowerCase().includes(search)
//     )
//       return true;
//     else return false;
//   });
//   res.json(filteredProducts);
// });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
