import { task, user } from "@prisma/client";
import { Component } from "react";
import Layout from "../Components/Layout";
import { FrontendMember, Member } from "../Components/MemberCard";
import { FrontendTask, Task } from "../Components/TaskCard";
import styles from "../styles/DailyTasks.module.css";

type Props = {};

type State = {
  name: string;
  members: FrontendMember[];
  tasks: FrontendTask[];
};

export default class DailyTasks extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      name: "",
      members: [],
      tasks: [],
    };
  }

  componentDidMount() {
    // TODO: Get tasks by project ID
    // TODO: Get members by project ID

    this.setState({
      name: "Your Tasks",
      tasks: [
        { id: 1, name: "Test Task 1" },
        { id: 2, name: "Test Task 2" },
        { id: 3, name: "Test Task 3" },
        { id: 4, name: "Test Task 4" },
      ],
    });
  }

  removeTaskById(id:number) {
    this.setState({tasks: this.state.tasks.filter(function(task) { 
      return task.id !== id
  })}); 
    // TODO: Make API call to actually remove it
  }

  render() {
    const { name, members, tasks } = this.state;
    return (
      <html>
      <Layout page="Project">
        <div className={styles.project_container}>
          <div className={styles.project_header}>
            <h3 className={styles.project_title}> {name} </h3>
          </div>
          <div className={styles.project_content}>
            <div className={styles.left}>
              <div className={styles.task_lists}></div>
              <div className={styles.tasks}>
                {tasks.map((t) => (
                  <Task task={t} remove={() => this.removeTaskById(t.id)} />
                ))}
              </div>
            </div>
            <div className={styles.right}>
              <div className={styles.member_list}>
                {members.map((m) => (
                  <Member id={m.id} name={m.name} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Layout>
      </html>
    );
  }
}
