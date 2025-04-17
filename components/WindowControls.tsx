import { Box, Input, Flex, useColorModeValue } from "@chakra-ui/react";
import { FC } from "react";

const colors: string[] = ["red.500", "yellow.500", "green.500"];

const WindowControls: FC = () => {
  const textColor = useColorModeValue("gray.600", "gray.400");
  const hoverColor = useColorModeValue("gray.700", "gray.300");

  return (
    <Flex
      pos="relative"
      alignItems="center"
      justifyContent="center"
      py="3.5"
      px="5"
      borderBottom="1px"
      borderColor={useColorModeValue("gray.200", "gray.700")}
    >
      <Box pos="absolute" left="5" display="flex" alignItems="center" gap="2.5">
        {colors.map(color => (
          <Box
            key={color}
            borderRadius="full"
            height="3"
            width="3"
            backgroundColor={color}
            _hover={{ transform: "scale(1.1)" }}
            transition="transform 0.2s"
          />
        ))}
      </Box>
      <Input
        variant="unstyled"
        size="xs"
        w="max-content"
        textAlign="center"
        defaultValue="example.js"
        fontFamily="mono"
        color={textColor}
        _hover={{ color: hoverColor }}
        _focus={{ color: hoverColor }}
        transition="color 0.2s"
        px="2"
      />
    </Flex>
  );
};

export default WindowControls;
