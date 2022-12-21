import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../../components/molecules/Login";
import Register from "../../components/molecules/Register";
import { Main } from "../../pages";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Main />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/register" exact element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
