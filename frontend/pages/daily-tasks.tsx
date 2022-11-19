import Image from "next/image";
import Link from "next/link";
import { Component } from "react";
import Layout from "../Components/Layout";
import styles from "../styles/DailyTasks.module.css";

type Props = {};

type State = {};

export default class DailyTasks extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Layout page="Tasks">
        <h1 className="title"> Your Daily Tasks</h1>
      </Layout>
    
    );
  }
}