import { Box, Button, HStack, Image, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "./ContextAPI/Context";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Posts from "./ProfileComponents/Posts";
import DisplayPost from "./ProfileComponents/DisplayPost";
import { useParams } from "react-router-dom";

const Profile = () => {
  let { user, setUser } = useContext(UserContext);

  let [userPosts, setUserPosts] = useState([]);

  let [loading, setLoading] = useState(false);

  const [refresh, setRefresh] = useState(false); // to purposely refresh component

  return (
    userPosts && (
      <Box w={"80%"} h={"100vh"} pt={"2rem"}>
        <Box>
          <HStack alignItems={"flex-start"}>
            <Box w={"30%"} display={"flex"} justifyContent={"center"}>
              <Image
                src={user?.profilePicture}
                w={"8rem"}
                h={"8rem"}
                borderRadius={"full"}
              />
            </Box>
            <Box>
              <Box display={"flex"} alignItems={"center"} gap={"2rem"}>
                <Box>
                  <Text fontSize={"1.3rem"}>{user?.username}</Text>
                </Box>
                <Box
                  cursor={"pointer"}
                  bgColor={"#efefef"}
                  borderRadius={"0.5rem"}
                  pt={"0.4rem"}
                  pb={"0.4rem"}
                  pl={"1.5rem"}
                  pr={"1.5rem"}
                  _hover={{ bgColor: "#ebebeb" }}
                >
                  <Text fontSize={"0.9rem"} fontWeight={"500"}>
                    Edit profile
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
                      {user?.followers?.length || 0}&nbsp;
                    </Text>
                    followers
                  </Text>
                </Box>
                <Box>
                  <Text>
                    <Text display={"inline-block"} fontWeight={"600"}>
                      {user?.following?.length || 0}&nbsp;
                    </Text>
                    following
                  </Text>
                </Box>
              </Box>
              <Box mt={"1.5rem"}>
                <Box>
                  <Text>{user?.name}</Text>
                </Box>
              </Box>
            </Box>
          </HStack>
        </Box>
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
              <Tab>
                <i class="fa-regular fa-bookmark"></i>&nbsp;&nbsp;Saved
              </Tab>
            </TabList>

            <TabPanels>
              <TabPanel pl={0} pr={0}>
                <Posts
                  setUserPosts={setUserPosts}
                  section={"normalPosts"}
                  refresh={refresh}
                />
              </TabPanel>
              <TabPanel>
                <p>Reels!</p>
              </TabPanel>
              <TabPanel pl={0} pr={0}>
                <Posts section={"savedPosts"} refresh={refresh} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Box>
    )
  );
};

export default Profile;
