import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { user } from "@prisma/client";
import moment from "moment";
import styles from "../styles/Task.module.css";
import { FrontendMember } from "./MemberCard";

type Props = {
  task: FrontendTask;
  remove: () => void;
};

export type FrontendTask = {
  id: number;
  name: string;
  description?: string;
  assignedTo?: FrontendMember[];
  dueDate?: Date | null;
  started: Date;
};

export function Task(props: Props) {
  return (
    <div className={styles.task_container}>
      <div>
        <p>{props.task.name}</p>
        <FontAwesomeIcon
          icon={faTrash}
          onClick={props.remove}
          className={styles.remove}
        />
      </div>

      <div>
        <p>{props.task.description}</p>
        <p>Started {moment(props.task.started).format("MMM DD YYYY")}</p> 
        {props.task.dueDate ? <p>Due {moment(props.task.dueDate).fromNow()}</p> : <div/>}
      </div>
    </div>
  );
}
