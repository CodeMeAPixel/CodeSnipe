import { 
  Box, 
  Container, 
  ScaleFade, 
  useColorModeValue, 
  Drawer, 
  DrawerBody, 
  DrawerCloseButton, 
  DrawerContent, 
  DrawerHeader, 
  DrawerOverlay, 
  IconButton, 
  useDisclosure,
  Flex,
  Center,
  useBreakpointValue
} from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { FiList, FiMoon, FiSettings } from "react-icons/fi";
import { BACKGROUND_COLOR, ICON_BACKGROUND } from "../../config/colors";
import { FONTSTYLE } from "../../constants/panelSettings";
import { IToggleButton } from "../../types/ToggleButton";
import { theme } from "../../config/theme";
import ColorPicker from "./ColorPicker";
import CustomSelect from "./CustomSelect";
import DownloadDialog from "./DownloadDialog";
import LanguagePicker from "./LanguagePicker";
import PanelDividers from "./PanelDividers";
import ToggleButton from "./ToggleButton";
import usePanelSettings from "../../hooks/usePanelSettings";
import PaddingPicker from "./PaddingPicker";

const Panel: FC = () => {
  const { darkMode, lineNumber, font, setDarkMode, setLineNumber, setFont } =
    usePanelSettings();
  
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  // colors
  const backgroundColor = useColorModeValue(
    BACKGROUND_COLOR.light,
    BACKGROUND_COLOR.dark
  );
  const iconBackground = useColorModeValue(
    ICON_BACKGROUND.light,
    ICON_BACKGROUND.dark
  );

  const [mounted, setMounted] = useState<boolean>(false);

  const toggleOptions: IToggleButton[] = [
    {
      label: "Toggle Dark / Light Mode",
      icon: <FiMoon size={20} />,
      toggleValue: darkMode,
      toggle: () => setDarkMode(!darkMode)
    },
    {
      label: "Toggle Line Number",
      icon: <FiList size={20} />,
      toggleValue: lineNumber,
      toggle: () => setLineNumber(!lineNumber)
    }
  ];

  const panelPadding = useBreakpointValue({ base: "4", md: "6", lg: "8" });
  const panelGap = useBreakpointValue({ base: "3", md: "4", lg: "6" });

  useEffect(() => {
    setTimeout(() => setMounted(true), 500);
    
    // Make sure body overflow is set to auto
    if (document.querySelector("body")) {
      document.querySelector("body").style.overflowY = "auto";
    }
    
    // Create main element if not exists
    if (!document.getElementById("main") && document.getElementById("codesnip")) {
      const mainElement = document.createElement("div");
      mainElement.id = "main";
      mainElement.style.width = "100%";
      mainElement.style.maxWidth = theme.breakpoints.md;
      mainElement.style.margin = "0 auto";
      document.getElementById("codesnip").parentElement.appendChild(mainElement);
    }
  }, []);

  return (
    <ScaleFade in={mounted}>
      {/* Mobile menu button - only visible on small screens */}
      <Box 
        position="fixed" 
        bottom="6" 
        right="6" 
        zIndex="1001" 
        display={["block", "block", "none"]}
      >
        <IconButton
          aria-label="Open settings"
          icon={<FiSettings size={20} />}
          onClick={onOpen}
          colorScheme="blue"
          rounded="full"
          size="lg"
          shadow="lg"
        />
      </Box>

      {/* Mobile drawer */}
      <Drawer isOpen={isOpen} placement="bottom" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent
          borderTopRadius="xl"
          bg={backgroundColor}
        >
          <DrawerCloseButton />
          <DrawerHeader>Settings</DrawerHeader>
          <DrawerBody pb="6">
            <Flex direction="column" gap={panelGap}>
              <Flex justify="center" wrap="wrap" gap={panelGap}>
                <ColorPicker />
                
                {toggleOptions.map(({ label, icon, toggleValue, toggle }) => (
                  <ToggleButton
                    key={label}
                    label={label}
                    toggleValue={toggleValue}
                    icon={icon}
                    toggle={toggle}
                  />
                ))}
              </Flex>
              
              <Flex justify="center" wrap="wrap" gap={panelGap}>
                <PaddingPicker />
                <CustomSelect
                  label="Font Face"
                  value={font}
                  list={FONTSTYLE}
                  changeValue={item => setFont(item)}
                />
                <LanguagePicker />
              </Flex>
              
              <Center mt="2">
                <DownloadDialog />
              </Center>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* Desktop panel - hidden on mobile */}
      <Box
        position="fixed"
        bottom="8"
        left="50%"
        transform="translateX(-50%)"
        zIndex="1000"
        display={["none", "none", "block"]}
        w="full"
        maxW="container.md"
        px="4"
      >
        <Box
          w="full"
          px={panelPadding}
          py={panelPadding}
          borderColor={iconBackground}
          borderStyle="solid"
          borderWidth="thin"
          borderRadius="3xl"
          backgroundColor={backgroundColor}
          boxShadow="lg"
          backdropFilter="blur(10px)"
          transition="all 0.2s"
          _hover={{
            boxShadow: "xl",
            transform: "translateY(-2px)"
          }}
        >
          <Flex 
            alignItems="center" 
            gap={panelGap}
            justify="center"
            flexWrap="wrap"
          >
            <ColorPicker />

            <PanelDividers />

            <Flex alignItems="center" gap={panelGap}>
              {toggleOptions.map(({ label, icon, toggleValue, toggle }) => (
                <ToggleButton
                  key={label}
                  label={label}
                  toggleValue={toggleValue}
                  icon={icon}
                  toggle={toggle}
                />
              ))}
            </Flex>

            <PanelDividers />

            <Flex alignItems="center" gap={panelGap}>
              <PaddingPicker />

              <CustomSelect
                label="Font Face"
                value={font}
                list={FONTSTYLE}
                changeValue={item => setFont(item)}
              />

              <LanguagePicker />
            </Flex>

            <PanelDividers />

            <DownloadDialog />
          </Flex>
        </Box>
      </Box>
    </ScaleFade>
  );
};

export default Panel;
