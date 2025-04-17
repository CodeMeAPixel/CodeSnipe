import { 
  Box, 
  Flex, 
  Container, 
  useColorModeValue, 
  HStack, 
  Button, 
  IconButton,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack,
  Divider,
  Tooltip
} from "@chakra-ui/react";
import { FC } from "react";
import { FiMenu, FiGithub } from "react-icons/fi";
import AboutDialog from "./AboutDialog";
import KeyboardShortcutsDialog from "./KeyboardShortcutsDialog";
import Logo from "./Logo";

const NavBar: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bgColor = useColorModeValue("rgba(255, 255, 255, 0.95)", "rgba(17, 17, 17, 0.95)");
  const borderColor = useColorModeValue("rgba(0, 0, 0, 0.1)", "rgba(255, 255, 255, 0.1)");
  const buttonHoverBg = useColorModeValue("rgba(0, 0, 0, 0.05)", "rgba(255, 255, 255, 0.05)");
  const buttonActiveBg = useColorModeValue("rgba(0, 0, 0, 0.1)", "rgba(255, 255, 255, 0.1)");
  const iconColor = useColorModeValue("rgba(0, 0, 0, 0.8)", "rgba(255, 255, 255, 0.8)");
  
  return (
    <Box 
      as="nav" 
      position="sticky" 
      top="0" 
      zIndex="100"
      bg={bgColor}
      backdropFilter="blur(10px)"
      borderBottom={`1px solid ${borderColor}`}
      py={3}
    >
      <Container maxW="container.xl">
        <Flex justify="space-between" align="center">
          <Logo />
          
          {/* Mobile menu button */}
          <HStack spacing={2} display={["flex", "flex", "none"]}>
            <IconButton
              aria-label="Open menu"
              fontSize="20px"
              variant="ghost"
              icon={<FiMenu />}
              onClick={onOpen}
              color={iconColor}
              _hover={{ bg: buttonHoverBg }}
              _active={{ bg: buttonActiveBg }}
            />
          </HStack>
          
          {/* Desktop navigation */}
          <HStack spacing={3} display={["none", "none", "flex"]}>
            <KeyboardShortcutsDialog />
            <Button 
              as="a"
              size="sm"
              variant="ghost"
              leftIcon={<FiGithub />}
              href="https://github.com/codemeapixel/codesnipe/"
              target="_blank"
              rel="noopener noreferrer"
              color={iconColor}
              _hover={{ bg: buttonHoverBg }}
              _active={{ bg: buttonActiveBg }}
            >
              GitHub
            </Button>
            <AboutDialog />
          </HStack>
        </Flex>
      </Container>

      {/* Mobile menu drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="xs">
        <DrawerOverlay />
        <DrawerContent bg={bgColor}>
          <DrawerCloseButton color={iconColor} />
          <DrawerHeader color={iconColor}>Menu</DrawerHeader>
          <DrawerBody>
            <VStack spacing={4} align="stretch" mt={4}>
              <KeyboardShortcutsDialog />
              <Divider borderColor={borderColor} />
              <Button 
                as="a"
                variant="ghost"
                justifyContent="flex-start"
                leftIcon={<FiGithub />}
                href="https://github.com/codemeapixel/codesnipe/"
                target="_blank"
                rel="noopener noreferrer"
                color={iconColor}
                _hover={{ bg: buttonHoverBg }}
                _active={{ bg: buttonActiveBg }}
              >
                GitHub
              </Button>
              <Divider borderColor={borderColor} />
              <AboutDialog isMobileNav={true} />
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default NavBar;
