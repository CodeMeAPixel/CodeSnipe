import { Box, useColorModeValue } from "@chakra-ui/react";
import { FC, ReactNode } from "react";
import NavBar from "./NavBar";
import MobileMenuButton from "./MobileMenuButton";
import { BACKGROUND_COLOR } from "../config/colors";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const bgColor = useColorModeValue("gray.50", "gray.900");
  
  return (
    <Box 
      minH="100vh" 
      bg={bgColor}
      display="flex"
      flexDirection="column"
      position="relative"
    >
      <NavBar />
      
      <Box 
        flex="1"
        display="flex"
        alignItems="center"
        justifyContent="center"
        px={[4, 6, 8]}
        py={[8, 12, 20]}
        position="relative"
        zIndex="1"
      >
        <Box 
          width="100%"
          maxW="container.xl"
          mx="auto"
          position="relative"
        >
          {children}
        </Box>
      </Box>
      
      <MobileMenuButton />
    </Box>
  );
};

export default Layout;
