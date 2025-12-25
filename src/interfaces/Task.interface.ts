export interface Task {
    id:          string;
    title:       string;
    description: string;
    status:      string;
    user:        User;
    createdAt:   Date;
    updatedAt:   Date;
    deletedAt:   null;
}

export interface User {
    id:        string;
    name:      string;
    email:     string;
    password:  string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: null;
}
