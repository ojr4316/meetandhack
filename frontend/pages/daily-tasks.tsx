import Image from "next/image";
import Link from "next/link";
import { Component } from "react";
import Layout from "../Components/Layout";
import styles from "../styles/Home.module.css";

type Props = {};

type State = {};

export default class DailyTasks extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Layout page="Home">
        <h1>Your Daily Tasks</h1>
      </Layout>
    
    );
  }
}