import {
  Avatar,
  Box,
  Button,
  FormLabel,
  HStack,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  VStack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { UserContext } from "../ContextAPI/Context";
import LoadingBar from "react-top-loading-bar";
import axios from "axios";

const CreatePost = ({ isOpen, onClose, createMedia }) => {
  const [uploadedFile, setUploadedFile] = useState("");

  const [caption, setCaption] = useState("");

  const [loading, setLoading] = useState(false);

  const [blobImage, setBlobImage] = useState("");

  const [progress, setProgress] = useState(0);

  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    console.log(acceptedFiles[0]);
    if (acceptedFiles[0].size / (1024 * 1024) >= 50) {
      alert("The size of the video is greater than 50MB");
      onClose();
    }
    setUploadedFile(acceptedFiles[0]);
    setBlobImage(URL.createObjectURL(acceptedFiles[0]));
  }, []);

  const toast = useToast();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  let { user, setUser } = useContext(UserContext);

  const showToast = (code) => {
    toast({
      title:
        code === 200
          ? "Post created successfully"
          : "Error while creating post",
      duration: 3000,
      status: code === 200 ? "success" : "error",
      isClosable: true,
    });
  };

  const uploadFileToCloud = async () => {
    const formData = new FormData();
    formData.append("file", uploadedFile);
    formData.append("upload_preset", "instagram_clone");
    formData.append("cloud_name", "dnf13nlhy");

    let response = await axios.post(
      "https://api.cloudinary.com/v1_1/dnf13nlhy/image/upload",
      formData
    );

    return response.data.secure_url;
  };

  useEffect(() => {
    console.log(isOpen);
    if (!isOpen) {
      setCaption("");
      setUploadedFile("");
    }
  }, [isOpen]);

  const postDataToBackend = async () => {
    setLoading(true);
    try {
      let post = await uploadFileToCloud();

      let data = await axios.post(
        "/createPost",
        { post, caption },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (data.status === 200) {
        showToast(200);
      } else {
        showToast(400);
      }

      console.log(data);
    } catch (e) {
      showToast(400);
      console.log(e);
    }
    setLoading(false);
    onClose();
  };

  // for uploading reels
  async function uploadVideo() {
    if (!uploadedFile) {
      alert("Upload a file first");
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("file", uploadedFile);
    formData.append("upload_preset", "instagram_clone");
    const config = {
      onUploadProgress: (e) => {
        setProgress((e.loaded / e.total) * 100);
      },
    };
    formData.append("cloud_name", "dnf13nlhy");

    let response = await axios.post(
      "https://api.cloudinary.com/v1_1/dnf13nlhy/video/upload",
      formData,
      config,
      { quality: 10 }
    );

    console.log(response.data.secure_url);

    let res = await axios.post(
      "/createReel",
      { reel: response.data.secure_url, caption },
      config
    );
    if (res.data.status === 200) {
      alert("Reel uploaded");
    }
    setLoading(false);
  }

  return (
    <Box>
      <LoadingBar
        color="linear-gradient(124deg, #ff2400, #e81d1d, #e8b71d, #e3e81d, #1de840, #1ddde8, #2b1de8, #dd00f3, #dd00f3)"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={uploadedFile ? "2xl" : "sm"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={"center"}>
            <Box mb={"0.3rem"}>
              <Text>
                {createMedia === "Post" ? "Create new post" : "Create new reel"}
              </Text>
            </Box>
            <hr></hr>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <HStack w={"100%"} h={"23rem"} spacing={"1.5rem"}>
              {/* Left side is for uploading posts */}
              <VStack w={uploadedFile ? "50%" : "100%"} h={"100%"}>
                <Box
                  w={"100%"}
                  h={"100%"}
                  textAlign={"center"}
                  display={"flex"}
                  flexDirection={"column"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  gap={"2rem"}
                >
                  {!uploadedFile && (
                    <Box {...getRootProps()}>
                      <Text fontSize={"4rem"}>
                        {createMedia === "Post" ? (
                          <i class="fa-regular fa-image"></i>
                        ) : (
                          <i class="fa-solid fa-film"></i>
                        )}
                      </Text>
                      <Box>
                        <Text>
                          {createMedia === "Post"
                            ? "Drag photos here"
                            : "Drag videos here"}
                        </Text>
                        {createMedia === "Reel" ? (
                          <Box>
                            <Text
                              fontSize={"0.8rem"}
                              color={"#333"}
                              fontWeight={"400"}
                            >
                              (&nbsp;Uploading reels may take longer time than
                              usual...&nbsp;)
                            </Text>
                            <Text
                              fontSize={"0.8rem"}
                              color={"red"}
                              fontWeight={"600"}
                            >
                              (&nbsp;Video size should be less than 50MB&nbsp;)
                            </Text>
                          </Box>
                        ) : null}
                      </Box>
                    </Box>
                  )}
                  {!uploadedFile && (
                    <Input
                      type="file"
                      visibility={"hidden"}
                      id="inputFile"
                      onChange={(e) => {
                        setUploadedFile(e.target.files[0]);
                      }}
                      {...getInputProps()}
                    />
                  )}
                  {!uploadedFile && (
                    <Box>
                      <label
                        for="inputFile"
                        style={{
                          backgroundColor: "skyblue",
                          padding: "0.5rem",
                          paddingLeft: "1.5rem",
                          paddingRight: "1.5rem",
                          borderRadius: "0.5rem",
                          fontSize: "1.1rem",
                          cursor: "pointer",
                        }}
                      >
                        Select from computer
                      </label>
                    </Box>
                  )}

                  {/* When file uploaded, show here */}
                  {uploadedFile && createMedia === "Post" && (
                    <Box
                      w={"100%"}
                      h={"100%"}
                      backgroundImage={`url(${blobImage})`}
                      bgSize={"100% 100%"}
                      bgRepeat={"no-repeat"}
                      overflow={"hidden"}
                      borderRadius={"0.5rem"}
                    ></Box>
                  )}
                  {uploadedFile && createMedia === "Reel" && (
                    <Box
                      w={"100%"}
                      h={"100%"}
                      overflow={"hidden"}
                      borderRadius={"0.5rem"}
                      display={"flex"}
                      alignItems={"center"}
                    >
                      <video src={blobImage} autoPlay loop></video>
                    </Box>
                  )}
                </Box>
              </VStack>
              {/* Right side is for uploading comments */}
              {uploadedFile && (
                <VStack w={"50%"} h={"100%"}>
                  <Box w={"100%"}>
                    <Box display={"flex"} alignItems={"center"} gap={"0.7rem"}>
                      <Box textAlign={"left"}>
                        <Avatar img={user.profilePicture} size={"sm"} />
                      </Box>
                      <Box>
                        <Text fontWeight={"500"}>{user.username}</Text>
                      </Box>
                    </Box>
                    <Box mt={"1rem"}>
                      <Textarea
                        rows={"10"}
                        placeholder="Write a caption..."
                        border={"none"}
                        outline={"none"}
                        _focusVisible={{ border: "none", outline: "none" }}
                        resize={"none"}
                        maxLength={300}
                        onChange={(e) => {
                          setCaption(e.target.value);
                        }}
                      />
                    </Box>
                    <Box textAlign={"right"} mt={"0.2rem"}>
                      <Text fontSize={"0.9rem"}>{caption.length}/300</Text>
                    </Box>
                    <Box mt={"0.5rem"}>
                      <Button
                        w={"100%"}
                        colorScheme="blue"
                        onClick={
                          createMedia === "Post"
                            ? postDataToBackend
                            : uploadVideo
                        }
                        isLoading={loading}
                      >
                        Share
                      </Button>
                    </Box>
                  </Box>
                </VStack>
              )}
            </HStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default CreatePost;
