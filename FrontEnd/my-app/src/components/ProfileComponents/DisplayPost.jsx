import {
  Avatar,
  Box,
  Button,
  HStack,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Text,
  VStack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../ContextAPI/Context";
import LoadingScr from "../LoadingScreen/LoadingScr";
import moment from "moment";
import axios from "axios";

const DisplayPost = ({
  isOpen,
  onOpen,
  onClose,
  setSelectedPost,
  selectedPost,
  savedPosts,
  fetchSavedPosts,
  userProfile,
}) => {
  const modal1 = useDisclosure();

  const toast = useToast();

  const [comment, setComment] = useState("");

  const [postComments, setPostComments] = useState([]);

  const [loading, setLoading] = useState(false);

  const [commentLoading, setCommentLoading] = useState(false);

  const [postLiked, setPostLiked] = useState(false);

  useEffect(() => {
    console.log(selectedPost?.likes);
  }, [isOpen, selectedPost]);

  useEffect(() => {
    if (!isOpen) {
      setPostComments([]);
      setSelectedPost("");
    }
  }, [isOpen]);

  useEffect(() => {
    if (selectedPost) {
      if (selectedPost?.likes?.includes(user?._id)) {
        setPostLiked(true);
      } else {
        setPostLiked(false);
      }
      onOpen();
    }
  }, [selectedPost]);

  const getComments = async (showLoading) => {
    {
      showLoading && setCommentLoading(true);
    }
    try {
      let data = await axios.post("/fetchComments", {
        postId: selectedPost?._id,
      });

      console.log(data.data);
      setPostComments(data.data);
    } catch (e) {
      console.log(e);
    }
    {
      showLoading && setCommentLoading(false);
    }
  };

  useEffect(() => {
    selectedPost && isOpen && getComments(true);
  }, [isOpen]);

  let { user, setUser } = useContext(UserContext);

  const deletePost = async (post) => {
    try {
      const data = await axios.post("/deletePost", { post });

      console.log(data);

      if (data.status === 200) {
        location.reload();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const postComment = async () => {
    setLoading(true);
    if (!comment) {
      toast({ title: "Add a comment first", duration: 3000, status: "error" });
      setLoading(false);
      return;
    }
    let { _id: userId } = user;
    let { _id: postId } = selectedPost;
    try {
      let data = await axios.post("/postComment", {
        comment,
        userId,
        postId,
      });

      console.log(data);
      if (data.status === 200) {
        toast({ title: "Comment Added!", duration: 1000, status: "success" });
      }
      getComments(false);
      setComment("");
    } catch (e) {
      console.log(e);
      toast({
        title: "Error while uploading comment",
        duration: 2000,
        status: "error",
      });
    }
    setLoading(false);
  };

  const savePost = async (post) => {
    console.log("SavePost function called");
    let data = await axios.post("/savePost", { post });
    fetchSavedPosts();
  };

  const deleteSingleComment = async (delComment) => {
    try {
      let data = await axios.post("/deleteComment", { delComment });
      if (data.status === 200) {
        getComments(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const likeComment = async (likedComment) => {
    try {
      let data = await axios.post("/likeComment", { likedComment });
      if (data.status === 200) {
        getComments(false);
        console.log("Comment updated");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const postLike = async (postId) => {
    try {
      let data = await axios.post("/likePost", { postId });

      console.log(data.status);
      if (data.status === 201) {
        setPostLiked(true);
        selectedPost.likes.push(user._id);
        console.log(selectedPost.likes);
      } else if (data.status === 200) {
        setPostLiked(false);
        const index = selectedPost.likes.indexOf(user._id);
        selectedPost.likes.splice(index, 1);
        console.log(selectedPost.likes);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box w={"100%"} textAlign={"center"} position={"relative"}>
      <Modal isOpen={isOpen} onClose={onClose} size={"4xl"} isCentered>
        <ModalOverlay />
        <ModalContent>
          <Box
            position={"absolute"}
            right={"-8rem"}
            top={"-1rem"}
            fontSize={"1.2rem"}
          >
            <ModalCloseButton size={"xl"} color={"#fff"} fontWeight={"900"} />
          </Box>
          <ModalBody p={0}>
            <HStack spacing={"1rem"} alignItems={"flex-start"}>
              {/* left side */}
              <VStack w={"50%"} bgColor={"#000"}>
                <Box
                  w={"100%"}
                  h={"34rem"}
                  display={"flex"}
                  alignItems={"center"}
                >
                  <Image src={selectedPost?.content} w={"100%"} />
                </Box>
              </VStack>
              {/* right side */}
              <VStack
                w={"50%"}
                pt={"1rem"}
                alignItems={"flex-start"}
                position={"relative"}
                h={"34rem"}
              >
                {/* horizontal row */}
                <Box
                  w={"103.7%"}
                  h={"0.05rem"}
                  bgColor={"#262626"}
                  position={"absolute"}
                  left={"-1rem"}
                  top={"3.8rem"}
                ></Box>
                <Box w={"100%"}>
                  {/* first row */}
                  <Box
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    mb={"2rem"}
                  >
                    <Box display={"flex"} gap={"1rem"} alignItems={"center"}>
                      <Box>
                        <Avatar
                          src={
                            userProfile
                              ? userProfile.profilePicture
                              : user.profilePicture
                          }
                          size={"sm"}
                        />
                      </Box>
                      <Box>
                        <Text fontWeight={"500"}>
                          {userProfile ? userProfile.username : user.username}
                        </Text>
                      </Box>
                    </Box>
                    {/* Three dots icon */}
                    {!userProfile && (
                      <Box cursor={"pointer"} pr={"1.2rem"}>
                        <Menu>
                          <MenuButton>
                            <Text>
                              <i class="fa-solid fa-ellipsis"></i>
                            </Text>
                          </MenuButton>
                          <MenuList>
                            <MenuItem
                              onClick={() => {
                                deletePost(selectedPost._id);
                              }}
                            >
                              <Text color={"red"}>Delete</Text>
                            </MenuItem>
                          </MenuList>
                        </Menu>
                      </Box>
                    )}
                  </Box>
                  {/* Second row */}
                  <Box mb={"1rem"} pr={"1.2rem"}>
                    <Box display={"flex"} gap={"0.5rem"} alignItems={"top"}>
                      <Box display={"flex"} gap={"1rem"} alignItems={"top"}>
                        <Box>
                          <Avatar
                            src={
                              userProfile
                                ? userProfile.profilePicture
                                : user.profilePicture
                            }
                            size={"sm"}
                          />
                        </Box>
                        <Box>
                          <Text fontWeight={"500"}>
                            {userProfile ? userProfile.username : user.username}
                          </Text>
                        </Box>
                      </Box>
                      <Box>
                        <Text>{selectedPost.caption}</Text>
                      </Box>
                    </Box>
                    {/* Display comments */}
                    {!commentLoading && (
                      <Box
                        w={"100%"}
                        h={"15rem"}
                        mt={"1.5rem"}
                        overflowY={"scroll"}
                      >
                        {postComments.map((e) => {
                          return (
                            <Box
                              display={"flex"}
                              justifyContent={"space-between"}
                              alignItems={"flex-start"}
                              role="group"
                            >
                              <Box
                                display={"flex"}
                                alignItems={"flex-start"}
                                mb={"1.5rem"}
                                gap={"1rem"}
                              >
                                <Link
                                  href={
                                    user._id === e.postedBy._id
                                      ? "/profile"
                                      : `/user/${e.postedBy._id}`
                                  }
                                >
                                  <Box>
                                    <Avatar
                                      src={e.postedBy.profilePicture}
                                      size={"sm"}
                                    />
                                  </Box>
                                </Link>
                                <Box>
                                  <Link
                                    href={
                                      user._id === e.postedBy._id
                                        ? "/profile"
                                        : `/user/${e.postedBy._id}`
                                    }
                                    _hover={{ textDecoration: "none" }}
                                  >
                                    <Text fontWeight={"500"}>
                                      {e.postedBy.username}
                                    </Text>
                                  </Link>
                                  <Text fontSize={"0.7rem"}>
                                    {/* {moment(e.createdAt, "YYYYMMDD").fromNow()} */}
                                    1d
                                  </Text>
                                </Box>
                                <Box textAlign={"right"}>
                                  <Text>{e.content}</Text>
                                  <Menu>
                                    <MenuButton
                                      _groupHover={{ opacity: 1 }}
                                      opacity={"0"}
                                    >
                                      <Text
                                        fontSize={"0.7rem"}
                                        pr={"1rem"}
                                        cursor={"pointer"}
                                      >
                                        <i class="fa-solid fa-ellipsis"></i>
                                      </Text>
                                    </MenuButton>
                                    <MenuList>
                                      {user._id === e.postedBy._id && (
                                        <MenuItem
                                          onClick={() => {
                                            deleteSingleComment(e._id);
                                          }}
                                        >
                                          <Text color={"red"}>Delete</Text>
                                        </MenuItem>
                                      )}
                                      <MenuItem>Report</MenuItem>
                                    </MenuList>
                                  </Menu>
                                </Box>
                              </Box>
                              <Box
                                mr={"1rem"}
                                mt={"0.5rem"}
                                cursor={"pointer"}
                                onClick={() => {
                                  likeComment(e._id);
                                }}
                              >
                                <Text fontSize={"0.6rem"} textAlign={"center"}>
                                  {e.likes.includes(user._id) ? (
                                    <i
                                      class="fa-solid fa-heart"
                                      style={{ color: "red" }}
                                    ></i>
                                  ) : (
                                    <i class="fa-regular fa-heart"></i>
                                  )}
                                </Text>
                                <Text fontSize={"0.6rem"} textAlign={"center"}>
                                  {e.likes.length > 0 ? e.likes.length : null}
                                </Text>
                              </Box>
                            </Box>
                          );
                        })}
                      </Box>
                    )}
                    {commentLoading && (
                      <Box>
                        <Box>
                          <LoadingScr size={0.4} />
                        </Box>
                      </Box>
                    )}
                  </Box>
                  {/* Bottom section (Like, comment and save button section) */}
                  <Box
                    mt={"1rem"}
                    w={"100%"}
                    h={"8rem"}
                    position={"absolute"}
                    bottom={"0"}
                  >
                    <Box
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                    >
                      <Box display={"flex"} gap={"1rem"}>
                        <Box
                          cursor={"pointer"}
                          onClick={() => {
                            postLike(selectedPost ? selectedPost._id : null);
                          }}
                        >
                          <Text
                            fontSize={"1.5rem"}
                            onClick={(e) => {
                              console.log(e.target);
                              if (
                                e.target.classList[0] === "fa-regular" ||
                                e.target.classList[1] === "fa-regular"
                              ) {
                                e.target.classList.remove("fa-regular");
                                e.target.classList.add("fa-solid");
                                e.target.style.color = "red";
                              } else if (
                                e.target.classList[0] === "fa-solid" ||
                                e.target.classList[1] === "fa-solid"
                              ) {
                                e.target.classList.remove("fa-solid");
                                e.target.classList.add("fa-regular");
                                e.target.style.color = null;
                              }
                              console.log(e.target);
                            }}
                          >
                            <i
                              class={
                                postLiked
                                  ? "fa-solid fa-heart"
                                  : "fa-regular fa-heart"
                              }
                              style={{ color: postLiked ? "red" : "black" }}
                            ></i>
                          </Text>
                        </Box>
                        <Box
                          cursor={"pointer"}
                          onClick={() => {
                            document.getElementById("commentInput").focus();
                          }}
                        >
                          <Text fontSize={"1.5rem"}>
                            <i class="fa-regular fa-comment"></i>
                          </Text>
                        </Box>
                      </Box>
                      <Box pr={"1.2rem"} cursor={"pointer"}>
                        <Text
                          fontSize={"1.4rem"}
                          onClick={(e) => {
                            savePost(selectedPost._id);
                            if (
                              e.target.classList[0] === "fa-regular" ||
                              e.target.classList[1] === "fa-regular"
                            ) {
                              e.target.classList.remove("fa-regular");
                              e.target.classList.add("fa-solid");
                            } else if (
                              e.target.classList[0] === "fa-solid" ||
                              e.target.classList[1] === "fa-solid"
                            ) {
                              e.target.classList.remove("fa-solid");
                              e.target.classList.add("fa-regular");
                            }
                          }}
                        >
                          {savedPosts.some((post) => {
                            return post._id === selectedPost._id;
                          }) ? (
                            <i class="fa-solid fa-bookmark"></i>
                          ) : (
                            <i class="fa-regular fa-bookmark"></i>
                          )}
                        </Text>
                      </Box>
                    </Box>
                    {/* Date of post */}
                    <Box mt={"1rem"}>
                      <Text fontSize={"0.8rem"}>
                        {moment(selectedPost.createdAt).format("LL")}
                      </Text>
                    </Box>
                    {/* Create a comment */}
                    <Box mt={"1rem"} pl={0} ml={"-1rem"} mr={"0.5rem"}>
                      <Box>
                        <InputGroup>
                          <Input
                            border={"none"}
                            outline={"none"}
                            placeholder="Add a comment..."
                            id="commentInput"
                            _focusVisible={{ outline: "none", border: "none" }}
                            onChange={(e) => {
                              setComment(e.target.value);
                            }}
                            value={comment}
                          />
                          <InputRightElement>
                            <Button
                              bgColor={"transparent"}
                              color={"#0a66c2"}
                              mr={"1rem"}
                              ml={"1rem"}
                              _hover={{ bgColor: "transparent", color: "blue" }}
                              onClick={postComment}
                              isLoading={loading}
                            >
                              Post
                            </Button>
                          </InputRightElement>
                        </InputGroup>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </VStack>
            </HStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default DisplayPost;
