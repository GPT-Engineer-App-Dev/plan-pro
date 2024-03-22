import React, { useState } from "react";
import { ChakraProvider, Box, VStack, Heading, Input, Button, List, ListItem, IconButton, useToast, HStack } from "@chakra-ui/react";
import { FaPlus, FaTrash } from "react-icons/fa";

const Index = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const toast = useToast();

  const handleInputChange = (e) => setInput(e.target.value);

  const handleAddTodo = () => {
    if (input.trim() === "") {
      toast({
        title: "No task entered.",
        description: "Please enter a task to add to the todo list.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    setTodos([...todos, input]);
    setInput("");
  };

  const handleDeleteTodo = (index) => {
    const newTodos = todos.filter((_, todoIndex) => todoIndex !== index);
    setTodos(newTodos);
  };

  return (
    <ChakraProvider>
      <Box p={8}>
        <VStack spacing={8}>
          <Heading>Todo App</Heading>
          <HStack>
            <Input placeholder="Add a new task" value={input} onChange={handleInputChange} />
            <Button leftIcon={<FaPlus />} colorScheme="blue" onClick={handleAddTodo}>
              Add
            </Button>
          </HStack>
          <List spacing={3}>
            {todos.map((todo, index) => (
              <ListItem key={index} display="flex" justifyContent="space-between" alignItems="center">
                {todo}
                <IconButton aria-label={`Delete task ${index + 1}`} icon={<FaTrash />} onClick={() => handleDeleteTodo(index)} colorScheme="red" variant="ghost" />
              </ListItem>
            ))}
          </List>
        </VStack>
      </Box>
    </ChakraProvider>
  );
};

export default Index;
