import { HStack, Text } from "@chakra-ui/react";
import { MdInsertChart } from "react-icons/md";
import Link from "./Link";
const Header = () => {
  return (
    <HStack w="full" justify="center" mb="48px">
      <Link href="/">
        <Text fontSize="lg" userSelect="none" textDecoration="none">
          <>
            Lily's Simming Tool{" "}
            <MdInsertChart
              style={{ display: "inline", verticalAlign: "text-bottom" }}
              size="1.25rem"
            />
          </>
        </Text>
      </Link>
    </HStack>
  );
};
export default Header;
