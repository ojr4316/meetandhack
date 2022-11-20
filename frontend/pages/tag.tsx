import axios from "axios";
import { Component } from "react";

type Props = {};

type State = {
    name: string;
    tags: [];
};

function createTag(name: string) {
    axios({ url: "/api/tag", data: { name }, method: "POST" }).then((res) => {
        console.log(res);
    }).catch((err) => {
        console.log(err);
    });
}

async function getTags() {
    try {
        const res = await axios.get("/api/tag");
        const tags = res.data.tags;
        return tags;
    } catch (error) {
        console.log(error);
    }
}

export default class Tag extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            name: "",
            tags: []
        };
    }

    componentDidMount() {
        // TODO: Get tasks by project ID
        // TODO: Get members by project ID

        getTags().then((tags) => {
            this.setState({
                tags: tags
            });
        })



    }


    render() {
        let { name, tags } = this.state;
        console.log(tags);
        return (
            <div>
                <div className="form-container">
                    <h1>Create Tag</h1>
                    <label htmlFor="first">Name</label>
                    <input type="text" onChange={(e) => this.setState({name: e.currentTarget.value})} value={name} />
                    <button type="submit" onClick={() => createTag(name)}>Submit</button>
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