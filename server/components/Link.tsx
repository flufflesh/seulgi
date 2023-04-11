import { Box, Link as ChakraLink } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import NextLink from "next/link";

type LinkProps = {
  href: string;
  isExternal?: boolean;
  [x: string]: any;
};

const Link = (props: PropsWithChildren<LinkProps>) => {
  const { children, href } = props;
  return (
    <NextLink href={href} passHref>
      <ChakraLink style={{ textDecoration: "none" }} {...props}>
        {children}
      </ChakraLink>
    </NextLink>
  );
};

export default Link;
