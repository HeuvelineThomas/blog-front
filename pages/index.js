import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Navbar } from "../components/Navbar";
import { postList } from "../pages/post/postList";

export default function Home() {
  return <postList />;
}
