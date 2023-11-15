"use client";
import { ChakraProvider } from "@chakra-ui/react";
import { Header, Recorder, UploadVideo } from "@/Components";
import theme from "./theme";

export default function Home() {
  return (
    <ChakraProvider>
      <Header />
      <Recorder />
      <UploadVideo />
    </ChakraProvider>
  );
}
