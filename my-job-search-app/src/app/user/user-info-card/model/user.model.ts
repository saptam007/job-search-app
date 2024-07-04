import { Skill } from "./skills.model";

export class User {

    constructor(
        public id: number,
        public name: string,
        public skills: Skill[],
        public description?: string,
        public imageUrl?: string, 
        public organization?: string) { }
}