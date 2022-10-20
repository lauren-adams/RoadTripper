import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import {UserContextProvider} from "./components/UserContext";
import { ChakraProvider, theme } from '@chakra-ui/react'

ReactDOM.render(
    <UserContextProvider>
  <BrowserRouter>
    <ChakraProvider theme={theme}>
    <App />
      </ChakraProvider>
  </BrowserRouter>
    </UserContextProvider>,
  document.getElementById("root")
);
