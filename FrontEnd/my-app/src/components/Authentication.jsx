import { Box, Input, Text } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import React from "react";
import Register from "./Register";
import Login from "./Login";

const Authentication = () => {
  return (
    <Box
      w={"100vw"}
      display={"flex"}
      justifyContent={"center"}
      bgColor={'#fafafa'}
      h={'100vh'}
      //   alignItems={"center"}
    >
      <Box
        bgColor={"#fff"}
        pl={"2rem"}
        pr={"2rem"}
        pt={"1rem"}
        pb={"1rem"}
        mt={'1rem'}
        mb={'0rem'}
        borderRadius={"0.5rem"}
        w={"40%"}
      >
        <Box textAlign={'center'}>
          <Text fontSize={"2rem"} fontStyle={"italic"} mb={'3rem'}>
            Instagram
          </Text>
          <Tabs variant={'solid-rounded'} colorScheme="blue">
            <TabList w={"100%"} mb={'1.5rem'}>
              <Tab w={"50%"}>Register</Tab>
              <Tab w={"50%"}>Login</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Register/>
              </TabPanel>
              <TabPanel>
                <Login/>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Box>
    </Box>
  );
};

export default Authentication;
