import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <Box minH="100vh" bg="#151515" color="gray.200" fontFamily="sans-serif">
      <NavBar />
      <Flex>
        <Sidebar />
        <Box flex="1" p={{ base: 4, lg: 8 }} overflowY="auto" h="calc(100vh - 64px)">
          <Outlet />
        </Box>
      </Flex>
    </Box>
  );
};

export default Layout;
