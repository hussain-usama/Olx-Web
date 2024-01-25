import AddProduct from "../views/AddProduct";
import Login from "../views/Login";
import OlxProducts from "../views/OlxProducts";
import Register from "../views/Register";
import ProductDetails from "../views/ProductDetails";
import { Route, Routes } from "react-router-dom";
import { PrivateRoutes, PublicRoutes } from "./RouteTypes";
import NotFound from './NotFound'
import { Suspense } from "react";
import Loader from "../components/Loader";

function BaseRoutes() {
  return (
    <Suspense fallback={<Loader open={true}/>}>
      <Routes>
        <Route path="/" element={<OlxProducts />} />
        <Route path="/productDetails/:id" element={<ProductDetails />} />

        <Route path="/login" element={<PublicRoutes>
          <Login />
        </PublicRoutes>} />

        <Route path="/register" element={<PublicRoutes>
          <Register />
        </PublicRoutes>} />

        <Route path={'/addProduct'} element={
          <PrivateRoutes>
            <AddProduct />
          </PrivateRoutes>} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default BaseRoutes;
