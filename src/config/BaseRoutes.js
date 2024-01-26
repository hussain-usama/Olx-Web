import AddProduct from "../views/AddProduct";
import Login from "../views/Login";
import OlxProducts from "../views/OlxProducts";
import Register from "../views/Register";
import ProductDetails from "../views/ProductDetails";
import { Route, Routes } from "react-router-dom";
import { PrivateRoutes, PublicRoutes } from "./RouteTypes";
import NotFound from './NotFound'
import { Suspense, useEffect, useState } from "react";
import Loader from "../components/Loader";
import Profile from "../views/Profile";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

function BaseRoutes() {

  const [user, setUser] = useState(null);
  useEffect(() => {
      onAuthStateChanged(auth, (user) => {
          if (user) {
            console.log('Logged in',user)
            setUser(user)
          } else {
            console.log('Logged out',user)
            setUser(null)
          }
        });
  }, []);
  
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

          <Route path={'/profile'} element={
          <PrivateRoutes>
            <Profile user={user} />
          </PrivateRoutes>} />


        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default BaseRoutes;
