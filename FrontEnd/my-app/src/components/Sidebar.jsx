import {
  Avatar,
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Toast,
  VStack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "./ContextAPI/Context";
import { ChevronDownIcon } from "@chakra-ui/icons";
import CreatePost from "./Create/CreatePost";

const Sidebar = () => {
  const [selectedTab, setSelectedTab] = useState("Home");
  let { user, setUser, openDrawer, setOpenDrawer } = useContext(UserContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen1, onOpen1, onClose1 } = useDisclosure();

  const navigator = useNavigate();
  const toast = useToast();

  if (!user) {
    navigator("/register");
    toast({ title: "Please login first", duration: 3000, status: "error" });
  }

  useEffect(() => {
    function updateContext() {
      let data = JSON.parse(localStorage.getItem("InstauserData"));
      setUser(data);
    }

    updateContext();
  }, []);

  const [createMedia, setCreateMedia] = useState("");

  return (
    <Box w={"20%"}>
      <Box h={"100vh"} position={"fixed"} bgColor={"#f5f5f5"} w={"20%"}>
        <Box ml={"2rem"} pt={"2rem"}>
          <Text fontStyle={"italic"} fontSize={"2rem"}>
            Instagram
          </Text>
        </Box>
        <VStack
          align={"left"}
          pl={"1rem"}
          mt={"1.5rem"}
          fontSize={"1.2rem"}
          spacing={"1rem"}
        >
          {/* first bar item */}
          <NavLink to={"/"}>
            <Box
              display={"flex"}
              gap={"0.9rem"}
              alignItems={"center"}
              cursor={"pointer"}
              fontWeight={selectedTab === "Home" ? "600" : "normal"}
              pt={"0.5rem"}
              pb={"0.5rem"}
              pl={"1rem"}
              mr={"1rem"}
              _hover={{ bgColor: "#fcfcfc", borderRadius: "0.5rem" }}
              onClick={() => {
                setSelectedTab("Home");
              }}
            >
              <Box>
                <Text>
                  <i className="fa-solid fa-house"></i>
                </Text>
              </Box>
              <Box>
                <Text>Home</Text>
              </Box>
            </Box>
          </NavLink>
          {/* second bar item */}
          <NavLink
            to={"/search"}
            onClick={() => {
              setOpenDrawer(true);
            }}
          >
            <Box
              display={"flex"}
              gap={"0.9rem"}
              alignItems={"center"}
              cursor={"pointer"}
              fontWeight={selectedTab === "Search" ? "600" : "normal"}
              pt={"0.5rem"}
              pb={"0.5rem"}
              pl={"1rem"}
              mr={"1rem"}
              _hover={{ bgColor: "#fcfcfc", borderRadius: "0.5rem" }}
              onClick={() => {
                setSelectedTab("Search");
              }}
            >
              <Box>
                <Text>
                  <i className="fa-solid fa-magnifying-glass"></i>
                </Text>
              </Box>
              <Box>
                <Text>Search</Text>
              </Box>
            </Box>
          </NavLink>
          {/* third bar item */}
          <NavLink to={"/explore"}>
            <Box
              display={"flex"}
              gap={"0.9rem"}
              alignItems={"center"}
              cursor={"pointer"}
              fontWeight={selectedTab === "Explore" ? "600" : "normal"}
              pt={"0.5rem"}
              pb={"0.5rem"}
              pl={"1rem"}
              mr={"1rem"}
              _hover={{ bgColor: "#fcfcfc", borderRadius: "0.5rem" }}
              onClick={() => {
                setSelectedTab("Explore");
              }}
            >
              <Box>
                <Text>
                  <i className="fa-regular fa-compass"></i>
                </Text>
              </Box>
              <Box>
                <Text>Explore</Text>
              </Box>
            </Box>
          </NavLink>
          <NavLink to={"/reels"}>
            {/* forth bar item */}
            <Box
              display={"flex"}
              gap={"0.9rem"}
              alignItems={"center"}
              cursor={"pointer"}
              fontWeight={selectedTab === "Reels" ? "600" : "normal"}
              pt={"0.5rem"}
              pb={"0.5rem"}
              pl={"1rem"}
              mr={"1rem"}
              _hover={{ bgColor: "#fcfcfc", borderRadius: "0.5rem" }}
              onClick={() => {
                setSelectedTab("Reels");
              }}
            >
              <Box>
                <Text>
                  <i className="fa-solid fa-film"></i>
                </Text>
              </Box>
              <Box>
                <Text>Reels</Text>
              </Box>
            </Box>
          </NavLink>
          {/* fifth bar item */}
          <NavLink to={"/messages"}>
            <Box
              display={"flex"}
              gap={"0.9rem"}
              alignItems={"center"}
              cursor={"pointer"}
              fontWeight={selectedTab === "Messages" ? "600" : "normal"}
              pt={"0.5rem"}
              pb={"0.5rem"}
              pl={"1rem"}
              mr={"1rem"}
              _hover={{ bgColor: "#fcfcfc", borderRadius: "0.5rem" }}
              onClick={() => {
                setSelectedTab("Messages");
              }}
            >
              <Box>
                <Text>
                  <i className="fa-regular fa-message"></i>
                </Text>
              </Box>
              <Box>
                <Text>Messages</Text>
              </Box>
            </Box>
          </NavLink>
          {/* sixth bar item */}
          <NavLink to={"/notifications"}>
            <Box
              display={"flex"}
              gap={"0.9rem"}
              alignItems={"center"}
              cursor={"pointer"}
              fontWeight={selectedTab === "Notifications" ? "600" : "normal"}
              pt={"0.5rem"}
              pb={"0.5rem"}
              pl={"1rem"}
              mr={"1rem"}
              _hover={{ bgColor: "#fcfcfc", borderRadius: "0.5rem" }}
              onClick={() => {
                setSelectedTab("Notifications");
              }}
            >
              <Box>
                <Text>
                  <i className="fa-regular fa-heart"></i>
                </Text>
              </Box>
              <Box>
                <Text>Notifications</Text>
              </Box>
            </Box>
          </NavLink>
          {/* seventh bar item */}

          <Box
            display={"flex"}
            gap={"0.9rem"}
            alignItems={"center"}
            cursor={"pointer"}
            fontWeight={selectedTab === "Create" ? "600" : "normal"}
            pt={"0.5rem"}
            pb={"0.5rem"}
            pl={"1rem"}
            mr={"1rem"}
            _hover={{ bgColor: "#fcfcfc", borderRadius: "0.5rem" }}
            onClick={() => {
              setSelectedTab("Create");
            }}
          >
            <Box>
              <Text>
                <i className="fa-regular fa-square-plus"></i>
              </Text>
            </Box>
            <Box>
              <Menu>
                <MenuButton as={Box}>
                  Create&nbsp;
                  <ChevronDownIcon />
                </MenuButton>
                <MenuList>
                  <Box
                    onClick={() => {
                      onOpen();
                      setCreateMedia("Post");
                    }}
                  >
                    <MenuItem>Post</MenuItem>
                  </Box>
                  <Box
                    onClick={() => {
                      onOpen();
                      setCreateMedia("Reel");
                    }}
                  >
                    <MenuItem>Reel</MenuItem>
                  </Box>
                </MenuList>
              </Menu>
            </Box>
          </Box>
          {/* eigth bar item */}
          <NavLink to={"/profile"}>
            <Box
              display={"flex"}
              gap={"0.9rem"}
              alignItems={"center"}
              cursor={"pointer"}
              fontWeight={selectedTab === "Profile" ? "600" : "normal"}
              pt={"0.5rem"}
              pb={"0.5rem"}
              pl={"1rem"}
              mr={"1rem"}
              _hover={{ bgColor: "#fcfcfc", borderRadius: "0.5rem" }}
              onClick={() => {
                setSelectedTab("Profile");
              }}
            >
              <Box display={"flex"} alignItems={"center"}>
                <Avatar
                  size={"xs"}
                  name={user?.name}
                  src={user?.profilePicture}
                />
              </Box>
              <Box>
                <Text>Profile</Text>
              </Box>
            </Box>
          </NavLink>
        </VStack>
        <CreatePost
          isOpen={isOpen}
          onClose={onClose}
          createMedia={createMedia}
        />
      </Box>
    </Box>
  );
};

export default Sidebar;
