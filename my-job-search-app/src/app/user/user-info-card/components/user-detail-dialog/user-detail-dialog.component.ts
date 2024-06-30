import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../model/user.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-detail-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-detail-dialog.component.html',
  styleUrl: './user-detail-dialog.component.css'
})
export class UserDetailDialogComponent {
  user: User;
  categories: string[] = ['Skills', 'Rating'];

  constructor(
    public dialogRef: MatDialogRef<UserDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
      this.user = data.user;
  }

  public onCloseDialog(){
    this.dialogRef.close();
  }
}
