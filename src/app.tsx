import { useState } from "react";
import { Box, Button, Container, Heading, Input, Stack, Text, VStack } from "@chakra-ui/react";

export default function App() {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [newUser, setNewUser] = useState({ email: "", name: "", address: "" });
  const [newProduct, setNewProduct] = useState({ name: "", description: "", price: 0 });

  const handleCreateUser = async () => {
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      const data = await response.json();
      setUsers([...users, data]);
      setNewUser({ email: "", name: "", address: "" });
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const handleCreateProduct = async () => {
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });
      const data = await response.json();
      setProducts([...products, data]);
      setNewProduct({ name: "", description: "", price: 0 });
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Heading textAlign="center">Prisma API Dashboard</Heading>
        
        {/* User Section */}
        <Box p={6} borderWidth={1} borderRadius="lg">
          <Heading size="md" mb={4}>Create New User</Heading>
          <Stack spacing={4}>
            <Input
              placeholder="Email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            />
            <Input
              placeholder="Name"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />
            <Input
              placeholder="Address"
              value={newUser.address}
              onChange={(e) => setNewUser({ ...newUser, address: e.target.value })}
            />
            <Button colorScheme="blue" onClick={handleCreateUser}>
              Create User
            </Button>
          </Stack>
        </Box>

        {/* Product Section */}
        <Box p={6} borderWidth={1} borderRadius="lg">
          <Heading size="md" mb={4}>Create New Product</Heading>
          <Stack spacing={4}>
            <Input
              placeholder="Product Name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            />
            <Input
              placeholder="Description"
              value={newProduct.description}
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            />
            <Input
              type="number"
              placeholder="Price"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
            />
            <Button colorScheme="blue" onClick={handleCreateProduct}>
              Create Product
            </Button>
          </Stack>
        </Box>

        {/* Display Lists */}
        <Box p={6} borderWidth={1} borderRadius="lg">
          <Heading size="md" mb={4}>Users</Heading>
          <Stack spacing={2}>
            {users.map((user) => (
              <Text key={user.id}>
                {user.name} ({user.email}) - {user.address}
              </Text>
            ))}
          </Stack>
        </Box>

        <Box p={6} borderWidth={1} borderRadius="lg">
          <Heading size="md" mb={4}>Products</Heading>
          <Stack spacing={2}>
            {products.map((product) => (
              <Text key={product.id}>
                {product.name} - ${product.price} - {product.description}
              </Text>
            ))}
          </Stack>
        </Box>
      </VStack>
    </Container>
  );
} 