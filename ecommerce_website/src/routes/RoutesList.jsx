import { lazy } from 'react';
import {  Routes, Route } from "react-router";
import Loader from "../component/loader";
import { Suspense } from 'react';

const NotFound = lazy(() => import ("../pages/NotFound") )
const All_products = lazy(() => import ("../pages/All_products") )
const Product_Details  = lazy(() => import ("../pages/Product_Details") )
const Cart = lazy(() => import ("../pages/Cart") )
const RegisterForm = lazy(() => import ("../pages/Register_form") )

const RoutesList =()=>{
    return (
      <Suspense fallback={<Loader />}>
        <Routes>
        <Route index element= {<All_products />} />
        <Route path="/product-details/:id" element= {< Product_Details/>} />
        <Route path = "/cart"  element = {<Cart />} />
        <Route path = "/Register" element = { <RegisterForm />  } />
        <Route path='*' element={<NotFound/>} />
      </Routes>
      </Suspense>
    )
}
export default RoutesList ;