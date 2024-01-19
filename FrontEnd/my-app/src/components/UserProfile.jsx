import { Box, Button, HStack, Image, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "./ContextAPI/Context";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Posts from "./ProfileComponents/Posts";
import DisplayPost from "./ProfileComponents/DisplayPost";
import { useParams } from "react-router-dom";
import LoadingScr from "./LoadingScreen/LoadingScr";

const UserProfile = () => {
  let { user, setUser } = useContext(UserContext);

  let [userPosts, setUserPosts] = useState([]);

  let [loading, setLoading] = useState(false);

  const [refresh, setRefresh] = useState(false); // to purposely refresh component

  const [userProfile, setUserProfile] = useState("");

  const [pressedFollow, setPressedFollow] = useState(false);

  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);

  let { userId } = useParams();

  async function getUserData() {
    setLoading(true);
    let data = await axios.post("/getUser", { userId });

    console.log("User data");
    console.log(data.data.user);
    setFollowers(data.data.user.followers.length);
    setFollowing(data.data.user.following.length);
    setUserProfile(data.data.user);
    setUserPosts(data.data.posts.reverse());
    setLoading(false);
  }

  useEffect(() => {
    getUserData();
  }, [userId]);

  const sendFollowRequest = async (userId) => {
    try {
      let data = await axios.post("/follow", { userId });
      console.log(data);

      if (data.status === 200) {
        // getUserData();
        console.log("Follower added");
      }
    } catch (e) {
      console.log(e);
    }
  };

  console.log(userProfile);
  console.log(user._id);

  return (
    <Box w={"80%"} h={"100vh"} pt={"2rem"}>
      {loading && (
        <Box
          w={"100%"}
          h={"100%"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <LoadingScr size={"0.7"} />
        </Box>
      )}
      {!loading && userProfile && (
        <Box>
          <HStack alignItems={"flex-start"}>
            <Box w={"30%"} display={"flex"} justifyContent={"center"}>
              <Image
                src={userProfile?.profilePicture}
                w={"8rem"}
                h={"8rem"}
                borderRadius={"full"}
              />
            </Box>
            <Box>
              <Box display={"flex"} alignItems={"center"} gap={"2rem"}>
                <Box>
                  <Text fontSize={"1.3rem"}>{userProfile.username}</Text>
                </Box>
                <Box
                  cursor={"pointer"}
                  bgColor={
                    userProfile.followers.includes(user._id) || pressedFollow
                      ? "#f5f5f5"
                      : "#3796ee"
                  }
                  borderRadius={"0.5rem"}
                  pt={"0.2rem"}
                  pb={"0.2rem"}
                  pl={"1.5rem"}
                  pr={"1.5rem"}
                  _hover={{
                    bgColor:
                      userProfile.followers.includes(user._id) || pressedFollow
                        ? "#f1f1f1"
                        : "#449cff",
                  }}
                  onClick={() => {
                    sendFollowRequest(userProfile._id);
                    if (!userProfile.followers.includes(user._id)) {
                      setPressedFollow((prevVal) => {
                        if (prevVal == false) {
                          setFollowers(followers + 1);
                        } else {
                          setFollowers(followers - 1);
                        }
                        return !prevVal;
                      });
                    }
                  }}
                >
                  <Text fontSize={"1.1rem"}>
                    {userProfile.followers.includes(user._id) || pressedFollow
                      ? "following"
                      : "follow"}
                  </Text>
                </Box>
              </Box>
              <Box mt={"2rem"} display={"flex"} gap={"3rem"}>
                <Box>
                  <Text>
                    <Text display={"inline-block"} fontWeight={"600"}>
                      {userPosts ? userPosts.length : 0}&nbsp;
                    </Text>
                    posts
                  </Text>
                </Box>
                <Box>
                  <Text>
                    <Text display={"inline-block"} fontWeight={"600"}>
                      {followers}&nbsp;
                    </Text>
                    followers
                  </Text>
                </Box>
                <Box>
                  <Text>
                    <Text display={"inline-block"} fontWeight={"600"}>
                      {following}&nbsp;
                    </Text>
                    following
                  </Text>
                </Box>
              </Box>
              <Box mt={"1.5rem"}>
                <Box>
                  <Text>{userProfile.name}</Text>
                </Box>
              </Box>
            </Box>
          </HStack>
        </Box>
      )}
      {!loading && userProfile && (
        <Box mt={"3rem"} pl={"1.5rem"} pr={"2.5rem"}>
          {/* Why below onchange is used ?? */}

          {/* Because I want that whenever user enters the saved section or normal posts section, 
          the request is again sent to backend and the posts are refreshed so that if any post is just saved 
          by user, that can also be rendered */}
          <Tabs
            onChange={() => {
              setRefresh(!refresh);
            }}
          >
            <TabList gap={"2rem"} display={"flex"} justifyContent={"center"}>
              <Tab>
                <i class="fa-solid fa-table-cells"></i>&nbsp;&nbsp;Posts
              </Tab>
              <Tab>
                <i class="fa-solid fa-film"></i>&nbsp;&nbsp;Reels
              </Tab>
            </TabList>

            <TabPanels>
              <TabPanel pl={0} pr={0}>
                <Posts
                  setUserPosts={setUserPosts}
                  section={"normalPosts"}
                  refresh={refresh}
                  searchUser={true}
                  userPosts={userPosts}
                  userProfile={userProfile}
                />
              </TabPanel>
              <TabPanel>
                <p>Reels!</p>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      )}
    </Box>
  );
};

export default UserProfile;
