import { Button, Flex, Input } from "@chakra-ui/react";
import { useState } from "react";

const initialFormState = {
  firstName: "",
  lastName: "",
  companyName: "",
  role: "",
  country: "",
  email: "",
  phone: "",
  age: "",
};

const AddUserForm = ({ onAdd }) => {
  const [formData, setFormData] = useState(initialFormState);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const user = {
      id: Date.now(),
      firstName: formData.firstName.trim() || "Local",
      lastName: formData.lastName.trim() || "User",
      company: { name: formData.companyName.trim() || "Local Company" },
      role: formData.role.trim() || "guest",
      address: { country: formData.country.trim() || "India" },
      email: formData.email.trim() || "local.user@example.com",
      phone: formData.phone.trim() || "000-000-0000",
      age: Number(formData.age) > 0 ? Number(formData.age) : 0,
    };

    onAdd(user);
    setFormData(initialFormState);
  };

  return (
    <Flex
      as="form"
      onSubmit={handleSubmit}
      borderWidth="1px"
      borderRadius="md"
      bg="white"
      p={3}
      gap={2}
      mb={4}
      wrap="wrap"
    >
      <Input
        name="firstName"
        placeholder="First Name"
        value={formData.firstName}
        onChange={handleChange}
        maxW={{ base: "100%", md: "160px" }}
      />
      <Input
        name="lastName"
        placeholder="Last Name"
        value={formData.lastName}
        onChange={handleChange}
        maxW={{ base: "100%", md: "160px" }}
      />
      <Input
        name="companyName"
        placeholder="Company"
        value={formData.companyName}
        onChange={handleChange}
        maxW={{ base: "100%", md: "180px" }}
      />
      <Input
        name="role"
        placeholder="Role"
        value={formData.role}
        onChange={handleChange}
        maxW={{ base: "100%", md: "120px" }}
      />
      <Input
        name="country"
        placeholder="Country"
        value={formData.country}
        onChange={handleChange}
        maxW={{ base: "100%", md: "140px" }}
      />
      <Input
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        maxW={{ base: "100%", md: "220px" }}
      />
      <Input
        name="phone"
        placeholder="Phone"
        value={formData.phone}
        onChange={handleChange}
        maxW={{ base: "100%", md: "170px" }}
      />
      <Input
        name="age"
        placeholder="Age"
        value={formData.age}
        onChange={handleChange}
        maxW={{ base: "100%", md: "90px" }}
      />
      <Button type="submit" colorScheme="teal">
        Add User
      </Button>
    </Flex>
  );
};

export default AddUserForm;
