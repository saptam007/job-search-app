import { Injectable } from '@angular/core';
import { User } from './model/user.model';
import { StaticDataSource } from './model/datasource';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserInfoCardDataService {

  private users: User[] = [];

  constructor(private dataSource: StaticDataSource) {
      dataSource.getUsers().subscribe(data => {
          this.users = data;
      });
  }

  getUsers(): Observable<User[]> {
      return of(this.users);
  }
}
