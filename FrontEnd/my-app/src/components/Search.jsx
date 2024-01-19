import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import LoadingScr from "./LoadingScreen/LoadingScr";
import { UserContext } from "./ContextAPI/Context";
import { Search2Icon } from "@chakra-ui/icons";
import axios from "axios";
import SearchUser from "./SearchComponents/SearchUser";
import SearchHistory from "./SearchComponents/SearchHistory";

const Search = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  let { openDrawer, setOpenDrawer } = useContext(UserContext);

  const [searchInput, setSearchInput] = useState("");

  const [loading, setLoading] = useState(false);

  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    openDrawer && onOpen();

    !isOpen && setOpenDrawer(false);
  }, [openDrawer, isOpen]);

  const btnRef = React.useRef();

  const searchUser = async () => {
    console.log("called");
    if (!searchInput) {
      setSearchResult([]);
      return;
    }
    setLoading(true);
    try {
      let data = await axios.post("/searchUser", { searchInput });
      console.log(data.data);
      setSearchResult(data?.data);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  return (
    <Box>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
        size={"sm"}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <Text fontSize={"1.5rem"}>Search</Text>
          </DrawerHeader>

          <DrawerBody pl={0} pr={0}>
            <Box>
              <Box pl={"1.3rem"} pr={"1.3rem"}>
                <InputGroup>
                  <Input
                    placeholder="Search user by name or username"
                    onChange={(e) => {
                      setSearchInput(e.target.value);
                      if (e.target.value === "") {
                        setSearchResult([]);
                      }
                    }}
                    value={searchInput}
                  />
                  <InputRightElement cursor={"pointer"} onClick={searchUser}>
                    <Search2Icon />
                  </InputRightElement>
                </InputGroup>
              </Box>
              {/* horizontal row */}
              <Box
                w={"100%"}
                h={"0.01rem"}
                bgColor={"#a1a1a1"}
                mt={"1.3rem"}
                opacity={"0.7"}
              ></Box>
              {/* show search result users here */}
              <Box pl={"1.3rem"} pr={"1.3rem"}></Box>
              {loading && (
                <Box>
                  <LoadingScr size={"0.35"} />
                </Box>
              )}
              {/* Search history */}
              {!searchInput && (
                <Box>
                  <Box mt={"1rem"}>
                    <SearchHistory isHistory={true} />
                  </Box>
                </Box>
              )}
              {/* Search results */}
              {searchInput && (
                <Box mt={"1rem"}>
                  {searchResult?.map((user, index) => {
                    return (
                      <SearchUser
                        key={index}
                        id={user._id}
                        name={user.name}
                        username={user.username}
                        pic={user.profilePicture}
                      />
                    );
                  })}
                </Box>
              )}
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Search;
