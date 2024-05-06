import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/Auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private router: Router, private auth: AuthService) { }

  goToHome(): void {
    this.router.navigate(['/home']);
  }

  goToMyBlogs(): void {
    this.router.navigate(['/my-blog-list']);
  }

  goToProfile(): void {
    this.router.navigate(['/profile']);
  }

  logout(): void {
    this.auth.logout();
  }
}
