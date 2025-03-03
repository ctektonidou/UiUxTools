export interface User {
    userId: number;
    email?: string;
    password?: string;
    lastname?: string;
    firstname?: string;
    typeOfUser?: string;
}

export interface UpdateUserRequest {
    password?: string;
    lastname?: string;
    firstname?: string;
}