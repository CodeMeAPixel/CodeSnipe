import { Box, Heading, useColorModeValue, Flex, useColorMode } from "@chakra-ui/react";
import Image from "next/image";
import { FC } from "react";

const Logo: FC = () => {
  const { colorMode } = useColorMode();
  const textColor = useColorModeValue("black", "white");
  const iconColor = useColorModeValue("blue.500", "blue.400");
  const iconBg = useColorModeValue("black", "whiteAlpha.50");
  const hoverBg = useColorModeValue("purple.100", "purple.800");
  
  return (
    <Flex 
      alignItems="center" 
      as="a" 
      href="/"
      transition="all 0.2s"
      _hover={{ 
        transform: "scale(1.02)",
        "& .icon-box": {
          bg: hoverBg,
          transform: "rotate(12deg)"
        }
      }}
    >
      <Box 
        className="icon-box"
        color={iconColor} 
        display="flex" 
        alignItems="center" 
        justifyContent="center"
        bg={iconBg}
        p={2}
        borderRadius="lg"
        transition="all 0.2s"
        boxShadow={colorMode === "light" ? "sm" : "none"}
      >
        <Image src="/cslogo.png" alt="CodeSnipe" width={24} height={24} />
      </Box>
      <Heading 
        as="h1" 
        size={["sm", "md"]} 
        ml={3} 
        fontWeight="bold"
        color={textColor}
        letterSpacing="tight"
      >
        CodeSnipe
      </Heading>
    </Flex>
  );
};

export default Logo;
