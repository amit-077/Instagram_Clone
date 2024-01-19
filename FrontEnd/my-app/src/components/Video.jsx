import { React, useContext, useEffect, useRef, useState } from "react";
import { Avatar, Box, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "./ContextAPI/Context";
const format = require("format-duration");

const Video = (props) => {
  let currVideo = useRef("");
  let videoSound = useRef("");
  let [isPaused, setIsPaused] = useState(false);
  let [currTime, setCurrTime] = useState("0:00");
  const [isReelLiked, setIsReelLiked] = useState(false);
  const [isReelSaved, setIsReelSaved] = useState(false);

  const [truncateCaption, setTruncateCaption] = useState(true);

  let { user, setUser } = useContext(UserContext);

  const navigator = useNavigate();

  // to toggle sound on/ off

  function toggleSound() {
    // if (currVideo.current.muted || !currVideo.current.muted) {
    let videos = document.getElementsByClassName("vid");
    let volIcons = document.getElementsByClassName("volumeIcon");

    for (let i = 0; i < videos.length; i++) {
      videos[i].muted = !videos[i].muted;
      // (volIcons[i].innerHTML = `<i class="fa-solid fa-volume-xmark"></i>`)
      //   ? (volIcons[i].innerHTML = `<i class="fa-solid fa-volume-high"></i>`)
      //   : (volIcons[i].innerHTML = `<i class="fa-solid fa-volume-xmark"></i>`);
      if (videos[i].muted) {
        volIcons[i].innerHTML = `<i class="fa-solid fa-volume-xmark"></i>`;
      } else {
        volIcons[i].innerHTML = `<i class="fa-solid fa-volume-high"></i>`;
      }
    }
    // }
    // if (currVideo.current.muted) {
    //   videoSound.current.innerHTML = `<i class="fa-solid fa-volume-xmark"></i>`;
    // } else {
    //   videoSound.current.innerHTML = `<i class="fa-solid fa-volume-high"></i>`;
    // }

    pausePlayVideo();
  }

  function pausePlayVideo() {
    if (!currVideo?.current.paused) {
      currVideo?.current.pause();
      setIsPaused(true);
    } else {
      currVideo?.current.play();
      setIsPaused(false);
    }
  }

  useEffect(() => {
    let options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.7,
    };

    let callback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.target.id == `vid${props.index}`) {
          if (entry.isIntersecting) {
            entry.target.play();
          } else {
            entry.target.pause();
            entry.target.currentTime = 0;
            setIsPaused(false);
          }
        }
      });
    };

    let observer = new IntersectionObserver(callback, options);
    observer.observe(currVideo?.current);
  }, []);

  setInterval(() => {
    setCurrTime(
      format(
        Number(
          currVideo?.current?.duration - (currVideo?.current?.currentTime + 0.7)
        ) * 1000
      )
    );
    // console.log(currVideo.current.currentTime);
  }, 1000);
  //
  //
  //

  const likeReel = async (reelId) => {
    try {
      let data = await axios.post("/likeReel", { reelId });
      if (data.status === 201) {
        setIsReelLiked(true);
      } else if (data.status === 200) {
        setIsReelLiked(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const saveReel = async (reelId) => {
    try {
      let data = await axios.post("/saveReel", { reelId });
      if (data.status === 201) {
        setUser(data?.data);
        setIsReelSaved(true);
      } else if (data.status === 200) {
        setUser(data?.data);
        setIsReelSaved(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (props?.vid?.likes.includes(user._id)) {
      setIsReelLiked(true);
    } else {
      setIsReelLiked(false);
    }

    if (user?.savedPosts?.includes(props.vid._id)) {
      setIsReelSaved(true);
    } else {
      setIsReelSaved(false);
    }

    console.log("Hello World");
  }, [user]);

  return (
    <Box
      h={"100vh"}
      w={"20rem"}
      pt={"1.5rem"}
      pb={"1.5rem"}
      className="reelVideo"
      position={"relative"}
      onClick={pausePlayVideo}
      onContextMenu={() => {
        return false;
      }}
    >
      <video
        contextMenu="return false;"
        height={"100%"}
        width={"100%"}
        style={{
          objectFit: "fill",
          filter: !truncateCaption ? "brightness(70%)" : null,
        }}
        className="vid"
        // controls
        autoPlay
        muted
        loop
        ref={currVideo}
        id={`vid${props.index}`}
      >
        <source src={props.vid.content} />
      </video>
      <Box
        position={"absolute"}
        top={"1.8rem"}
        right={"0.5rem"}
        bg={"#2d2c2d"}
        p={"0.4rem"}
        borderRadius={"50%"}
        cursor={"pointer"}
        transform={"scale(0.8)"}
        color={"#fff"}
        onClick={toggleSound}
      >
        <Text ref={videoSound} className={"volumeIcon"}>
          <i class="fa-solid fa-volume-xmark"></i>
        </Text>
      </Box>
      <Box
        className="videoTime"
        position={"absolute"}
        top={"2rem"}
        left={"0.6rem"}
      >
        <Text fontWeight={"400"} color={"#d1d1d1"} opacity={"0.8"}>
          {currTime}
        </Text>
      </Box>
      <Box
        className="pauseIcon"
        position={"absolute"}
        top={"40%"}
        left={"40%"}
        fontSize={"1.5rem"}
        display={isPaused ? "block" : "none"}
      >
        <Text
          bg={"rgba(0, 0, 0, 0.7)"}
          // padding={"1rem"}
          borderRadius={"50%"}
          pt={"0.8rem"}
          pb={"0.8rem"}
          pl={"1.5rem"}
          pr={"1.4rem"}
          // opacity={'0.6'}
          color={"#fff  "}
        >
          <i class="fa-solid fa-play"></i>
        </Text>
      </Box>
      <Box position={"absolute"} bottom={"3rem"} left={"1rem"}>
        {/* profile photo and name */}
        <Box
          display={"flex"}
          justifyContent={"left"}
          alignItems={"top"}
          cursor={"pointer"}
          gap={"1rem"}
          onClick={() => {
            navigator(`/user/${props.vid.postedBy._id}`);
          }}
        >
          <Box>
            <Avatar size={"sm"} />
          </Box>
          <Box>
            <Text fontWeight={"600"} color={"#fff"}>
              {props.vid.postedBy.username}
            </Text>
          </Box>
        </Box>
        {/* captions */}
        <Box
          mt={"0.5rem"}
          cursor={"pointer"}
          onClick={() => {
            setTruncateCaption((prevVal) => {
              return !prevVal;
            });
            pausePlayVideo();
          }}
        >
          <Text color={"#fff"}>
            {truncateCaption
              ? props.vid.caption.substr(0, 15) + "..."
              : props.vid.caption}
          </Text>
        </Box>
      </Box>
      {/* Like, comment, save button */}
      <Box
        position={"absolute"}
        top={"17rem"}
        right={"-2.5rem"}
        display={"flex"}
        flexDir={"column"}
        gap={"1.8rem"}
      >
        {/* Like button */}
        <Box
          display={"flex"}
          flexDir={"column"}
          alignItems={"center"}
          cursor={"pointer"}
          onClick={(e) => {
            pausePlayVideo();
            likeReel(props.vid._id);
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
          }}
        >
          <Text>
            <i
              style={{
                transform: "scale(1.6)",
                color: isReelLiked ? "red" : "black",
              }}
              class={isReelLiked ? "fa-solid fa-heart" : "fa-regular fa-heart"}
            ></i>
          </Text>
          <Text fontSize={"0.7rem"}>Likes</Text>
        </Box>
        {/* Comment button */}
        <Box
          display={"flex"}
          flexDir={"column"}
          alignItems={"center"}
          cursor={"pointer"}
        >
          <Text>
            <i
              style={{ transform: "scale(1.6)" }}
              class="fa-regular fa-comment"
            ></i>
          </Text>
          <Text fontSize={"0.7rem"}>0</Text>
        </Box>
        {/* Save button */}
        <Box
          display={"flex"}
          flexDir={"column"}
          alignItems={"center"}
          cursor={"pointer"}
          onClick={(e) => {
            pausePlayVideo();
            saveReel(props.vid._id);
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
          <Text>
            <i
              style={{
                transform: "scale(1.6)",
                color: "black",
              }}
              class={
                isReelSaved ? "fa-solid fa-bookmark" : "fa-regular fa-bookmark"
              }
            ></i>
          </Text>
        </Box>
        {/* Three icon button */}
        <Box
          display={"flex"}
          flexDir={"column"}
          alignItems={"center"}
          mt={"0.5rem"}
          cursor={"pointer"}
        >
          <Text>
            <i
              style={{ transform: "scale(1.3)" }}
              class="fa-solid fa-ellipsis"
            ></i>
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default Video;
