export class User {

    constructor(
        public id: number,
        public name?: string,
        public skills?: string[],
        public description?: string,
        public imageUrl?: string, 
        public organization?: string) { }
}