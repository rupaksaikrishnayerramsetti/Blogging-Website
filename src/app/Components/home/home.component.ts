import { Component, OnInit } from '@angular/core';
import { BlogServiceService, Blog, } from 'src/app/Services/Blog/blog-service.service';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  blogs$: Observable<Blog[]> | undefined;
  pageSize = 20;
  pageIndex = 0;
  totalBlogs = 0;

  constructor(private blogService: BlogServiceService, private auth: AuthService) { }
  
  ngOnInit() {
    this.fetchAllBlogs();
  }

  fetchAllBlogs() {
    this.blogs$ = this.blogService.getAllPaginated(this.pageSize, this.pageIndex * this.pageSize).valueChanges();
  
    this.blogService.getTotalBlogs().subscribe(total => {
      this.totalBlogs = total;
    });
  }  

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.fetchAllBlogs();
  }
}
