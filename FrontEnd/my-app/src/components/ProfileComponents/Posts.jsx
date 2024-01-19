import { Box, Button, Image, useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import LoadingScr from "../LoadingScreen/LoadingScr";
import DisplayPost from "./DisplayPost";

const Posts = ({
  setUserPosts,
  section,
  refresh,
  searchUser,
  userPosts,
  userProfile,
}) => {
  const [posts, setPosts] = useState([]);
  const [savedPosts, setSavedPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedPost, setSelectedPost] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const fetchPosts = async () => {
    setLoading(true);
    try {
      let userPosts = await axios.post("/getPosts");
      setPosts(userPosts.data);
      setUserPosts(userPosts.data);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  const fetchSavedPosts = async () => {
    let savedPostsByUser = await axios.get("/getSavedPosts");
    setSavedPosts(savedPostsByUser?.data?.savedPosts?.reverse());
  };

  useEffect(() => {
    {
      !searchUser && fetchSavedPosts() && fetchPosts();
    }
  }, [refresh]);

  return (
    <Box>
      {!loading && (
        <Box
          display={"flex"}
          justifyContent={"left"}
          flexWrap={"wrap"}
          rowGap={"0.4rem"}
          columnGap={"0.4rem"}
        >
          {(section === "normalPosts"
            ? userPosts
              ? userPosts
              : posts
            : savedPosts
          )?.map((e) => {
            return (
              <Box
                cursor={"pointer"}
                onClick={() => {
                  setSelectedPost(e);
                  console.log(e);
                }}
              >
                <Image src={e.content} w={"19rem"} h={"19rem"} />
              </Box>
            );
          })}
        </Box>
      )}
      {/* loading screen */}
      {loading && <LoadingScr size={"0.6"} />}

      <Box w={"100%"} display={"flex"} justifyContent={"center"}>
        <DisplayPost
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          setSelectedPost={setSelectedPost}
          selectedPost={selectedPost}
          savedPosts={savedPosts}
          fetchSavedPosts={fetchSavedPosts}
          userProfile={userProfile}
        />
      </Box>
    </Box>
  );
};

export default Posts;
