import { useState, useEffect } from "react";
import { Box, Heading, Flex, Button, SimpleGrid, Text, VStack, Input } from "@chakra-ui/react";
import { FiPlus, FiMail } from "react-icons/fi";
import api from "../api/api";

interface Team {
  _id: string;
  name: string;
  description: string;
  admin: { username: string; email: string };
  members: any[];
}

const Teams = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [newTeam, setNewTeam] = useState({ name: "", description: "" });
  const [memberEmail, setMemberEmail] = useState("");

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const res = await api.get("/api/teams/all");
      if (res.data.success) {
        setTeams(res.data.teams);
      }
    } catch (error) {
      console.error("Error fetching teams:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/teams/create", newTeam);
      if (res.data.success) {
        setTeams([res.data.team, ...teams]);
        setShowForm(false);
        setNewTeam({ name: "", description: "" });
      }
    } catch (error) {
      console.error("Error creating team:", error);
    }
  };

  const handleAddMember = async (teamId: string) => {
    try {
      // First search for the user by email
      const userRes = await api.get(`/api/user/search?email=${memberEmail}`);
      
      if (userRes.data.success) {
        const userId = userRes.data.user._id;
        // Then add them to the team
        const addRes = await api.post("/api/teams/add-member", { teamId, userId });
        
        if (addRes.data.success) {
          fetchTeams(); // Refresh
          setMemberEmail("");
          alert("Member added successfully!");
        }
      }
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed to add member");
    }
  };

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading>Teams</Heading>
        <Button 
          bg="purple.500" 
          color="white" 
          _hover={{ bg: "purple.600" }}
          onClick={() => setShowForm(!showForm)}
        >
          <FiPlus style={{ marginRight: '8px' }} /> {showForm ? "Cancel" : "Create Team"}
        </Button>
      </Flex>

      {showForm && (
        <Box bg="whiteAlpha.100" p={6} borderRadius="xl" border="1px solid" borderColor="whiteAlpha.200" mb={8}>
          <form onSubmit={handleCreateTeam}>
            <VStack gap={4} align="stretch">
              <Box>
                <Text mb={2} fontSize="sm">Team Name</Text>
                <Input 
                  value={newTeam.name} 
                  onChange={(e) => setNewTeam({...newTeam, name: e.target.value})}
                  bg="blackAlpha.300"
                  border="none"
                  required
                />
              </Box>
              <Box>
                <Text mb={2} fontSize="sm">Description</Text>
                <Input 
                  value={newTeam.description} 
                  onChange={(e) => setNewTeam({...newTeam, description: e.target.value})}
                  bg="blackAlpha.300"
                  border="none"
                />
              </Box>
              <Button type="submit" colorScheme="purple" w="full">Create Team</Button>
            </VStack>
          </form>
        </Box>
      )}

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
        {teams.map(team => (
          <Box key={team._id} bg="whiteAlpha.100" p={6} borderRadius="xl" border="1px solid" borderColor="whiteAlpha.200" _hover={{ transform: 'translateY(-4px)', transition: 'all 0.2s' }}>
            <VStack align="center" gap={3}>
              <Flex align="center" justify="center" w="64px" h="64px" borderRadius="full" bg="purple.500" fontSize="xl" mb={2}>
                {team.name.charAt(0)}
              </Flex>
              <Heading size="md">{team.name}</Heading>
              <Text color="gray.400" fontSize="sm">Lead: {team.admin?.username || "N/A"}</Text>
              
              <Flex w="full" justify="space-between" align="center" mt={4} pt={4} borderTop="1px solid" borderColor="whiteAlpha.200">
                <Text fontSize="sm" color="gray.300">{team.members?.length || 0} Members</Text>
                <Button size="sm" variant="ghost" color="purple.400" _hover={{ bg: "whiteAlpha.100" }}>
                  <FiMail />
                </Button>
              </Flex>

              <Flex gap={2} w="full" mt={2}>
                <Input 
                  placeholder="Member email" 
                  size="sm" 
                  value={memberEmail} 
                  onChange={(e) => setMemberEmail(e.target.value)}
                  bg="blackAlpha.200"
                  border="none"
                />
                <Button size="sm" colorScheme="purple" onClick={() => handleAddMember(team._id)}>Add</Button>
              </Flex>
            </VStack>
          </Box>
        ))}
      </SimpleGrid>

      {!loading && teams.length === 0 && (
        <Box textAlign="center" py={10} color="gray.500">
          <Text>No teams found. Create one to get started!</Text>
        </Box>
      )}
    </Box>
  );
};

export default Teams;
