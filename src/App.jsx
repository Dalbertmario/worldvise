import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Pricing from "./pages/Pricing";
import Products from "./pages/Product";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import AppLayout from "./pages/AppLayout";
import CityList from "./component/CityList";
import CountriesList from "./component/CountriesList";
import City from "./component/City";
import Form from "./component/Form";
import { CitiesProvider, useCity } from "./contexts/CitiesProvider";
import { FakeAuthentication, useAuth } from "./contexts/FakeAuthentication";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
  return (
    <div>
      <FakeAuthentication>
        <CitiesProvider>
          <BrowserRouter>
            <Routes>
              <Route index element={<Home />} />
              <Route path="/" element={<Home />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="products" element={<Products />} />
              <Route path="*" element={<PageNotFound />} />
              <Route
                path="app"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate replace to="cities" />} />
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountriesList />} />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="login" element={<Login />} />
            </Routes>
          </BrowserRouter>
        </CitiesProvider>
      </FakeAuthentication>
    </div>
  );
}

export default App;
