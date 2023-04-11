import { Box, HStack, Text } from "@chakra-ui/react";
import React, { ReactElement } from "react";
import Link from "../Link";

export interface SimTypeProps {
  name: string;
  url: string;
  icon: ReactElement;
}

export const SimType = ({ name, url, icon }: SimTypeProps) => {
  return (
    <Link href={url} w="full">
      <HStack
        border="1px solid"
        borderColor="gray.400"
        px="5"
        py="3"
        w="full"
        borderRadius="xl"
        justify="space-between"
      >
        <Text fontSize="xl" display="inline">
          {name}{" "}
        </Text>
        {icon}
      </HStack>
    </Link>
  );
};
