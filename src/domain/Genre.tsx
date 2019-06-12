export class Genre {
    constructor(private  _self: string, private _genre: string) {
    }

    get self(): string {
        return this._self;
    }

    get genre(): string {
        return this._genre;
    }
}