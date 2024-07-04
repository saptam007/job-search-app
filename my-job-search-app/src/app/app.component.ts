import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UserInfoCardComponent } from './user/user-info-card/user-info-card.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, UserInfoCardComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'my-job-search-app';
}
