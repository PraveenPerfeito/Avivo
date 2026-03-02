import { Button, Td, Tr } from "@chakra-ui/react";

const UserRow = ({ user, onDelete }) => {
  const { id, firstName, lastName, company, role, address, email, phone, age } = user;

  return (
    <Tr>
      <Td>{`${firstName} ${lastName}`}</Td>
      <Td>{company?.name ?? "-"}</Td>
      <Td textTransform="capitalize">{role ?? "-"}</Td>
      <Td>{address?.country ?? "-"}</Td>
      <Td>{email ?? "-"}</Td>
      <Td>{phone ?? "-"}</Td>
      <Td>{age ?? "-"}</Td>
      <Td textAlign="right">
        <Button size="sm" colorScheme="red" variant="ghost" onClick={() => onDelete(id)}>
          Delete
        </Button>
      </Td>
    </Tr>
  );
};

export default UserRow;
