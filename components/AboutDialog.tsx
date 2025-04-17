import {
  Box,
  Heading,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  useColorModeValue,
  Flex,
  Button,
  Text,
  VStack,
  HStack,
  Icon,
  useBreakpointValue,
  Divider,
  IconButton
} from "@chakra-ui/react";
import { FC, ReactNode, useState } from "react";
import { FiAtSign, FiX, FiInfo, FiGithub, FiTwitter, FiLinkedin } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import { BACKGROUND_COLOR, TEXT_HIGHLIGHT } from "../config/colors";
import { aboutMarkdown } from "../constants/about";
import CustomButton from "./CustomButton";

export interface SocialTags {
  link: string;
  service: string;
  icon: ReactNode;
}

const social: SocialTags[] = [
  {
    link: "https://github.com/codemeapixel",
    service: "GitHub",
    icon: <FiGithub size={18} />
  },
  {
    link: "https://twitter.com/codemeapixel",
    service: "Twitter",
    icon: <FiTwitter size={18} />
  },
  {
    link: "https://linkedin.com/in/codemeapixel",
    service: "LinkedIn",
    icon: <FiLinkedin size={18} />
  },
  {
    link: "https://instagram.com/codemeapixel",
    service: "Instagram",
    icon: <FaInstagram size={18} />
  }
];

interface AboutDialogProps {
  isMobileNav?: boolean;
}

const AboutDialog: FC<AboutDialogProps> = ({ isMobileNav = false }) => {
  const buttonBg = useColorModeValue("transparent", "gray.900");
  const backgroundColor = useColorModeValue(
    BACKGROUND_COLOR.light,
    BACKGROUND_COLOR.dark
  );
  const textColor = useColorModeValue(
    TEXT_HIGHLIGHT.light,
    TEXT_HIGHLIGHT.dark
  );
  const modalSize = useBreakpointValue({ base: "full", md: "2xl" });
  const [open, setOpen] = useState<boolean>(false);

  if (isMobileNav) {
    return (
      <>
        <Button
          onClick={() => setOpen(true)}
          variant="ghost"
          justifyContent="flex-start"
          leftIcon={<FiInfo />}
        >
          About
        </Button>

        <Modal
          isCentered
          onClose={() => setOpen(false)}
          isOpen={open}
          scrollBehavior="outside"
          size={modalSize}
        >
          <ModalOverlay />
          <ModalContent
            rounded={{ base: "none", md: "2xl" }}
            overflow="hidden"
            bg={backgroundColor}
            shadow="none"
          >
            <ModalBody p={{ base: "6", md: "8" }}>
              <VStack spacing={6} align="stretch">
                <Flex justify="space-between" align="center">
                  <Heading size="lg" fontWeight="extrabold">About CodeSnipe</Heading>
                  <IconButton
                    aria-label="Close"
                    icon={<FiX size={20} />}
                    variant="ghost"
                    size="sm"
                    onClick={() => setOpen(false)}
                  />
                </Flex>

                <Box>
                  <ReactMarkdown linkTarget="_blank" className="markdown-theme">
                    {aboutMarkdown}
                  </ReactMarkdown>
                </Box>

                <Divider />

                <VStack spacing={4} align="stretch">
                  <Text fontSize="sm" color={textColor} opacity={0.8}>
                    Connect with me
                  </Text>
                  <HStack spacing={4}>
                    {social.map(site => (
                      <Link
                        key={site.link}
                        isExternal
                        href={site.link}
                        color="blue.400"
                        _hover={{ color: "blue.500" }}
                        transition="color 0.2s"
                      >
                        {site.icon}
                      </Link>
                    ))}
                  </HStack>
                </VStack>
              </VStack>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    );
  }

  return (
    <>
      <Box bg={buttonBg} rounded="full">
        <CustomButton
          buttonProps={{
            p: "0",
            onClick: () => setOpen(true),
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
          label="About"
        >
          <FiAtSign size={16} />
        </CustomButton>
      </Box>

      <Modal
        isCentered
        onClose={() => setOpen(false)}
        isOpen={open}
        scrollBehavior="outside"
        size={modalSize}
      >
        <ModalOverlay />
        <ModalContent
          rounded={{ base: "none", md: "2xl" }}
          overflow="hidden"
          bg={backgroundColor}
          shadow="none"
        >
          <ModalBody p={{ base: "6", md: "8" }}>
            <VStack spacing={6} align="stretch">
              <Flex justify="space-between" align="center">
                <Heading size="lg" fontWeight="extrabold">About CodeSnipe</Heading>
                <IconButton
                  aria-label="Close"
                  icon={<FiX size={20} />}
                  variant="ghost"
                  size="sm"
                  onClick={() => setOpen(false)}
                />
              </Flex>

              <Box>
                <ReactMarkdown linkTarget="_blank" className="markdown-theme">
                  {aboutMarkdown}
                </ReactMarkdown>
              </Box>

              <Divider />

              <VStack spacing={4} align="stretch">
                <Text fontSize="sm" color={textColor} opacity={0.8}>
                  Connect with me
                </Text>
                <HStack spacing={4}>
                  {social.map(site => (
                    <Link
                      key={site.link}
                      isExternal
                      href={site.link}
                      color="blue.400"
                      _hover={{ color: "blue.500" }}
                      transition="color 0.2s"
                    >
                      {site.icon}
                    </Link>
                  ))}
                </HStack>
              </VStack>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AboutDialog;
