import { Box, Fade, ScaleFade, useColorModeValue, useBreakpointValue } from "@chakra-ui/react";
import { FC, useEffect, useState, useRef, useMemo } from "react";
import { BACKGROUND_COLOR } from "../config/colors";
import usePanelSettings from "../hooks/usePanelSettings";
import { useBackground } from "../hooks/useBackground";
import { useWindowResize } from "../hooks/useWindowResize";
import CodeEditor from "./CodeEditor";
import ResizePoints from "./ResizePoints";
import WindowControls from "./WindowControls";

const useCodeWindowLogic = () => {
  const { background, color, padding, rendering, lineNumber, font } = usePanelSettings();
  const bg = useColorModeValue(BACKGROUND_COLOR.light, BACKGROUND_COLOR.dark);
  const hg = useColorModeValue("blackAlpha.50", "whiteAlpha.50");
  const width = useWindowResize();

  const [mounted, setMounted] = useState<boolean>(false);
  const [pointers, setPointers] = useState<boolean>(false);
  const picAreaRef = useRef<HTMLDivElement>(null);

  const minWidth = useBreakpointValue({
    base: "100%",
    md: "600px",
    lg: "800px"
  });

  useBackground(background, color);

  useEffect(() => {
    if (picAreaRef.current) {
      picAreaRef.current.style.padding = `${padding}px`;
    }
  }, [padding, mounted]);

  useEffect(() => {
    const mountedTimeout = setTimeout(() => setMounted(true), 250);
    const pointersTimeout = setTimeout(() => setPointers(true), 500);

    return () => {
      clearTimeout(mountedTimeout);
      clearTimeout(pointersTimeout);
    };
  }, []);

  return {
    bg,
    hg,
    width,
    mounted,
    pointers,
    picAreaRef,
    minWidth,
    rendering
  };
};

const CodeWindow: FC = () => {
  const { bg, hg, width, mounted, pointers, picAreaRef, minWidth, rendering } = useCodeWindowLogic();
  const { padding } = usePanelSettings();

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
            <ResizePoints id="w" cursor="w-resize" left="1" />
            <ResizePoints id="e" cursor="e-resize" right="1" />
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
