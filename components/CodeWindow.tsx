import { Box, Fade, ScaleFade, useColorModeValue, useBreakpointValue } from "@chakra-ui/react";
import { FC, useEffect, useState, useRef } from "react";
import { BACKGROUND_COLOR } from "../config/colors";
import usePanelSettings from "../hooks/usePanelSettings";
import { useBackground } from "../hooks/useBackground";
import { useWindowResize } from "../hooks/useWindowResize";
import CodeEditor from "./CodeEditor";
import ResizePoints from "./ResizePoints";
import WindowControls from "./WindowControls";

const CodeWindow: FC = () => {
  const { background, color, padding, rendering, lineNumber, font } = usePanelSettings();
  const bg = useColorModeValue(BACKGROUND_COLOR.light, BACKGROUND_COLOR.dark);
  const hg = useColorModeValue("blackAlpha.50", "whiteAlpha.50");
  
  const [mounted, setMounted] = useState<boolean>(false);
  const [pointers, setPointers] = useState<boolean>(false);
  const width = useWindowResize();
  const picAreaRef = useRef<HTMLDivElement>(null);

  const minWidth = useBreakpointValue({
    base: "100%",
    md: "600px",
    lg: "800px"
  });

  // Use the background hook
  useBackground(background, color);

  // Apply padding on initial load and whenever it changes
  useEffect(() => {
    if (picAreaRef.current) {
      picAreaRef.current.style.padding = `${padding}px`;
    }
  }, [padding, mounted]);

  useEffect(() => {
    setTimeout(() => setMounted(true), 250);
    setTimeout(() => setPointers(true), 500);
  }, []);

  return (
    <Box 
      id="codesnip"
      maxW="100%"
      width={width}
      mx="auto"
      position="relative"
      minH="400px"
      minW={minWidth}
      transition="all 0.2s"
    >
      <ScaleFade in={mounted}>
        <Fade in={pointers}>
          <Box display={["none", "none", "block"]} zIndex="10">
            <ResizePoints id="w" cursor="w-resize" left="1"></ResizePoints>
            <ResizePoints id="e" cursor="e-resize" right="1"></ResizePoints>
          </Box>
        </Fade>

        <Box
          id="pic-area"
          ref={picAreaRef}
          width="full"
          p={padding}
          backgroundColor={rendering ? "transparent" : hg}
          borderRadius={["md", "lg", "xl"]}
          overflow="hidden"
          transition="all 0.2s"
        >
          <Box
            width="full"
            minHeight="400px"
            borderRadius={["sm", "md"]}
            boxShadow="xl"
            backgroundColor={bg}
            overflow="hidden"
            transition="all 0.2s"
            data-bg="true"
            display="flex"
            flexDirection="column"
          >
            <WindowControls />
            <Box flex="1" overflow="hidden">
              <CodeEditor />
            </Box>
          </Box>
        </Box>
      </ScaleFade>
    </Box>
  );
};

export default CodeWindow;
