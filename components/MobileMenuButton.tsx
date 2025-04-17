import { IconButton, useDisclosure } from "@chakra-ui/react";
import { FC } from "react";
import { FiSettings } from "react-icons/fi";
import MobilePanel from "./MobilePanel";

const MobileMenuButton: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  return (
    <>
      <IconButton
        aria-label="Open settings"
        icon={<FiSettings size={20} />}
        position="fixed"
        bottom="4"
        right="4"
        size="lg"
        colorScheme="purple"
        rounded="full"
        shadow="lg"
        zIndex="90"
        display={["flex", "flex", "none"]}
        onClick={onOpen}
      />
      
      <MobilePanel isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default MobileMenuButton;
