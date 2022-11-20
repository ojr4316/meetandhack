import { task, user, user_task } from "@prisma/client";
import axios from "axios";
import { Component } from "react";
import Layout from "../Components/Layout";
import { FrontendMember, Member } from "../Components/MemberCard";
import { FrontendTask, Task } from "../Components/TaskCard";
import styles from "../styles/DailyTasks.module.css";

type Props = {};

type State = {
  name: string;
  tasks: task[];
};

async function getTasks() {
  try {
    const res = await axios.get("/api/user_task");
    let user_tasks: [] = res.data.user_tasks;
    let tasks: task[] = [];
    user_tasks.forEach(async (user_task: user_task) => {
      let id = user_task.task;
      let task = await axios.get("/api/task", { params: { id } });
      if (task) {
        tasks.push(task.data.task);
      }
    });
    return tasks;
  } catch (error) {
    console.log(error);
  }
}

export default class DailyTasks extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      name: "",
      tasks: [],
    };
  }



  componentDidMount() {
    // TODO: Get tasks by project ID
    // TODO: Get members by project ID

    getTasks().then((tasks) => {
      if (tasks) {
        this.setState({
          tasks: tasks
        });
      }
    })


  }

  removeTaskById(id: number) {
    this.setState({
      tasks: this.state.tasks.filter(function (task) {
        return task.id !== id
      })
    });
    // TODO: Make API call to actually remove it
  }

  render() {
    const { name, tasks } = this.state;
    console.log(this.state);
    return (
      <Layout page="Project">
        <div className={styles.project_container}>
          <div className={styles.project_header}>
            <h3 className={styles.project_title}> {name} </h3>
          </div>
          <div className={styles.project_content}>
            <div className={styles.left}>
              <div className={styles.task_lists}></div>
              <div className={styles.tasks}>
                {tasks.map((task, index) => {
                  return (
                    <li key={index}>{task.name}</li>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}
