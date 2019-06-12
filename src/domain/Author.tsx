export class Author {
    constructor(private _self: string, private _firstName: string, private _lastName: string) {
    }

    get self(): string {
        return this._self;
    }

    get firstName(): string {
        return this._firstName;
    }

    get lastName(): string {
        return this._lastName;
    }
}