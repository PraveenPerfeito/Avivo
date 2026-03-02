import { Input } from "@chakra-ui/react";

const SearchBar = ({ value, onChange }) => {
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <Input
      placeholder="Search by name, company, role, country, email, phone, or age"
      value={value}
      onChange={handleChange}
      maxW={{ base: "100%", md: "420px" }}
      bg="white"
    />
  );
};

export default SearchBar;
