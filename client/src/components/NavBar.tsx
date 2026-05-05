import { Box, Flex, Heading, Input, IconButton } from "@chakra-ui/react";
import { FiSearch, FiUser } from "react-icons/fi";

const NavBar = () => {
  return (
    <Flex
      as="header"
      position="sticky"
      top="0"
      zIndex="10"
      bg="#151515"
      borderBottom="1px solid"
      borderColor="whiteAlpha.200"
      px={4}
      py={3}
      alignItems="center"
      justifyContent="space-between"
    >
      <Heading size="md" color="white" cursor="pointer">
        Team Sync
      </Heading>
      
      <Box maxW="500px" w="full" mx={4} position="relative">
        <Box position="absolute" left="3" top="50%" transform="translateY(-50%)" color="gray.300">
          <FiSearch />
        </Box>
        <Input
          type="text"
          placeholder="Search tasks..."
          borderRadius="20px"
          bg="whiteAlpha.100"
          border="none"
          color="white"
          pl="10"
          _focus={{ bg: "whiteAlpha.200", outline: "none" }}
        />
      </Box>

      <IconButton
        aria-label="User Profile"
        borderRadius="full"
        bg="whiteAlpha.200"
        color="white"
        _hover={{ bg: "whiteAlpha.300" }}
      >
        <FiUser />
      </IconButton>
    </Flex>
  );
};

export default NavBar;

