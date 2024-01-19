import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "./ContextAPI/Context";
import { Box, Skeleton, SkeletonCircle, VStack } from "@chakra-ui/react";
import axios from "axios";
import Video from "./Video";

const Reels = () => {
  let { user, setUser } = useContext(UserContext);
  const [reels, setReels] = useState([]);
  const [loading, SetLoading] = useState(false);

  function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  const getReels = async () => {
    SetLoading(true);
    let allReels = await axios.get("/getAllReels");
    console.log(allReels.data);
    setReels(shuffleArray(allReels.data));
    SetLoading(false);
  };

  useEffect(() => {
    getReels();
  }, []);


  let output;
  output = loading ? (
    <Box
      display={"flex"}
      w={"100%"}
      h={"100%"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Box
        w={"20rem"}
        h={"90%"}
        bg={"#363636"}
        m={"auto"}
        borderRadius={"0.3rem"}
        position={"relative"}
      >
        <VStack
          align={"left"}
          spacing={"3"}
          pl={"1.3rem"}
          position={"absolute"}
          bottom={"1rem"}
        >
          <Box
            display={"flex"}
            gap={"0.7rem"}
            justifyContent={"left"}
            alignItems={"center"}
          >
            <SkeletonCircle size="9" speed={1.5} />
            <Skeleton height={"13px"} w={"9rem"} speed={1.5} />
          </Box>
          <Skeleton height={"13px"} w={"9rem"} speed={1.1} />
          <Skeleton height={"13px"} w={"7rem"} speed={0.8} />
        </VStack>
      </Box>
    </Box>
  ) : (
    <VStack scrollBehavior={"smooth"}>
      {/* <VideoComponent vid={"/Videos/video.mp4"} index={"1"} />
    <VideoComponent vid={"/Videos/video.mp4"} index={"2"} />
    <VideoComponent vid={"/Videos/video.mp4"} index={"3"} /> */}
      {reels.map((reel, index) => {
        return <Video vid={reel} index={index + 1} key={index} />;
      })}
    </VStack>
  );

  //
  //
  //
  return (
    <Box w={"80%"} className="reelsDiv">
      {output}
    </Box>
  );
};

export default Reels;
