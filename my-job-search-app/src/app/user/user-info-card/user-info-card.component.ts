import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { UserInfoCardService } from './user-info-card.service';
import { User } from './model/user.model';
import { CommonModule } from '@angular/common';
import { UserDetailDialogComponent } from './components/user-detail-dialog/user-detail-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-info-card',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './user-info-card.component.html',
  styleUrl: './user-info-card.component.css'
})
export class UserInfoCardComponent {
  public users: User[] = [];

  constructor(private service : UserInfoCardService, public dialog : MatDialog){
      this.service.getUsers().subscribe( data => {
        this.users = data;
      });
    }

    public openUserDetailDialog(user: User): void {
      // Fetch user details from a service or API
  
      const dialogRef = this.dialog.open(UserDetailDialogComponent, {
        width: '800px',
        data: { user: user }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        console.log(result);
      });
    }  
}
