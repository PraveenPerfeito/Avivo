import {
  Box,
  Button,
  Collapse,
  Flex,
  Heading,
  IconButton,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { AddIcon, RepeatIcon } from "@chakra-ui/icons";
import { useEffect, useMemo, useState } from "react";
import AddUserForm from "../components/AddUserForm";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import UserTable from "../components/UserTable";
import { fetchUsers } from "../services/userService";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);

  const loadUsers = async () => {
    setIsLoading(true);
    setError("");

    try {
      const fetchedUsers = await fetchUsers();
      setUsers(fetchedUsers);
    } catch (fetchError) {
      setError(fetchError.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    if (!normalizedSearch) {
      return users;
    }

    return users.filter((user) => {
      const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
      const companyName = user.company?.name?.toLowerCase() ?? "";
      const role = user.role?.toLowerCase() ?? "";
      const country = user.address?.country?.toLowerCase() ?? "";
      const email = user.email?.toLowerCase() ?? "";
      const phone = user.phone?.toLowerCase() ?? "";
      const age = String(user.age ?? "").toLowerCase();

      return (
        fullName.includes(normalizedSearch) ||
        companyName.includes(normalizedSearch) ||
        role.includes(normalizedSearch) ||
        country.includes(normalizedSearch) ||
        email.includes(normalizedSearch) ||
        phone.includes(normalizedSearch) ||
        age.includes(normalizedSearch)
      );
    });
  }, [searchTerm, users]);

  const handleAddUser = (newUser) => {
    setUsers((prevUsers) => [newUser, ...prevUsers]);
  };

  const handleDeleteUser = (userId) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  };

  return (
    <Box maxW="1100px" mx="auto" px={{ base: 4, md: 6 }} py={{ base: 6, md: 8 }}>
      <Header title="User Dashboard" />

      <Flex
        direction={{ base: "column", md: "row" }}
        gap={3}
        align={{ base: "stretch", md: "center" }}
        justify="space-between"
        mb={5}
      >
        <SearchBar value={searchTerm} onChange={setSearchTerm} />

        <Flex gap={2}>
          <Button
            leftIcon={isLoading ? <Spinner size="sm" /> : <RepeatIcon />}
            onClick={loadUsers}
            isDisabled={isLoading}
            colorScheme="blue"
            variant="outline"
          >
            Refresh
          </Button>
          <IconButton
            aria-label="Open add user form"
            icon={<AddIcon />}
            colorScheme="teal"
            onClick={() => setIsAddFormOpen((prev) => !prev)}
          />
        </Flex>
      </Flex>

      <Collapse in={isAddFormOpen} animateOpacity>
        <AddUserForm onAdd={handleAddUser} />
      </Collapse>

      {error ? (
        <Box borderWidth="1px" borderRadius="md" p={4} bg="red.50" mb={4}>
          <Text color="red.700" fontWeight="medium">
            {error}
          </Text>
        </Box>
      ) : null}

      {isLoading && users.length === 0 ? (
        <Flex align="center" justify="center" py={16} gap={3}>
          <Spinner size="lg" color="blue.500" />
          <Heading as="h3" size="sm" color="gray.600">
            Loading users...
          </Heading>
        </Flex>
      ) : (
        <UserTable users={filteredUsers} onDelete={handleDeleteUser} />
      )}
    </Box>
  );
};

export default Dashboard;
