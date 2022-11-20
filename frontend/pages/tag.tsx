import axios from "axios";
import { Component } from "react";
import Layout from "../Components/Layout"
import styles from "../styles/Tags.module.css";

type Props = {};

type State = {
    name: string;
    tags: [];
};

function createTag(name: string) {
    axios({ url: "/api/tag", data: { name }, method: "POST" }).then((res) => {
        // console.log(res);
    }).catch((err) => {
        console.log(err);
    });
}
async function addTag(name: string) {
    const res = await axios.get(`/api/tag?name=${name}`);
    console.log(res);
    if (res.data.tags != undefined) {
        let foundTagID = res.data.tag.id;
        axios({ url: "/api/user_tag", data: { foundTagID }, method: "POST" }).then((res) => {
            // console.log(res);
        }).catch((err) => {
            console.log(err);
        });
    }
    else{
        createTag(name);
    }
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
            <Layout page="Project">
                <br />
                <br />
                <div className={styles.tagsContainer}>
                    <div className="form-container">
                        <h1>Create Tag</h1>
                        <label htmlFor="first">Name</label>
                        <br/>
                        <input type="text" onChange={(e) => this.setState({ name: e.currentTarget.value })} value={name} className={styles.tag_input} />
                        <br/>
                        <button type="submit" onClick={() => addTag(name)}>Submit</button>
                        <br />
                        <div className="tag-list">
                            <h3>Current Tags:</h3>
                            <ul>
                                {tags.map((tag: any, index) => {
                                    return (
                                        <li key={index}>{tag.name}</li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </Layout>
        )
    }

}