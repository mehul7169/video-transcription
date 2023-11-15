import { memo } from "react";
import { Flex, Heading, useTheme, Theme } from "@chakra-ui/react";

const Header = () => {
  const theme: Theme = useTheme();
  return (
    <Flex className="p-5 mb-1 flex-1" bg={theme.colors.blue[700]} color="white">
      <Flex className="items-center">
        <Heading size="md">Transcribe your video instantly!</Heading>
      </Flex>
    </Flex>
  );
};

export default memo(Header);
