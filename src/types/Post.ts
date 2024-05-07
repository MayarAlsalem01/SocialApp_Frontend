import { User } from "./User";

export type Post= {
    id:      string;
    title:   string;
    content: string;
    user:    User;
    commentsNumber: number;
    createAt:string;
    postImage:string
}
