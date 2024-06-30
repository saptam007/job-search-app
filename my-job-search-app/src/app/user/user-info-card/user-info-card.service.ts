import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './model/user.model';
import { UserInfoCardDataService } from './user-info-card-data.service';

@Injectable({
  providedIn: 'root'
})
export class UserInfoCardService {

  constructor(private dataService : UserInfoCardDataService) { }

  getUsers(): Observable<User[]>{
    return this.dataService.getUsers();
  }
}
