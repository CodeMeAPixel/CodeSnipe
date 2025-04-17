import { Box } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useEffect } from "react";
import CodeWindow from "../components/CodeWindow";
import DesktopPanel from "../components/Panel/DesktopPanel";
import NavBar from "../components/NavBar";

const Home: NextPage = () => {
  useEffect(() => {
    if (document) {
      const main = document.createElement("div");
      main.id = "main";
      document.getElementById("codesnip").parentElement.appendChild(main);
    }
  }, []);

  return (
    <Box id="container" position="relative">
      <Box id="editorContainer">
        <CodeWindow />
      </Box>
      <DesktopPanel />
    </Box>
  );
};

export default Home;
