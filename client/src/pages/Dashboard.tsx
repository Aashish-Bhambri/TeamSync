import { Box, SimpleGrid, Heading, Flex, Text } from "@chakra-ui/react";
import { FiCheckCircle, FiClock, FiList } from "react-icons/fi";

const Dashboard = () => {
  return (
    <Box>
      <Heading mb={6}>Dashboard Overview</Heading>
      
      <SimpleGrid columns={{ base: 1, md: 3 }} gap={6} mb={8}>
        <Box bg="whiteAlpha.100" p={6} borderRadius="xl" border="1px solid" borderColor="whiteAlpha.200">
          <Flex align="center" mb={4}>
            <Box p={3} bg="purple.500" borderRadius="md" mr={4}>
              <FiList size={24} color="white" />
            </Box>
            <Box>
              <Text color="gray.400" fontSize="sm">Total Tasks</Text>
              <Heading size="lg">24</Heading>
            </Box>
          </Flex>
        </Box>
        
        <Box bg="whiteAlpha.100" p={6} borderRadius="xl" border="1px solid" borderColor="whiteAlpha.200">
          <Flex align="center" mb={4}>
            <Box p={3} bg="green.500" borderRadius="md" mr={4}>
              <FiCheckCircle size={24} color="white" />
            </Box>
            <Box>
              <Text color="gray.400" fontSize="sm">Completed</Text>
              <Heading size="lg">18</Heading>
            </Box>
          </Flex>
        </Box>

        <Box bg="whiteAlpha.100" p={6} borderRadius="xl" border="1px solid" borderColor="whiteAlpha.200">
          <Flex align="center" mb={4}>
            <Box p={3} bg="red.500" borderRadius="md" mr={4}>
              <FiClock size={24} color="white" />
            </Box>
            <Box>
              <Text color="gray.400" fontSize="sm">Overdue</Text>
              <Heading size="lg">2</Heading>
            </Box>
          </Flex>
        </Box>
      </SimpleGrid>

      <Heading size="md" mb={4}>Recent Activity</Heading>
      <Box bg="whiteAlpha.100" p={6} borderRadius="xl" border="1px solid" borderColor="whiteAlpha.200">
        <Text color="gray.400">Activity feed will appear here...</Text>
      </Box>
    </Box>
  );
};

export default Dashboard;
