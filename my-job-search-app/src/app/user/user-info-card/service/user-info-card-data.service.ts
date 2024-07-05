import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Skill } from '../model/skills.model';

@Injectable({
  providedIn: 'root'
})
export class UserInfoCardDataService {
  private dataUrl = 'assets/user.json';
  private users: User[] = [];

  constructor(private http: HttpClient) {
    this.loadUsers().subscribe(data => this.users = data);
  }

  private loadUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.dataUrl);
  }

  public getUsers(): Observable<User[]> {
    return this.loadUsers();
  }

  public getSkills(id: number): Observable<Skill[] | undefined> {
    const user = this.users.find(user => user.id === id);
    return of(user?.skills)
  }

  public addOrUpdateSkillsToUsers(id: number, updatedSkills: Skill[]): Observable<any> {
    if (!Array.isArray(updatedSkills)) {
      throw new Error("updatedSkills should be an array");
    }

    this.users = this.users.map(user => {
      updatedSkills.forEach(updatedSkill => {
        //check if the skill already exists in the profile
        const existingSkillIndex = user.skills.findIndex(s => s.id === updatedSkill.id)
        if (existingSkillIndex !== -1) {
          user.skills[existingSkillIndex].name = updatedSkill.name;
          user.skills[existingSkillIndex].rating = updatedSkill.rating;
        } else {
          //Add new skill
          user.skills.push({ ...updatedSkill, id: user.skills.length + 1 });
        }
      });
      return user;
    });

    return of(this.users)
  }

  deleteSkill(id: number, skillToBeDeleted: Skill): Observable<any> {
    const user = this.users.find(user => user.id === id);
    const index = user?.skills.findIndex(skill => skillToBeDeleted.name === skill.name)
    if ((index == 0 || index) && (index > -1)) {
      user?.skills.splice(index, 1);
    }
    return of(this.users);
  }
}
