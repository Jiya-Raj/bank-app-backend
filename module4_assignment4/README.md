# Module 4 - Assignment 4: ProductStore CRUD (MEAN)

This folder contains a separate MEAN stack assignment implementation without changing the original project code.

## Folder structure

- `backend/` - Node + Express + MongoDB CRUD API for Product
- `productstore-ui/` - Angular UI for Create, Read, Update, Delete operations

## Product schema

- `name` (String, required)
- `brand` (String, required)
- `category` (String, required)
- `price` (Number, required, min 0)
- `stock` (Number, required, min 0)

## Backend setup

```bash
cd module4_assignment4/backend
npm install
npm start
```

Backend runs on `http://localhost:8080` and expects MongoDB at:

`mongodb://localhost:27017/productstoredb`

## Frontend setup

```bash
cd module4_assignment4/productstore-ui
npm install
npm start
```

Frontend runs on `http://localhost:4200` and uses backend URL:

`http://localhost:8080/product`

## API endpoints

- `GET /product` - list all products
- `GET /product/:id` - get one product
- `POST /product` - create product
- `PUT /product/:id` - update product
- `DELETE /product/:id` - delete product
