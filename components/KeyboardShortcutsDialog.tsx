import {
  Box,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
  Flex,
  Button
} from "@chakra-ui/react";
import { FC, useState } from "react";
import { FiX, FiCommand } from "react-icons/fi";
import { BACKGROUND_COLOR, TEXT_HIGHLIGHT } from "../config/colors";
import CustomButton from "./CustomButton";

const SHORTCUTS = [
  { key: "G", function: "Random Background" },
  { key: "B", function: "Toggle Background" },
  { key: "D", function: "Dark or Light Mode" },
  { key: "N", function: "Toggle Line Number" },
  { key: "F", function: "Random Font" },
  { key: "S / M / L", function: "Toggle Padding Size" },
  { key: "1 / 2 / 3", function: "Toggle Image Size" },
  { key: "Ctrl + Alt + S", function: "Download PNG" },
  { key: "Ctrl + Alt + C", function: "Copy PNG" }
];

const KeyboardShortcutsDialog: FC = () => {
  // colors
  const backgroundColor = useColorModeValue(
    BACKGROUND_COLOR.light,
    BACKGROUND_COLOR.dark
  );
  const textHighlghtColor = useColorModeValue(
    TEXT_HIGHLIGHT.light,
    TEXT_HIGHLIGHT.dark
  );

  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <Button
        leftIcon={<FiCommand />}
        size="sm"
        variant="ghost"
        onClick={() => setOpen(true)}
      >
        Shortcuts
      </Button>

      <Modal isCentered onClose={() => setOpen(false)} isOpen={open}>
        <ModalOverlay />

        <ModalContent
          w={["90%", "sm"]}
          rounded="2xl"
          overflow="hidden"
          bg={backgroundColor}
          shadow="none"
        >
          <ModalHeader>
            <Flex alignItems="center" justifyContent="space-between">
              <Text fontWeight="bold">Keyboard Shortcuts</Text>
              <CustomButton
                buttonProps={{
                  p: "0",
                  onClick: () => setOpen(false),
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <FiX size={16} />
              </CustomButton>
            </Flex>
          </ModalHeader>

          <Divider />

          <ModalBody>
            <Flex justify="space-between">
              <Box>
                {SHORTCUTS.map((shortcut, i) => (
                  <Text my="4" key={i} fontSize="sm">
                    {shortcut.key}
                  </Text>
                ))}
              </Box>
              <Box>
                {SHORTCUTS.map((shortcut, i) => (
                  <Text
                    my="4"
                    key={i}
                    fontSize="sm"
                    textColor={textHighlghtColor}
                  >
                    {shortcut.function}
                  </Text>
                ))}
              </Box>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default KeyboardShortcutsDialog;
