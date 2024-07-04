import { Injectable } from '@angular/core';
import { User } from './model/user.model';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Skill } from './model/skills.model';

@Injectable({
  providedIn: 'root'
})
export class UserInfoCardDataService {
  private dataUrl = 'assets/user.json';
  private users: User[] = [];

  constructor(private http : HttpClient) {
      this.loadUsers().subscribe(data => this.users = data);
  }

  private loadUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.dataUrl);
  }

  public getUsers(): Observable<User[]>{
    return this.loadUsers();
  }

  public getSkills(id:number) : Observable<Skill[]| undefined>{
    const user = this.users.find(user => user.id === id);
    return of(user?.skills)
  }

  public addSkill( id: number, newSkill: Skill): Observable<any>{
    const user = this.users.find(user => user.id === id);
    if (user) {
        newSkill.id = user.skills.length+1;
        user.skills.push(newSkill);
    }
    
    return of(user);
  }

  updateItem(id: number, skillToBeModified : Skill): Observable<any> {
    const user = this.users.find(user=> user.id === id);
    const index = user?.skills.findIndex(skill => skillToBeModified.id === skill.id)
    if (!!index && !!user && (index > -1)) {
      user.skills[index] = skillToBeModified;
    }

    user?.skills.map(skill => 
      skill.id === skillToBeModified.id ? { ...skill, name: skillToBeModified.name, rating: skillToBeModified.rating } : skill
    );
    
    console.log(this.users);
    return of(this.users);
  }

  deleteSkill(id: number, skillToBeDeleted : Skill): Observable<any> {
    const user = this.users.find(user=> user.id === id);
    const index = user?.skills.findIndex(skill => skillToBeDeleted.name === skill.name)
    alert(index)
    if ((index ==0 || index) && (index > -1)) {
      user?.skills.splice(index, 1);
    }
    return of( this.users );
  }
}
