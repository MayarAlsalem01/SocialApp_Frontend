import { User } from "./User";

export type Comment ={

    postId:      string;
    commentText: string;
    id:          string;
    createAt:    string;
    updatedAt:   string;
    user:        User;
}