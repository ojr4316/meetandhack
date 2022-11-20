import axios from "axios";
import { Component } from "react";

type Props = {};

type State = {
    name: string;
    email: string;
    username: string;
    is_manager: boolean;
    tags: [];
};

async function getAccount() {
    try {
        const res = await axios.get('/api/account');
        const account = res.data.user;
        return account;
    } catch (error) {
        console.log(error);
    }
}

async function getTags() {
    try {
        const res = await axios.get("/api/user_tag");
        console.log("res: " + res.data);
        const tags = res.data;
        console.log("in getTags: " + tags);
        return tags;
    } catch (error) {
        console.log(error);
    }
}

export default class Account extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            name: "",
            email: "",
            username: "",
            is_manager: false,
            tags: []
        };
    }

    componentDidMount() {
        // TODO: Get tasks by project ID
        // TODO: Get members by project ID

        getAccount().then((user) => {
            this.setState({
                name: user.name,
                email: user.email,
                username: user.username,
                is_manager: user.is_manager
            });
        })

        getTags().then((tags) => {
            console.log("tags: " + tags);
            this.setState({
                tags: tags
            });
        })

    }


    render() {
        let { name, email, username, is_manager, tags } = this.state;
        console.log(tags);
        return (
            <div>
                <div className="form-container">
                    <h1>Your Account</h1>
                    <label htmlFor="first">Name</label>
                    <input type="text" onChange={(e) => this.setState({ name: e.currentTarget.value })} value={name} />
                    <label htmlFor="second">email</label>
                    <input type="text" onChange={(e) => this.setState({ email: e.currentTarget.value })} value={email} />
                    <label htmlFor="third">username</label>
                    <input type="text" onChange={(e) => this.setState({ username: e.currentTarget.value })} value={username} />

                    {/* <button type="submit" onClick={() => createTag(name)}>Submit</button> */}
                </div>
                <div className="tag-list">
                    <ul>
                        {tags.map((tag, index) => {
                            return (
                                <li key={index}>{tag.name}</li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        )
    }

}