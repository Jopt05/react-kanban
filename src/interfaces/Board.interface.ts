export interface Board {
    id:        string;
    name:      string;
    user:      User;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: null;
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
