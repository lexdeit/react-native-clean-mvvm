export interface User {
    name: string;
    age: number;
}

export class UserImpl implements User {
    constructor(public name: string, public age: number) { }
}