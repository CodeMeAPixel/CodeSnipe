import {
  Box,
  Divider,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { ChangeEvent, FC, useCallback } from "react";
import { FiImage, FiMinusCircle, FiDroplet } from "react-icons/fi";
import {
  BACKGROUND_COLOR,
  ICON_BACKGROUND,
  ICON_BACKGROUND_HOVER,
  TEXT_HIGHLIGHT
} from "../../config/colors";
import { GRADIENTS } from "../../constants/gradients";
import usePanelSettings from "../../hooks/usePanelSettings";
import CustomTooltip from "../CustomTooltip";
import ColorDetail from "./ColorDetail";

const ColorPicker: FC = () => {
  const { background, color, setBackground, setColor } = usePanelSettings();

  // colors
  const backgroundColor = useColorModeValue(
    BACKGROUND_COLOR.light,
    BACKGROUND_COLOR.dark
  );
  const iconBackground = useColorModeValue(
    ICON_BACKGROUND.light,
    ICON_BACKGROUND.dark
  );
  const iconBackgroundHover = useColorModeValue(
    ICON_BACKGROUND_HOVER.light,
    ICON_BACKGROUND_HOVER.dark
  );
  const textHighlightColor = useColorModeValue(
    TEXT_HIGHLIGHT.light,
    TEXT_HIGHLIGHT.dark
  );

  const uploadFile = useCallback(() => {
    const fileInput = document.getElementById("bg-upload") as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }, []);

  const addImageBackground = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onloadend = function() {
        if (typeof this.result === 'string') {
          setColor({ name: "Image", value: `url(${this.result})` });
          setBackground(true);
        }
      };

      reader.readAsDataURL(file);
    }
  }, [setColor, setBackground]);

  const applyGradient = useCallback((gradient: typeof GRADIENTS[0]) => {
    setColor(gradient);
    setBackground(true);
  }, [setColor, setBackground]);

  return (
    <Menu closeOnSelect={true}>
      <CustomTooltip label="Select Background">
        <Box>
          <MenuButton
            as={IconButton}
            aria-label="Select background"
            variant="unstyled"
            size="lg"
            w="12"
            h="12"
            rounded="xl"
            bg={iconBackground}
            _hover={{ backgroundColor: iconBackgroundHover }}
            display="flex"
            justifyContent="center"
            alignItems="center"
            transition="all 0.2s"
            icon={background ? (
              <Box
                bgSize="cover !important"
                bgPos="center !important"
                height="6"
                width="6"
                bg={color.value}
                rounded="full"
                transition="all 0.2s"
              />
            ) : (
              <FiDroplet size={18} />
            )}
          />
        </Box>
      </CustomTooltip>

      <MenuList
        rounded="xl"
        p="3"
        bg={backgroundColor}
        boxShadow="lg"
        _hover={{ boxShadow: "lg" }}
        zIndex={1000}
        minW="200px"
        borderColor={iconBackground}
        borderWidth="1px"
      >
        <Input
          type="file"
          accept="image/*"
          id="bg-upload"
          variant="unstyled"
          display="none"
          onChange={addImageBackground}
        />

        {GRADIENTS.map((gradient, index) => (
          <MenuItem
            key={index}
            rounded="lg"
            fontSize="sm"
            textColor={textHighlightColor}
            _hover={{ backgroundColor: iconBackground }}
            onClick={() => applyGradient(gradient)}
            py="2"
            px="3"
          >
            <ColorDetail color={gradient.value} label={gradient.name} />
          </MenuItem>
        ))}

        <Divider my="2" />

        <MenuItem
          key={GRADIENTS.length}
          rounded="lg"
          fontSize="sm"
          textColor={textHighlightColor}
          _hover={{ backgroundColor: iconBackground }}
          onClick={() => setBackground(false)}
          py="2"
          px="3"
        >
          <Box display="flex" flexDir="row" alignItems="center">
            <FiMinusCircle size={16} />
            <Text ml="2">No Background</Text>
          </Box>
        </MenuItem>

        <MenuItem
          key={GRADIENTS.length + 1}
          rounded="lg"
          fontSize="sm"
          textColor={textHighlightColor}
          _hover={{ backgroundColor: iconBackground }}
          onClick={() => uploadFile()}
          py="2"
          px="3"
        >
          <Box display="flex" flexDir="row" alignItems="center">
            <FiImage size={16} />
            <Text ml="2">Image Background</Text>
          </Box>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default ColorPicker;
