import { user } from "@prisma/client";
import styles from "../styles/Member.module.css";

type Props = {
    id: number;
    name: string;
}

export type FrontendMember = Props;

export function Member(props: Props) {
    return <div className={styles.member_container}>
        <p>{props.name}</p>
        
        
    </div>
}