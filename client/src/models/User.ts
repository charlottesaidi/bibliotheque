import {UserInterface} from '@models/interface/user'

export class User implements UserInterface {
    [key: string]: any

    id: number
    email: string
    private _username: string | undefined
    password: string
    roles: string[]

    constructor(id: number, email: string, password: string, roles: string[]) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.roles = roles;
    }
    get username(): string {
        return this.email;
    }
}