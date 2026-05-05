import React, { useState, useEffect } from "react";
import { Box, Heading, Flex, Button, SimpleGrid, Text, Input, VStack, chakra } from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";
import axios from "axios";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [newProject, setNewProject] = useState({ name: "", description: "", status: "Planning", progress: 0 });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:3000/api/projects/all", {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success) {
        setProjects(res.data.projects);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("http://localhost:3000/api/projects/create", newProject, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success) {
        setProjects([res.data.project, ...projects]);
        setShowForm(false);
        setNewProject({ name: "", description: "", status: "Planning", progress: 0 });
      }
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  const dummyProjects = [
    { id: 1, name: "Website Redesign", status: "In Progress", progress: 65, members: 4 },
    { id: 2, name: "Mobile App MVP", status: "Planning", progress: 15, members: 3 },
    { id: 3, name: "Marketing Campaign", status: "Completed", progress: 100, members: 5 },
    { id: 4, name: "Database Migration", status: "In Progress", progress: 40, members: 2 },
  ];

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading>Projects</Heading>
        <Button 
          bg="purple.500" 
          color="white" 
          _hover={{ bg: "purple.600" }}
          onClick={() => setShowForm(!showForm)}
        >
          <FiPlus style={{ marginRight: '8px' }} /> {showForm ? "Cancel" : "New Project"}
        </Button>
      </Flex>

      {showForm && (
        <Box bg="whiteAlpha.100" p={6} borderRadius="xl" border="1px solid" borderColor="whiteAlpha.200" mb={8}>
          <form onSubmit={handleCreateProject}>
            <VStack gap={4} align="stretch">
              <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
                <Box>
                  <Text mb={2} fontSize="sm">Project Name</Text>
                  <Input 
                    value={newProject.name} 
                    onChange={(e) => setNewProject({...newProject, name: e.target.value})}
                    bg="blackAlpha.300"
                    border="none"
                    required
                  />
                </Box>
                <Box>
                  <Text mb={2} fontSize="sm">Status</Text>
                  <chakra.select 
                    value={newProject.status} 
                    onChange={(e: any) => setNewProject({...newProject, status: e.target.value})}
                    bg="blackAlpha.300"
                    border="none"
                    p={2}
                    borderRadius="md"
                    w="full"
                    color="white"
                    outline="none"
                  >
                    <option value="Planning" style={{ background: "#151515" }}>Planning</option>
                    <option value="In Progress" style={{ background: "#151515" }}>In Progress</option>
                    <option value="Completed" style={{ background: "#151515" }}>Completed</option>
                  </chakra.select>
                </Box>
              </SimpleGrid>
              <Box>
                <Text mb={2} fontSize="sm">Description</Text>
                <Input 
                  value={newProject.description} 
                  onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                  bg="blackAlpha.300"
                  border="none"
                />
              </Box>
              <Button type="submit" colorScheme="purple" w="full">Create Project</Button>
            </VStack>
          </form>
        </Box>
      )}

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
        {projects.map(project => (
          <Box key={project._id} bg="whiteAlpha.100" p={5} borderRadius="xl" border="1px solid" borderColor="whiteAlpha.200" _hover={{ transform: 'translateY(-4px)', transition: 'all 0.2s' }}>
            <Flex justify="space-between" align="center" mb={2}>
              <Text fontSize="sm" color={project.status === "Completed" ? "green.400" : "purple.400"}>{project.status}</Text>
            </Flex>
            <Heading size="md" mb={4}>{project.name}</Heading>
            
            <Box mb={4}>
              <Flex justify="space-between" mb={1}>
                <Text fontSize="sm" color="gray.400">Progress</Text>
                <Text fontSize="sm" color="gray.400">{project.progress}%</Text>
              </Flex>
              <Box w="full" h="8px" bg="whiteAlpha.200" borderRadius="md" overflow="hidden">
                <Box h="full" bg={project.progress === 100 ? "green.500" : "purple.500"} w={`${project.progress}%`} />
              </Box>
            </Box>

            <Flex justify="space-between" align="center">
              <Text fontSize="sm" color="gray.400">{project.members?.length || 0} Members</Text>
              <Flex gap={1}>
                <Flex align="center" justify="center" w="24px" h="24px" borderRadius="full" bg="blue.500" fontSize="xs">A</Flex>
                <Flex align="center" justify="center" w="24px" h="24px" borderRadius="full" bg="red.500" fontSize="xs">B</Flex>
              </Flex>
            </Flex>
          </Box>
        ))}
      </SimpleGrid>

      {!loading && projects.length === 0 && (
        <Box textAlign="center" py={10} color="gray.500">
          <Text>No projects found. Create one to get started!</Text>
        </Box>
      )}
    </Box>
  );
};

export default Projects;
