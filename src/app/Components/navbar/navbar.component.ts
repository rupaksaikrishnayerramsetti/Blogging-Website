import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/Auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isMobile: boolean = false;
  islogin: boolean = false;
  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
    this.checkScreenSize();
    window.addEventListener('resize', () => {
      this.checkScreenSize();
    });
    this.islogin = localStorage.getItem('email') ? true : false
  }

  checkScreenSize(): void {
    this.isMobile = window.innerWidth <= 768;
  }
  goToHome(): void {
    this.router.navigate(['/home']);
  }

  goToMyBlogs(): void {
    this.router.navigate(['/my-blog-list']);
  }

  goToProfile(): void {
    this.router.navigate(['/profile']);
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  logout(): void {
    this.auth.logout();
  }
}
