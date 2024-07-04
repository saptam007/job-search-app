import { Injectable } from '@angular/core';
import { User } from '../../model/user.model';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Skill } from '../../model/skills.model';

@Injectable({
  providedIn: 'root'
})
export class UserDetailDialogDataService {
  private dataUrl = 'assets/user.json';
  private users: User[] = [];
  
  constructor(private http : HttpClient) {
    this.loadUsers().subscribe(data => this.users = data);
   }

  loadUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.dataUrl);
  }

  getUsers(): Observable<User[]> {
    return of(this.users)
  }

  getSkillItems(id: number): Skill[] | undefined {
    const selectedUser = this.users.find(user => user.id === id);
    return selectedUser?.skills;
  }

  addSkill( id: number, newSkill: Skill): Observable<any>{
    const user = this.users.find(user => user.id === id);
    if (user) {
        user.skills.push(newSkill);
    }
    return of(this.users);
  }
}
