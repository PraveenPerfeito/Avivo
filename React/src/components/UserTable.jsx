import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer,
  Text,
} from "@chakra-ui/react";
import UserRow from "./UserRow";

const UserTable = ({ users, onDelete }) => {
  if (users.length === 0) {
    return (
      <Text textAlign="center" py={12} color="gray.500" fontWeight="medium">
        No users found.
      </Text>
    );
  }

  return (
    <TableContainer borderWidth="1px" borderRadius="lg" bg="white">
      <Table variant="simple" size={{ base: "sm", md: "md" }}>
        <Thead>
          <Tr>
            <Th>Full Name</Th>
            <Th>Company Name</Th>
            <Th>Role</Th>
            <Th>Country</Th>
            <Th>Email</Th>
            <Th>Phone</Th>
            <Th>Age</Th>
            <Th textAlign="right">Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map((user) => (
            <UserRow key={user.id} user={user} onDelete={onDelete} />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default UserTable;
