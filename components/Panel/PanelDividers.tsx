import { Box, useColorModeValue } from "@chakra-ui/react";
import { FC } from "react";
import { ICON_BACKGROUND } from "../../config/colors";

const PanelDividers: FC = () => {
  // colors
  const dividerColor = useColorModeValue(
    ICON_BACKGROUND.light,
    ICON_BACKGROUND.dark
  );

  return (
    <Box
      h="6"
      w="1px"
      bg={dividerColor}
      mx="2"
      opacity="0.5"
      transition="all 0.2s"
      _hover={{
        opacity: "1",
        transform: "scaleY(1.2)"
      }}
    />
  );
};

export default PanelDividers;
