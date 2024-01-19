import {
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./ContextAPI/Context";

const Login = () => {
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });

  const { user, setUser } = useContext(UserContext);

  const [loading, setLoading] = useState(false);

  const [show, setShow] = useState(false);

  const navigator = useNavigate();

  const toast = useToast();

  const showToast = (code) => {
    toast({
      title:
        code === 200
          ? "Logged In Successfully"
          : code === 400
          ? "Invalid Credentials"
          : "User does not exist",
      status: code === 200 ? "success" : "error",
      duration: 3000,
      isClosable: true,
    });
  };

  const updateUserDetails = (e) => {
    setUserDetails((prevVal) => {
      return { ...prevVal, [e.target.name]: e.target.value };
    });
  };

  const googleLogin = async (token) => {
    setLoading(true);
    try {
      let res = await axios.post("/registerGoogle", {
        name: token.name,
        email: token.email,
        username: "new_user",
        password: "",
        googleLogin: true,
      });

      if (res.status === 200) {
        console.log(res.data);
        showToast(200);
        navigator("/");
      }
    } catch (e) {
      console.log(e);
      if (e.response.status !== 200) {
        showToast(e.response.status);
      }
    }
    setLoading(false);
  };

  const postDataToBackend = async () => {
    setLoading(true);
    try {
      let res = await axios.post(
        "/login",
        { userDetails },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status === 200) {
        console.log(res.data);
        localStorage.setItem("InstauserData", JSON.stringify(res.data));
        setUser(res.data);
        showToast(200);
        navigator("/");
      }
    } catch (e) {
      console.log(e);
      if (e.response?.status !== 200) {
        showToast(e.response?.status);
      }
    }
    setLoading(false);
  };
  return (
    <Box>
      <VStack spacing={"1.2rem"} w={"100%"} align={"left"}>
        <Box>
          <Input
            placeholder="Email"
            bgColor={"#fafafa"}
            type="email"
            name="email"
            onChange={(e) => {
              updateUserDetails(e);
            }}
          />
        </Box>
        <Box>
          <InputGroup>
            <Input
              placeholder="Password"
              bgColor={"#fafafa"}
              type={show ? "text" : "password"}
              name="password"
              onChange={(e) => {
                updateUserDetails(e);
              }}
            />
            <InputRightElement width="4.5rem">
              <Button
                h="1.75rem"
                size="sm"
                onClick={() => {
                  setShow(!show);
                }}
              >
                Show
              </Button>
            </InputRightElement>
          </InputGroup>
        </Box>
        <Box mt={"1rem"}>
          <Button
            w={"100%"}
            colorScheme="blue"
            // isLoading={loading}
            onClick={postDataToBackend}
          >
            Login
          </Button>
        </Box>
        <Box margin={"auto"}>
          <GoogleLogin
            onSuccess={async (credentialResponse) => {
              let token = jwt_decode(credentialResponse.credential);
              googleLogin(token);
            }}
            onError={() => {
              console.log("Google Login Failed");
            }}
          />
        </Box>
        <Box>
          <Link to={"/forgot_password"}>
            <Text fontSize={"0.8rem"} color={"blue"}>
              Forgot password ?{" "}
            </Text>
          </Link>
        </Box>
      </VStack>
    </Box>
  );
};

export default Login;
