import { withIronSessionSsr } from "iron-session/next";
import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { Component } from "react";
import Layout from "../Components/Layout";
import { protectedHandler, sessionOptions } from "../lib/session";
import styles from "../styles/Home.module.css";
import axios from "axios";
import { task } from "@prisma/client";
import { FrontendTask, Task } from "../Components/TaskCard";

type Props = {};

type FrontendProject = {
  id: number;
  name: string;
};

type State = {
  prompt: string;
  activeProject: number /* idx of myProject */;
  myProjects: FrontendProject[];
  tasks: FrontendTask[];
};

export const getServerSideProps = withIronSessionSsr(
  protectedHandler,
  sessionOptions
);

export default class Home extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      prompt: "",
      activeProject: -1,
      myProjects: [],
      tasks: [],
    };
  }

  componentDidMount() {
    this.getProjects();
  }

  getProjects = () => {
    axios
      .get("/api/project")
      .then((res) => {
        if (res.data.project && res.data.project.length > 0) {
          this.setState(
            {
              activeProject: 0,
              myProjects: res.data.project,
            },
            () =>
              this.getTasks(this.state.myProjects[this.state.activeProject].id)
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getTasks = (projectId: number) => {
    axios
      .get(`/api/tasks?projectId=${projectId}`)
      .then((res) => {
        if (res.data.tasks && res.data.tasks.length > 0) {
          let tasks: FrontendTask[] = [];
          res.data.tasks.forEach((t: task) => {
            tasks.push({id: t.id, started: t.creation_date!, dueDate: t.finish_date ?? null, description: t.description!, name: t.name });
          })
          this.setState({tasks});
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  addTask = () => {
    const { prompt, activeProject, myProjects } = this.state;
    axios
      .post("/api/comprehend", { input: prompt, projectId: myProjects[activeProject].id })
      .then((res) => {
        if (res.data.task) {
          this.setState({prompt: ""});
          this.getTasks(myProjects[activeProject].id);
        }
      })
      .catch((err) => {
        this.setState({prompt: ""});
        console.log(err.response.data);
      });
  };

  removeTaskById(id:number) {
    this.setState({tasks: this.state.tasks.filter(function(task) { 
      return task.id !== id
  })}); 
    axios.delete(`/api/task?taskId=${id}`);
  }

  render() {
    const { prompt, myProjects, activeProject, tasks } = this.state;
    return (
      <Layout page="Home">
        <div className={styles.prompt_container}>
          <h1>Welcome to TAZK: Project Managment Made Easy</h1>

          <h4>Project</h4>
          <select className={styles.project_list}>
            {myProjects.map((p) => (
              <option value={p.id} className={styles.project_option}>
                {p.name}
              </option>
            ))}
          </select>
          <Link href="/project">
            <p>Or create a new one</p>
          </Link>

          <h4>New Task</h4>
          <div className={styles.prompt_line}>
            <input
              type="text"
              value={prompt}
              onChange={(e) => this.setState({ prompt: e.currentTarget.value })}
              className={styles.prompt}
            />
            <button
              className={styles.prompt_submit}
              onClick={() => this.addTask()}
            >
              Create Task
            </button>
          </div>
        </div>
        {tasks.length == 0 ? (
          <p>
            No tasks created yet! Get started by typing any task that needs to
            get done.
          </p>
        ) : (
          <div className={styles.task_container}>
            {tasks.map(((t) => <Task key={t.id} remove={() => this.removeTaskById(t.id)} task={t} />))}
          </div>
        )}
      </Layout>
    );
  }
}
