import React from "react";

export class User {
    id: number;
    username: string;
    password: string;
    role: string;
    status: string;

    constructor(id: number, username: string, password: string, role: string, status: string) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.role = role;
        this.status = status;
    }
}