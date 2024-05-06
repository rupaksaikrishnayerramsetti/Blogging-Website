import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Blog, BlogServiceService } from 'src/app/Services/Blog/blog-service.service';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-blog-list',
  templateUrl: './my-blog-list.component.html',
  styleUrls: ['./my-blog-list.component.css']
})
export class MyBlogListComponent implements OnInit {
  blogs$: Observable<Blog[]> | undefined;
  pageSize = 20;
  pageIndex = 0;
  totalBlogs = 0;

  constructor(private blogService: BlogServiceService, private router: Router) {}

  editBlog(blogData: Blog) {
    this.router.navigate(['/blog', blogData.id], { state: { data: blogData } });
  }

  ngOnInit() {
    this.fetchBlogs();
  }

  Blogpage() {
    this.router.navigate(['/blog']);
  }

  fetchBlogs() {
    let email = localStorage.getItem('email') || "guest@gmail.com";
    this.blogs$ = this.blogService.getByEmail(email).valueChanges();

    this.blogs$.subscribe(blogs => {
      this.totalBlogs = blogs.length;
    });
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.fetchBlogs();
  }
}
