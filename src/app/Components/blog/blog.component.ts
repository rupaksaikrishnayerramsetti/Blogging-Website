import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Blog, BlogServiceService } from 'src/app/Services/Blog/blog-service.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})

export class BlogComponent {
  blogForm: FormGroup;
  email: string;
  blogId!: string;
  blogData!: Blog;

  constructor(private fb: FormBuilder, private blogService: BlogServiceService, private router: Router, private route: ActivatedRoute) {
    this.blogForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]],
      description: [''],
      status: ['active', Validators.required]
    });
  
    this.email = localStorage.getItem('email') || '';
  
    this.route.params.subscribe(params => {
      this.blogId = params['id'];
      this.blogService.getBlogById(this.blogId).subscribe(blog => {
        if (blog) {
          this.blogData = blog;
          this.blogForm.patchValue({
            title: this.blogData.title,
            description: this.blogData.description,
            status: this.blogData.status
          });
          console.log(this.blogData.description);
        }
      });
    });
  }  

  get title() { return this.blogForm.get('title');}
  get description() { return this.blogForm.get('description')}
  get status() { return this.blogForm.get('status')}

  async onSubmit(): Promise<void> {
    const blog: Blog = this.blogForm.value;
    let email = localStorage.getItem("email")
    blog.email = email ? email : "guest@gmail.com"
    console.log(this.blogId);
    if (this.blogId) {
      await this.blogService.updateBlog(this.blogId, blog)
      .then(() => {
        this.router.navigate(['/my-blog-list']);
      })
      .catch((error) => {
        console.error('Error updating blog:', error);
      });
    } else {
      await this.blogService.addBlog(blog);
    this.router.navigate(['/my-blog-list']);
    }
  }

  handleCancel(): void {
    this.router.navigate(['/my-blog-list'])
  }
}
