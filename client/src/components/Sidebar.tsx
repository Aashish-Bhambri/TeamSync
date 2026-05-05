import { Box, VStack, Link as ChakraLink, Icon, Text, Flex } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import { FiHome, FiFolder, FiUsers, FiCheckSquare } from "react-icons/fi";

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", icon: FiHome, path: "/" },
    { name: "Projects", icon: FiFolder, path: "/projects" },
    { name: "Teams", icon: FiUsers, path: "/teams" },
    { name: "Tasks", icon: FiCheckSquare, path: "/tasks" },
  ];

  return (
    <Box w="250px" h="calc(100vh - 64px)" bg="#151515" borderRight="1px solid" borderColor="whiteAlpha.200" p={4} display={{ base: "none", lg: "block" }}>
      <VStack align="stretch" gap={2}>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <ChakraLink
              asChild
              key={item.name}
              _hover={{ textDecoration: "none" }}
            >
              <Link to={item.path}>
                <Flex
                  align="center"
                  p={3}
                  borderRadius="md"
                  bg={isActive ? "whiteAlpha.200" : "transparent"}
                  color={isActive ? "white" : "gray.400"}
                  _hover={{ bg: "whiteAlpha.100", color: "white" }}
                  cursor="pointer"
                  transition="all 0.2s"
                >
                  <Icon as={item.icon} mr={3} fontSize="lg" />
                  <Text fontSize="md" fontWeight={isActive ? "bold" : "medium"}>{item.name}</Text>
                </Flex>
              </Link>
            </ChakraLink>
          );
        })}
      </VStack>
    </Box>
  );
};

export default Sidebar;
