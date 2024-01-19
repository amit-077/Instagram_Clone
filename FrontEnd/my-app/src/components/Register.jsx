import {
  Box,
  Button,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useGoogleLogin, GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useToast } from "@chakra-ui/react";
import { UserContext } from "./ContextAPI/Context";
const Register = () => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    otp: "",
    googleLogin: false,
  });

  // Context API
  const { user, setUser } = useContext(UserContext);

  const [loading, setLoading] = useState(false);

  const [show, setShow] = useState(true);

  const [verification, setVerification] = useState(false);

  const navigator = useNavigate();

  useEffect(() => {
    // Prevent user going on register page when he is already logged, first he needs to logout, to login again
    const preventRegister = () => {
      let userData = JSON.parse(localStorage.getItem("InstauserData"));
      if (userData) {
        navigator("/");
      }
    };

    preventRegister();
  }, []);

  const updateUserDetails = (e) => {
    setUserDetails((prevVal) => {
      return { ...prevVal, [e.target.name]: e.target.value };
    });
  };

  const toast = useToast();

  const showToast = (code) => {
    toast({
      title:
        code === 200
          ? "Account created"
          : code === 401
          ? "User already exists"
          : code === 402
          ? "Username exists, please choose different username"
          : code === 202
          ? `An OTP is sent to ${userDetails.email}`
          : code === 302
          ? "Invalid OTP"
          : "Error while creating user",
      status: code === 200 ? "success" : code === 202 ? "success" : "error",
      duration: 3000,
      isClosable: true,
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
        res.data.password = "";
        console.log(res.data);
        showToast(200);
        localStorage.setItem("InstauserData", JSON.stringify(res.data));
        setUser(res.data);
        navigator("/");
      } else {
        navigator("/");
      }
      console.log("DONE");
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
        "/register",
        { userDetails },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 202) {
        showToast(202);
        setVerification(true);
      } else if (res.status === 302) {
        showToast(302);
      } else if (res.status === 200) {
        res.data.password = "";
        console.log(res.data);
        showToast(200);
        localStorage.setItem("InstauserData", JSON.stringify(res.data));
        navigator("/");
      }
    } catch (e) {
      if (e.response.status !== 200) {
        showToast(e.response.status);
      }
    }
    setLoading(false);
  };

  return (
    <Box>
      <VStack spacing={"1.2rem"} w={"100%"} align={"left"}>
        <Box>
          <Input
            placeholder="Name"
            bgColor={"#fafafa"}
            type="text"
            name="name"
            onChange={(e) => {
              updateUserDetails(e);
            }}
          />
        </Box>
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
          <Input
            placeholder="Username"
            bgColor={"#fafafa"}
            type="email"
            name="username"
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
              type={show ? "password" : "text"}
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

        {verification && (
          <Box>
            <Input
              placeholder="Enter OTP for verification"
              bgColor={"#fafafa"}
              type="text"
              name="otp"
              onChange={(e) => {
                updateUserDetails(e);
              }}
            />
          </Box>
        )}
        <Box mt={"0.5rem"}>
          <Button
            w={"100%"}
            colorScheme="blue"
            onClick={postDataToBackend}
            isLoading={loading}
          >
            Sign Up
          </Button>
        </Box>
        <Box
          textAlign={"center"}
          display={"flex"}
          justifyContent={"center"}
          w={"100%"}
        >
          {/* <Button w={"100%"} bgColor="#f9f9f9" color={"#000"} onClick={login}>
            <i class="fa-brands fa-google"></i>&nbsp;&nbsp;Login with Google
          </Button> */}
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
      </VStack>
    </Box>
  );
};

export default Register;
