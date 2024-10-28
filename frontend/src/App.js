import React, { useEffect, useState } from "react";
import { Container, AppBar, Typography, Grow, Grid } from "@material-ui/core";
import useStyles from "./styles";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import imagePhoto from "./components/images/memories_logo.png";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";

const App = () => {
  const classes = useStyles();

  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <Navbar />
        <Routes>
            <Route path="/" exact Component={Home} />
            <Route path="/auth" exact Component={Auth} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
