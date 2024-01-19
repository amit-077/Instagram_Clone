import { Avatar, Box, Input, Text, Textarea } from "@chakra-ui/react";
import React, { useContext } from "react";
import { UserContext } from "../ContextAPI/Context";

const EditProfile = () => {
  let { user, setUser } = useContext(UserContext);

  return (
    <Box w={"80%"} h={"100vh"} pt={"2rem"}>
      <Box pl={"1rem"}>
        <Text fontWeight={"500"} fontSize={"1.8rem"}>
          Settings
        </Text>
      </Box>
      {/* Edit profile box */}
      <Box
        border={"1px solid #333"}
        ml={"2rem"}
        mr={"2rem"}
        pl={"2rem"}
        pr={"1rem"}
        pt={"1rem"}
        pb={"1rem"}
      >
        <Box>
          <Text fontWeight={"400"} fontSize={"1.6rem"}>
            Edit profile
          </Text>
        </Box>
        <Box pl={"3rem"} mt={"2.5rem"}>
          {/* edit profile photo */}
          <Box display={"flex"} gap={"1.5rem"} alignItems={"center"}>
            <Box>
              <Avatar src={user.profilePicture} size={"sm"} />
            </Box>
            <Box>
              <Text fontWeight={"400"}>{user.username}</Text>
              <Text
                fontSize={"0.8rem"}
                color={"#0a66c2"}
                fontWeight={"600"}
                cursor={"pointer"}
              >
                Change profile photo
              </Text>
            </Box>
          </Box>
          {/* edit Bio */}
          <Box
            display={"flex"}
            gap={"1.5rem"}
            mt={"1.5rem"}
            justifyContent={"left"}
          >
            <Box>
              <Text fontWeight={"500"}>Bio</Text>
            </Box>
            <Box>
              <Textarea cols={"40"} />
              <Text fontSize={"0.8rem"} mt={"0.5rem"}>
                0/150
              </Text>
            </Box>
          </Box>
          {/* edit name */}
          <Box
            display={"flex"}
            gap={"1.5rem"}
            mt={"1.5rem"}
            alignItems={"center"}
            justifyContent={"left"}
          >
            <Box>
              <Text fontWeight={"500"}>Name</Text>
            </Box>
            <Box>
              <Input placeholder={user.name} />
            </Box>
          </Box>
          {/* edit username */}
          <Box
            display={"flex"}
            gap={"1.5rem"}
            mt={"1.5rem"}
            alignItems={"center"}
            justifyContent={"left"}
          >
            <Box>
              <Text fontWeight={"500"}>Username</Text>
            </Box>
            <Box>
              <Input placeholder={user.username} />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default EditProfile;
