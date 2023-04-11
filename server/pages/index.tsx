import { useColorMode } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import HomeView from "../components/views/HomeView";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div style={{ height: "100vh" }}>
      <HomeView />
    </div>
  );
};

export default Home;
