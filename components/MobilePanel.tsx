import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  VStack,
  HStack,
  Divider,
  Box,
  useColorModeValue,
  Flex
} from "@chakra-ui/react";
import { FC } from "react";
import { FiList, FiMoon } from "react-icons/fi";
import { BACKGROUND_COLOR } from "../config/colors";
import ColorPicker from "./Panel/ColorPicker";
import ToggleButton from "./Panel/ToggleButton";
import PaddingPicker from "./Panel/PaddingPicker";
import CustomSelect from "./Panel/CustomSelect";
import LanguagePicker from "./Panel/LanguagePicker";
import DownloadDialog from "./Panel/DownloadDialog";
import usePanelSettings from "../hooks/usePanelSettings";
import { FONTSTYLE } from "../constants/panelSettings";

interface MobilePanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobilePanel: FC<MobilePanelProps> = ({ isOpen, onClose }) => {
  const { darkMode, lineNumber, font, setDarkMode, setLineNumber, setFont } = usePanelSettings();
  const backgroundColor = useColorModeValue(BACKGROUND_COLOR.light, BACKGROUND_COLOR.dark);
  
  const toggleOptions = [
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
  
  return (
    <Drawer isOpen={isOpen} placement="bottom" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent borderTopRadius="2xl" bg={backgroundColor}>
        <DrawerCloseButton />
        <DrawerHeader>Editor Settings</DrawerHeader>
        <DrawerBody pb="6">
          <VStack spacing={6} align="stretch">
            <Flex justify="center" wrap="wrap" gap="4">
              <ColorPicker />
              {toggleOptions.map((option) => (
                <ToggleButton
                  key={option.label}
                  label={option.label}
                  icon={option.icon}
                  toggleValue={option.toggleValue}
                  toggle={option.toggle}
                />
              ))}
            </Flex>
            
            <Divider />
            
            <Flex justify="center" wrap="wrap" gap="4">
              <PaddingPicker />
              <CustomSelect
                label="Font Face"
                value={font}
                list={FONTSTYLE}
                changeValue={(item) => setFont(item)}
              />
              <LanguagePicker />
            </Flex>
            
            <Divider />
            
            <Box display="flex" justifyContent="center">
              <DownloadDialog />
            </Box>
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default MobilePanel;
