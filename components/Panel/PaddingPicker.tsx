import { Box, Button, Text, useColorModeValue } from "@chakra-ui/react";
import { FC, useCallback } from "react";
import { ICON_BACKGROUND, TEXT_HIGHLIGHT } from "../../config/colors";
import { PADDING } from "../../constants/panelSettings";
import usePanelSettings from "../../hooks/usePanelSettings";

const paddingMapping = { 16: "S", 24: "M", 32: "L" };

const PaddingPicker: FC = () => {
  const { padding, setPadding } = usePanelSettings();

  // colors
  const iconBackground = useColorModeValue(
    ICON_BACKGROUND.light,
    ICON_BACKGROUND.dark
  );
  const textHighlightColor = useColorModeValue(
    TEXT_HIGHLIGHT.light,
    TEXT_HIGHLIGHT.dark
  );

  const handlePaddingChange = useCallback((val: typeof PADDING[0]) => {
    setPadding(val);
    
    // Apply padding directly to ensure it takes effect immediately
    setTimeout(() => {
      const picArea = document.getElementById('pic-area');
      if (picArea) {
        picArea.style.padding = `${val}px`;
      }
    }, 0);
  }, [setPadding]);

  return (
    <Box display="flex" flexDir="column" alignItems="center">
      <Text mb="2" fontSize="xs" textColor={textHighlightColor}>
        Padding
      </Text>

      <Box
        display="flex"
        flexDir="row"
        alignItems="center"
        gridGap="0.5"
        rounded="full"
      >
        {PADDING.map((val, index) => (
          <Button
            size="xs"
            rounded="full"
            as={Button}
            px="3"
            py="1"
            fontWeight="medium"
            bg={val === padding ? iconBackground : "transparent"}
            _hover={{ backgroundColor: iconBackground }}
            _active={{ backgroundColor: iconBackground }}
            key={index}
            onClick={() => handlePaddingChange(val)}
          >
            {paddingMapping[val]}
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default PaddingPicker;
