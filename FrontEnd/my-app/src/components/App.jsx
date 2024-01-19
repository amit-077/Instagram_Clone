import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import Home from "./Home";
import Search from "./Search";
import Explore from "./Explore";
import Messages from "./Messages";
import Create from "./Create";
import Notifications from "./Notifications";
import Reels from "./Reels";
import Profile from "./Profile";
import Authentication from "./Authentication";
import ForgotPassword from "./ForgotPassword";
import Login from "./Login";
import UserProfile from "./UserProfile";
import EditProfile from "./Settings/EditProfile";

const App = () => {
  return (
    <BrowserRouter>
      {/* <Box>
          <Sidebar />
        </Box> */}
      <Routes>
        {/* Home route */}
        <Route
          path="/"
          element={
            <Box display={"flex"} gap={"1rem"}>
              <Sidebar />
              <Home />
            </Box>
          }
        />
        {/* Search route */}
        <Route
          path="/search"
          element={
            <Box display={"flex"} gap={"1rem"}>
              <Sidebar />
              <Search />
            </Box>
          }
        />
        {/* Explore route */}
        <Route
          path="/explore"
          element={
            <Box display={"flex"} gap={"1rem"}>
              <Sidebar />
              <Explore />
            </Box>
          }
        />
        {/* Reels route */}
        <Route
          path="/reels"
          element={
            <Box display={"flex"} gap={"1rem"}>
              <Sidebar />
              <Reels />
            </Box>
          }
        />
        {/* Messages route */}
        <Route
          path="/messages"
          element={
            <Box display={"flex"} gap={"1rem"}>
              <Sidebar />
              <Messages />
            </Box>
          }
        />
        {/* Notifications route */}
        <Route
          path="/notifications"
          element={
            <Box display={"flex"} gap={"1rem"}>
              <Sidebar />
              <Notifications />
            </Box>
          }
        />
        {/* Create route */}
        <Route
          path="/create"
          element={
            <Box display={"flex"} gap={"1rem"}>
              <Sidebar />
              <Create />
            </Box>
          }
        />
        {/* Profile route */}
        <Route
          path="/profile"
          element={
            <Box display={"flex"} gap={"1rem"}>
              <Sidebar />
              <Profile />
            </Box>
          }
        />
        {/* Profile route */}
        <Route
          path="/register"
          element={
            <Box display={"flex"} gap={"1rem"}>
              <Authentication />
            </Box>
          }
        />
        {/* forgot password route */}

        <Route
          path="/forgot_password"
          element={
            <Box display={"flex"} gap={"1rem"}>
              <ForgotPassword />
            </Box>
          }
        />

        {/* search user route */}
        <Route
          path="/user/:userId"
          element={
            <Box display={"flex"} gap={"1rem"}>
              <Sidebar />
              <UserProfile />
            </Box>
          }
        />

        {/* search user route */}
        <Route
          path="/settings/edit-profile"
          element={
            <Box display={"flex"} gap={"1rem"}>
              <Sidebar />
              <EditProfile />
            </Box>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
