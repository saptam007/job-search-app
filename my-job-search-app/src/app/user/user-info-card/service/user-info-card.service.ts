import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';
import { UserInfoCardDataService } from './user-info-card-data.service';
import { Skill } from '../model/skills.model';

@Injectable({
  providedIn: 'root'
})
export class UserInfoCardService {

  constructor(private dataService: UserInfoCardDataService) { }

  public getUsers(): Observable<User[]> {
    return this.dataService.getUsers();
  }

  public getSkills(id: number): Observable<Skill[] | undefined> {
    return this.dataService.getSkills(id);
  }

  addOrUpdateSkills(id: number, updatedSkills: Skill[]): Observable<any> {
    return this.dataService.addOrUpdateSkillsToUsers(id, updatedSkills);
  }

  deleteSkill(id: number, skillToBeDeleted: Skill): Observable<any> {
    return this.dataService.deleteSkill(id, skillToBeDeleted);
  }
}
