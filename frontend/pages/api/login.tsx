import { Component, useState } from "react"

type Props = {};

type State = {};

export default function Login(props: Props) {
    const [username, setUsername] = useState("");
    return <div> Page 
        <input type="text" onChange={(e) => setUsername(e.currentTarget.value)} value={username}/>
    </div>
}


// OR

export default class Login2 extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
    }

    render() {
        return <div> Page </div>;
    }
}
