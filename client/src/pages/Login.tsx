import React, { useState } from "react";
import { Box, Button, Flex, Heading, Input, Text, Link as ChakraLink, VStack } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await api.post("/api/user/login", formData);
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        navigate("/");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex minH="100vh" align="center" justify="center" bg="#151515" color="white">
      <Box w="full" maxW="md" p={8} bg="whiteAlpha.100" borderRadius="xl" border="1px solid" borderColor="whiteAlpha.200" boxShadow="lg">
        <Heading size="lg" mb={6} textAlign="center">
          Welcome Back
        </Heading>
        {error && (
          <Box mb={4} p={3} bg="red.500" color="white" borderRadius="md" fontSize="sm">
            {error}
          </Box>
        )}
        <form onSubmit={handleSubmit}>
          <VStack gap={4}>
            <Box w="full">
              <Text mb={2} fontSize="sm" color="gray.300">Email</Text>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                bg="blackAlpha.300"
                border="1px solid"
                borderColor="whiteAlpha.200"
                _focus={{ borderColor: "purple.500" }}
                required
              />
            </Box>
            <Box w="full">
              <Text mb={2} fontSize="sm" color="gray.300">Password</Text>
              <Input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                bg="blackAlpha.300"
                border="1px solid"
                borderColor="whiteAlpha.200"
                _focus={{ borderColor: "purple.500" }}
                required
              />
            </Box>
            <Button
              type="submit"
              w="full"
              colorScheme="purple"
              bg="purple.500"
              _hover={{ bg: "purple.600" }}
              loading={loading}
              mt={4}
            >
              Sign In
            </Button>
          </VStack>
        </form>
        <Text mt={6} textAlign="center" fontSize="sm" color="gray.400">
          Don't have an account?{" "}
          <ChakraLink asChild color="purple.400" _hover={{ color: "purple.300" }}>
            <Link to="/signup">Sign up</Link>
          </ChakraLink>
        </Text>
      </Box>
    </Flex>
  );
};

export default Login;
