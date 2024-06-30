import { Injectable } from "@angular/core";
import { Observable, from } from "rxjs";
import { User } from "./user.model";

@Injectable({providedIn : 'root'})

export class StaticDataSource {
    private users: User[] = [
        new User(1, "Profile-1", ["React"], "This profile illustrates skills for a UI developer.", "https://mighty.tools/mockmind-api/content/human/5.jpg", "Microsoft"),
        new User(2, "Profile-2", ["Angular"," Java"], "This profile illustrates skills for a UI developer.", "https://mighty.tools/mockmind-api/content/human/4.jpg", "TCS"),
        new User(3, "Profile-3", [], "This profile illustrates skills for a UI developer.", "https://mighty.tools/mockmind-api/content/human/6.jpg", "Google"),
        new User(4, "Profile-4", ["SAP", "ERP"], "This profile illustrates skills for a Product Owner.", "https://mighty.tools/mockmind-api/content/human/3.jpg", "Microsoft"),
        new User(5, "Profile-5", ["Angular", "Java", "REST"], "This profile illustrates skills for a Angular developer.", "https://mighty.tools/mockmind-api/content/human/1.jpg","Infosys"),
        new User(6, "Profile-6", ["Vue", "Node JS","Express JS"], "This profile illustrates skills for a Backend developer.", "https://www.create.ac.uk/wp-content/uploads/2013/08/no_picture.png","Google"),
    ];

    getUsers(): Observable<User[]> {
        return from([this.users]);
    }
}