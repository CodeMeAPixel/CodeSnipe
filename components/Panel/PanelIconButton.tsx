import { Box, ButtonProps, Button, useColorModeValue, Center } from "@chakra-ui/react";
import { FC, ReactNode } from "react";
import { ICON_BACKGROUND, ICON_BACKGROUND_HOVER } from "../../config/colors";
import CustomTooltip from "../CustomTooltip";

interface PanelIconButtonProps {
  buttonProps?: ButtonProps;
  label?: string;
  children: ReactNode;
}

const PanelIconButton: FC<PanelIconButtonProps> = ({
  buttonProps = {},
  label = "",
  children
}) => {
  // colors
  const iconBackground = useColorModeValue(
    ICON_BACKGROUND.light,
    ICON_BACKGROUND.dark
  );
  const iconBackgroundHover = useColorModeValue(
    ICON_BACKGROUND_HOVER.light,
    ICON_BACKGROUND_HOVER.dark
  );

  return (
    <CustomTooltip label={label}>
      <Box
        m={buttonProps.m}
        my={buttonProps.my}
        mx={buttonProps.mx}
        mt={buttonProps.mt}
        mr={buttonProps.mr}
        mb={buttonProps.mb}
        ml={buttonProps.ml}
      >
        <Button
          variant="unstyled"
          size={["md", "lg"]}
          w={["10", "12"]}
          h={["10", "12"]}
          p={["2", "3"]}
          rounded="2xl"
          bg={iconBackground}
          _hover={{ backgroundColor: iconBackgroundHover }}
          {...buttonProps}
          m=""
          my=""
          mx=""
          mt=""
          mr=""
          mb=""
          ml=""
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Center>
            {children}
          </Center>
        </Button>
      </Box>
    </CustomTooltip>
  );
};

export default PanelIconButton;
