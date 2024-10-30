import React, { useEffect, useState } from "react";
import { Container, AppBar, Typography, Grow, Grid } from "@material-ui/core";
import useStyles from "./styles";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import imagePhoto from "./components/images/memories_logo.png";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";

const App = () => {
  const classes = useStyles();
  const user = localStorage.getItem('profile')

  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar />
        <Routes>
            <Route path="/" exact Component={Home} />
            <Route path="/auth" exact Component={() => !user ? <Auth/> : <Navigate to='/'/>} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
