import { Box } from "@chakra-ui/react";
import React from "react";

const LoadingScr = ({size}) => {
  return (
    <Box textAlign={"center"}>
      <Box>
        <div className="lds-spinner" style={{transform: `scale(${size?size:1})`}}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </Box>
    </Box>
  );
};

export default LoadingScr;
