import { Component } from '@angular/core';
import { AuthService } from 'src/app/Services/Auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  email: string | null = '';

  constructor(private authService: AuthService) { 
    this.email = localStorage.getItem("email");
  }
}
