import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { user } from "@prisma/client";
import styles from "../styles/Task.module.css";
import { FrontendMember } from "./MemberCard";

type Props = {
    task: FrontendTask;
    remove: () => void;
}

export type FrontendTask = {
    id: number;
    name: string;
    description?: string;
    assignedTo?: FrontendMember[];
    dueDate?: Date;
};

export function Task(props: Props) {
    return <div className={styles.task_container}>
        <p>{props.task.name}</p>
        <FontAwesomeIcon icon={faTrash} onClick={props.remove} className={styles.remove} />

    </div>  
}