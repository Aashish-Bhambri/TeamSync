import React, { useState, useEffect } from "react";
import { Box, Heading, Flex, Button, SimpleGrid, Text, Badge, Input, chakra } from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";
import api from "../api/api";

interface Task {
  _id: string;
  title: string;
  description: string;
  priority: string;
  completed: boolean;
  dueDate: string;
}

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [newTask, setNewTask] = useState({ title: "", description: "", priority: "medium", dueDate: "" });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await api.get("/api/tasks/gp");
      if (res.data.success) {
        setTasks(res.data.tasks || []);
      }
    } catch (error) {
      console.error("Failed to fetch tasks", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/tasks/gp", newTask);
      if (res.data.success) {
        setTasks([res.data.task, ...tasks]);
        setShowForm(false);
        setNewTask({ title: "", description: "", priority: "medium", dueDate: "" });
      }
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading>Tasks</Heading>
        <Button 
          bg="purple.500" 
          color="white" 
          _hover={{ bg: "purple.600" }}
          onClick={() => setShowForm(!showForm)}
        >
          <FiPlus style={{ marginRight: '8px' }} /> {showForm ? "Cancel" : "New Task"}
        </Button>
      </Flex>

      {showForm && (
        <Box bg="whiteAlpha.100" p={6} borderRadius="xl" border="1px solid" borderColor="whiteAlpha.200" mb={8}>
          <form onSubmit={handleCreateTask}>
            <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
              <Box>
                <Text mb={2} fontSize="sm">Title</Text>
                <Input 
                  value={newTask.title} 
                  onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                  bg="blackAlpha.300"
                  border="none"
                  required
                />
              </Box>
              <Box>
                <Text mb={2} fontSize="sm">Priority</Text>
                <chakra.select 
                  value={newTask.priority} 
                  onChange={(e: any) => setNewTask({...newTask, priority: e.target.value})}
                  bg="blackAlpha.300"
                  border="none"
                  p={2}
                  borderRadius="md"
                  w="full"
                  color="white"
                  outline="none"
                >
                  <option value="low" style={{ background: "#151515" }}>Low</option>
                  <option value="medium" style={{ background: "#151515" }}>Medium</option>
                  <option value="high" style={{ background: "#151515" }}>High</option>
                </chakra.select>
              </Box>
              <Box gridColumn={{ md: "span 2" }}>
                <Text mb={2} fontSize="sm">Description</Text>
                <Input 
                  value={newTask.description} 
                  onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                  bg="blackAlpha.300"
                  border="none"
                />
              </Box>
              <Box>
                <Text mb={2} fontSize="sm">Due Date</Text>
                <Input 
                  type="date"
                  value={newTask.dueDate} 
                  onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                  bg="blackAlpha.300"
                  border="none"
                />
              </Box>
            </SimpleGrid>
            <Button type="submit" colorScheme="purple" mt={6} w="full">Create Task</Button>
          </form>
        </Box>
      )}

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
        {tasks.map(task => (
          <Box key={task._id} bg="whiteAlpha.100" p={5} borderRadius="xl" border="1px solid" borderColor="whiteAlpha.200" _hover={{ transform: 'translateY(-4px)', transition: 'all 0.2s' }}>
            <Flex justify="space-between" align="center" mb={3}>
              <Badge colorScheme={task.priority === 'high' ? 'red' : task.priority === 'medium' ? 'orange' : 'green'} p={1} borderRadius="md">
                {task.priority || "Low"}
              </Badge>
              <Badge colorScheme={task.completed ? 'green' : 'gray'} p={1} borderRadius="md">
                {task.completed ? 'Done' : 'In Progress'}
              </Badge>
            </Flex>
            <Heading size="md" mb={2}>{task.title}</Heading>
            <Text color="gray.400" fontSize="sm" mb={4} lineClamp={2}>
              {task.description || "No description provided."}
            </Text>
            <Text fontSize="xs" color="gray.500">
              Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No date"}
            </Text>
          </Box>
        ))}
      </SimpleGrid>

      {!loading && tasks.length === 0 && (
        <Box textAlign="center" py={10} color="gray.500">
          <Text>No tasks found. Create one to get started!</Text>
        </Box>
      )}
    </Box>
  );
};

export default Tasks;
