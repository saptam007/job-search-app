import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { UserInfoCardService } from './service/user-info-card.service';
import { User } from './model/user.model';
import { CommonModule } from '@angular/common';
import { UserDetailDialogComponent } from './components/user-detail-dialog/user-detail-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-user-info-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './user-info-card.component.html',
  styleUrl: './user-info-card.component.css'
})
export class UserInfoCardComponent implements OnInit {
  public users: User[] = [];

  constructor(private service: UserInfoCardService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.loadItems();
  }

  private loadItems(): void {
    this.service.getUsers().subscribe(data => this.users = data);
  }

  public openUserDetailDialog(user: User): void {
    const dialogRef = this.dialog.open(UserDetailDialogComponent, {
      width: '1000px',
      data: { user: user }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.users.findIndex(u => u.id === result.id);
        if (index !== -1) {
          this.users[index] = result;
        }
        else this.users.push(result);
      }
      console.log('The dialog was closed');
      console.log(result);
    });
  }
}
