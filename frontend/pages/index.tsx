import Image from "next/image";
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
        <p>Project Management Application</p>
      </Layout>
    );
  }
}
