import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "./ContextAPI/Context";
import { Avatar, Box, Button, Image, Input, Text } from "@chakra-ui/react";
import axios, { all } from "axios";

const Home = () => {
  const { user, setUser } = useContext(UserContext);
  const [allPosts, setAllPosts] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const updateContextAPI = () => {
      let data = JSON.parse(localStorage.getItem("InstauserData"));
      setUser(data);
    };

    updateContextAPI();
  }, []);

  const getAllPosts = async () => {
    try {
      let data = await axios.get("/getAllPosts");
      console.log(data.data);
      setAllPosts(data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <Box w={"43%"} minH={"100vh"} pl={"3rem"}>
      <Box bgColor={"#111"} mt={"2rem"} borderRadius={"0.5rem"} pb={"1rem"}>
        <Box
          display={"flex"}
          alignItems={"center"}
          color={"#f5f5f5"}
          gap={"0.8rem"}
          pt={"0.7rem"}
          pb={"0.7rem"}
          ml={"0.5rem"}
        >
          <Avatar size={"sm"} src={allPosts[8]?.postedBy?.profilePicture} />
          <Text>{allPosts[8]?.postedBy?.username}</Text>
        </Box>
        <Box>
          <Image src={allPosts[8]?.content} h={"35rem"} />
        </Box>
        <Box
          display={"flex"}
          ml={"0.8rem"}
          mt={"1rem"}
          justifyContent={"space-between"}
        >
          {/* Like comment button */}
          <Box display={"flex"} gap={"2rem"}>
            <Box>
              <Text>
                <i
                  class="fa-regular fa-heart"
                  style={{ transform: "scale(1.5)", color: "#f5f5f5" }}
                ></i>
              </Text>
            </Box>
            <Box>
              <Text>
                <i
                  class="fa-regular fa-comment"
                  style={{ transform: "scale(1.5)", color: "#f5f5f5" }}
                ></i>
              </Text>
            </Box>
          </Box>
          <Box mr={"1rem"}>
            <Text>
              <i
                class="fa-regular fa-bookmark"
                style={{ transform: "scale(1.5)", color: "#f5f5f5" }}
              ></i>
            </Text>
          </Box>
        </Box>
        <Box
          ml={"0.8rem"}
          mt={"0.5rem"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Input
            color={"grey"}
            placeholder="Add a comment..."
            outline={"none"}
            border={"none"}
            ml={0}
            pl={0}
            w={"80%"}
            _focusVisible={{
              border: "none",
              outline: "none",
            }}
            onChange={(e) => {
              setComment(e.target.value);
            }}
            value={comment}
          />
          {comment && (
            <Button bgColor={"transparent"} color={"#0a66c2"}>
              Post
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
