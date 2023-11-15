import React, { FC, memo, useState } from "react";
import {
  Box,
  Icon,
  Theme,
  Button,
  useTheme,
  SimpleGrid,
  IconButton,
} from "@chakra-ui/react";
import { FaVideoSlash, FaDownload, FaCamera } from "react-icons/fa";
import "video-react/dist/video-react.css";
import { Player } from "video-react";
import RecordRTC, {
  // @ts-ignore
  RecordRTCPromisesHandler,
} from "recordrtc";
// import { startRecording, stopRecording } from "./utils";

const Recorder = () => {
  const theme: Theme = useTheme();
  const [recorder, setRecorder] = useState<RecordRTC | null>();
  const [stream, setStream] = useState<MediaStream | null>();
  const [videoBlob, setVideoUrlBlob] = useState<Blob | null>();

  const startRecording = async () => {
    console.log("reacher recording function");
    const mediaDevices = navigator.mediaDevices;
    const stream: MediaStream = await mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    const recorder: RecordRTC = new RecordRTCPromisesHandler(stream, {
      type: "video",
    });

    await recorder.startRecording();
    setRecorder(recorder);
    setStream(stream);
    setVideoUrlBlob(null);
  };

  const stopRecording = async () => {
    if (recorder) {
      await recorder.stopRecording();
      const blob: Blob = await recorder.getBlob();
      (stream as any).stop();
      setVideoUrlBlob(blob);
      setStream(null);
      setRecorder(null);
    }
  };

  return (
    <>
      <SimpleGrid spacing="5" p="5">
        <Box className="justify-center flex flex-row">
          <IconButton
            m="1"
            bg={theme.colors.blue[600]}
            size="lg"
            aria-label="start recording"
            color="white"
            onclick={startRecording()}
            icon={<Icon as={FaCamera} />}
          />
          <IconButton
            m="1"
            bg={theme.colors.blue[600]}
            size="lg"
            color="white"
            aria-label="stop recording"
            disabled={recorder ? false : true}
            onclick={stopRecording()}
            icon={<Icon as={FaVideoSlash} />}
          />
          <IconButton
            bg={theme.colors.blue[600]}
            m="1"
            size="lg"
            disabled={!!!videoBlob}
            color="white"
            aria-label="download video"
            icon={<Icon as={FaDownload} />}
          />
        </Box>
        <Box className="justify-center flex">
          <Box
            className="h-[50vh] w-[50vh]"
            bg={!!videoBlob ? "inherit" : "blue.50"}
          >
            {!!videoBlob && (
              <Player src={window.URL.createObjectURL(videoBlob)} />
            )}
          </Box>
        </Box>
      </SimpleGrid>
    </>
  );
};

export default memo(Recorder);
