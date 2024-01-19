import { Avatar, Box, Text } from "@chakra-ui/react";
import React, { useContext } from "react";
import { UserContext } from "../ContextAPI/Context";
import { CloseIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const SearchUser = ({
  name,
  username,
  pic,
  id,
  isHistory,
  setHistory,
  history,
}) => {
  let { user, setUser } = useContext(UserContext);

  const navigator = useNavigate();

  return (
    <Box
      display={"flex"}
      justifyContent={"left"}
      pl={"1.3rem"}
      pr={"1.3rem"}
      pt={"0.5rem"}
      pb={"0.5rem"}
      mb={"0.5rem"}
      _hover={{ bgColor: "#f5f5f5" }}
    >
      <Box
        w={"100%"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Box
          display={"flex"}
          alignItems={"center"}
          gap={"1rem"}
          cursor={"pointer"}
          onClick={() => {
            // navigate user to profile of that user

            navigator(`/user/${id}`);

            // store that user in history
            let stopFunc = false;
            let obj = { name, username, pic, id };
            let history = JSON.parse(localStorage.getItem("searchHistory"));
            if (!history) {
              localStorage.setItem("searchHistory", JSON.stringify([]));
              history = JSON.parse(localStorage.getItem("searchHistory"));
            }

            history.map((user) => {
              if (user.id === id) {
                stopFunc = true;
                return;
              }
            });

            if (stopFunc) {
              return;
            }

            localStorage.setItem(
              "searchHistory",
              JSON.stringify([obj, ...history])
            );
          }}
        >
          {/* left side */}
          <Box>
            <Avatar size={"md"} src={pic} />
          </Box>
          {/* right side */}
          <Box>
            <Box>
              <Text fontWeight={"600"}>{username}</Text>
            </Box>
            <Box>
              <Text>{name}</Text>
            </Box>
          </Box>
        </Box>
        {/* right edge cross icon */}
        {isHistory && (
          <Box
            cursor={"pointer"}
            onClick={() => {
              console.log(id);

              // new array that does not contain the id which we deleted from history
              let newHistory = history.filter((user) => {
                return user.id !== id;
              });

              setHistory(newHistory);
              localStorage.setItem("searchHistory", JSON.stringify(newHistory));
              console.log(newHistory);
            }}
          >
            <CloseIcon opacity={"0.7"} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default SearchUser;
