import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { ChakraProvider } from "@chakra-ui/react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import UserProvider from "./components/ContextAPI/Context";

ReactDOM.render(
  <ChakraProvider>
    <UserProvider>
      <GoogleOAuthProvider clientId="634598049649-e9tpbgoedsc0oe0eflau7eqrcdulfu5t.apps.googleusercontent.com">
        <App />
      </GoogleOAuthProvider>
    </UserProvider>
  </ChakraProvider>,
  document.getElementById("root")
);
