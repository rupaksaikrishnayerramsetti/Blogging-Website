import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';

export interface Blog {
  id?: string;
  title: string;
  description: string;
  email: string;
  status: 'active' | 'inactive';
  createdAt?: Date;
};

@Injectable({
  providedIn: 'root'
})

export class BlogServiceService {
  private dbPath = '/blogs';

  blogsRef: AngularFirestoreCollection<Blog>;

  constructor(private db: AngularFirestore) {
    this.blogsRef = db.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<Blog> {
    return this.blogsRef;
  }

  getAllPaginated(pageSize: number, startIndex: number): AngularFirestoreCollection<Blog> {
    return this.db.collection(this.dbPath, ref => ref.orderBy('createdAt').limit(pageSize).startAt(startIndex));
  }
  
  getTotalBlogs(): Observable<number> {
    return this.db.collection(this.dbPath).get().pipe(
      map(snapshot => snapshot.size)
    );
  }  

  // get blog post by email
  getByEmail(email: string): AngularFirestoreCollection<Blog> {
    return this.db.collection(this.dbPath, ref => ref.where('email', '==', email));
  }

  // get blog post by blog id
  getBlogById(id: string): Observable<Blog | undefined> {
    return this.db.collection<Blog>(this.dbPath, ref => ref.where('id', '==', id))
      .valueChanges({ idField: 'id' })
      .pipe(
        map((blogs: Blog[]) => blogs.length > 0 ? blogs[0] : undefined)
      );
  }

  // getBlogsByEmail(email: string, pageSize: number, pageIndex: number): Observable<Blog[]> {
  //   return this.db.collection<Blog>(this.dbPath, ref =>
  //     ref
  //       .where('email', '==', email)
  //       .orderBy('createdAt', 'desc')
  //       .limit(pageSize)
  //       .startAfter(pageIndex * pageSize)
  //   ).valueChanges({ idField: 'id' });
  // }

  // getTotalBlogsByEmail(email: string): Observable<number> {
  //   return this.db.collection<Blog>(this.dbPath, ref =>
  //     ref.where('email', '==', email)
  //   ).get().pipe(
  //     map(snapshot => snapshot.size)
  //   );
  // }

  // create blog post
  addBlog(blog: Blog): any {
    blog.id = this.db.createId();
    const createdAt = new Date();
    return this.blogsRef.add({createdAt,...blog});
  }

  updateBlog(id: string, data: Blog): Promise<void> {
    return this.db.collection(this.dbPath, ref => ref.where('id', '==', id))
      .get()
      .toPromise()
      .then((querySnapshot) => {
        if (querySnapshot) {
          const doc = querySnapshot.docs[0];
          return doc.ref.update(data);
        } else {
          throw new Error('Document does not exist');
        }
      })
      .catch((error) => {
        console.error('Error updating blog:', error);
        throw error;
      });
  }
  
  deleteBlog(id: string): Promise<void> {
    return this.db.collection(this.dbPath).doc(id).delete();
  }  
}
