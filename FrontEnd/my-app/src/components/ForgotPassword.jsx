import {
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [details, setDetails] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    otp: "",
  });

  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const toast = useToast();

  const navigator = useNavigate();

  const showToast = (code) => {
    toast({
      title:
        code === 301
          ? "Please enter email"
          : code === 400
          ? "User not found!!"
          : code === 200
          ? "An OTP is sent to your email!"
          : code === 201
          ? "OTP Verified!"
          : code === 401
          ? "Invalid OTP"
          : code === 999
          ? "Password and confirm password fields doesn't match"
          : code === 1000
          ? "Length of password must be greater than 8"
          : code === 202
          ? "Password updated successfully"
          : code === 405
          ? "Error while updating password!"
          : null,
      status:
        code === 301
          ? "error"
          : code === 400 || code === 401 || code === 999 || code === 405
          ? "error"
          : code === 200 || code === 201 || code === 202
          ? "success"
          : code === 1000
          ? "warning"
          : null,
      duration: 3000,
      isClosable: true,
    });
  };

  const [show, setShow] = useState(false);

  const [authenticated, setAuthenticated] = useState(false);

  function updateDetails(e) {
    setDetails((prevVal) => {
      return { ...prevVal, [e.target.name]: e.target.value };
    });
  }

  async function sendForgotPasswordEmail() {
    setLoading(true);
    if (!details.email) {
      showToast(301);
      return;
    }
    let { email, otp } = details;
    try {
      let data = await axios.post(
        "/forgotPassword",
        { email, otp },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(data);

      if (data.status === 200) {
        setOtpSent(true);
        showToast(200);
      } else if (data.status === 201) {
        setAuthenticated(true);
        showToast(201);
      }
    } catch (e) {
      console.log(e);
      if (e.response.status === 400) {
        showToast(400);
      } else if (e.response.status === 401) {
        showToast(401);
      }
    }
    setLoading(false);
  }

  const updatePassword = async () => {
    let { password, confirmPassword, email } = details;
    if (password !== confirmPassword) {
      showToast(999);
      return;
    }

    if (password.length < 8) {
      showToast(1000);
      return;
    }

    setLoading(true);
    try {
      let data = await axios.post(
        "/changePassword",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (data.status === 202) {
        showToast(202);
        navigator("/register");
      }
    } catch (e) {
      console.log(e);
      if (e.response.status === 405) {
        showToast(405);
      }
    }
    setLoading(false);
  };

  return (
    <Box
      display={"flex"}
      w={"100vw"}
      h={"100vh"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Box p={"5rem"} borderRadius={"0.5rem"} bgColor={"#a1a1a1"}>
        <VStack spacing={"1.2rem"} w={"100%"} align={"left"}>
          <Box>
            <Input
              placeholder="Enter your email"
              bgColor={"#fafafa"}
              type="email"
              name="email"
              onChange={(e) => {
                updateDetails(e);
              }}
            />
          </Box>
          {otpSent && (
            <Box>
              <Input
                placeholder="Enter OTP"
                bgColor={"#fafafa"}
                type="text"
                name="otp"
                onChange={(e) => {
                  updateDetails(e);
                }}
              />
            </Box>
          )}
          {authenticated && (
            <Box>
              <InputGroup>
                <Input
                  placeholder="Enter new password"
                  bgColor={"#fafafa"}
                  type={show ? "text" : "password"}
                  name="password"
                  onChange={(e) => {
                    updateDetails(e);
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
                    {show ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </Box>
          )}
          {authenticated && (
            <Box>
              <InputGroup>
                <Input
                  placeholder="Confirm password"
                  bgColor={"#fafafa"}
                  type={show ? "text" : "password"}
                  name="confirmPassword"
                  onChange={(e) => {
                    updateDetails(e);
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
                    {show ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </Box>
          )}
          <Box mt={"1rem"}>
            <Button
              w={"100%"}
              colorScheme="blue"
              isLoading={loading}
              onClick={
                otpSent && authenticated
                  ? updatePassword
                  : sendForgotPasswordEmail
              }
            >
              {otpSent && !authenticated
                ? "Verify Otp"
                : otpSent && authenticated
                ? "Change Password"
                : "Forgot password"}
            </Button>
          </Box>
        </VStack>
      </Box>
    </Box>
  );
};

export default ForgotPassword;
