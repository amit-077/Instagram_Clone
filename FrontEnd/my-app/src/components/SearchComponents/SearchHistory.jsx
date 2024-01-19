import { Box, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import SearchUser from "./SearchUser";

const SearchHistory = ({ isHistory }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    function fetchHistory() {
      setHistory(JSON.parse(localStorage.getItem("searchHistory")));
    }

    fetchHistory();
  }, []);

  return (
    <Box pl={"1.3rem"} pr={"1.3rem"}>
      <Box
        pl={"1.3rem"}
        pr={"1rem"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        mb={"1rem"}
      >
        <Box mt={"0.5rem"}>
          <Text fontSize={"1.1rem"} fontWeight={"500"}>
            Recent
          </Text>
        </Box>
        <Box mt={"0.5rem"} cursor={"pointer"}>
          <Text
            fontWeight={"500"}
            fontSize={"0.9rem"}
            color={"#0a66c2"}
            _hover={{ color: "#000" }}
            onClick={() => {
              setHistory([]);
              localStorage.setItem("searchHistory", JSON.stringify([]));
            }}
          >
            Clear all
          </Text>
        </Box>
      </Box>
      {/*  */}
      {history?.map((user, index) => {
        return (
          
          <SearchUser
            key={index}
            id={user.id}
            name={user.name}
            username={user.username}
            pic={user.pic}
            isHistory={isHistory ? isHistory : null}
            setHistory={setHistory}
            history={history}
          />
        );
      })}
    </Box>
  );
};

export default SearchHistory;
