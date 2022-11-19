import Image from "next/image";
import Link from "next/link";
import { Component } from "react";
import Layout from "../Components/Layout";
import styles from "../styles/Home.module.css";

type Props = {};

type State = {};

export default class Home extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Layout page="Home">
        <h1>Welcome to Project Managment Made Easy</h1>
      </Layout>
    
    );
  }
}
