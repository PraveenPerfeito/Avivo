import { Heading } from "@chakra-ui/react";

const Header = ({ title }) => {
  return (
    <Heading as="h1" size="lg" mb={6}>
      {title}
    </Heading>
  );
};

export default Header;
