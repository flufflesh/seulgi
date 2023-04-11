import { Box, Container, Text, VStack } from "@chakra-ui/react";
import { MdFilterDrama } from "react-icons/md";
import { Page } from "../page";
import { SimType } from "../SimType/SimType";

const HomeView = () => {
  return (
    <Page>
      <VStack align="start" w="full">
        <SimType
          name="Simple Sim"
          url="/simple"
          icon={
            <MdFilterDrama
              style={{ display: "inline", verticalAlign: "text-bottom" }}
            />
          }
        />
        <SimType
          name="Test"
          url="/simple"
          icon={
            <MdFilterDrama
              style={{ display: "inline", verticalAlign: "text-bottom" }}
            />
          }
        />
      </VStack>
    </Page>
  );
};

export default HomeView;
