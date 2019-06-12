export class Review {
    constructor(private  _self: string, private _review: string) {
    }

    get self(): string {
        return this._self;
    }

    get review(): string {
        return this._review;
    }
}