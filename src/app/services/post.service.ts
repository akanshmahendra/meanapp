import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Post, PostDto } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private posts: Post[] = [];
  updatedPosts = new Subject<Post[]>();

  constructor(private http: HttpClient, private router: Router) { }

  getPosts(): void {
    this.http.get<PostDto>('http://localhost:3000/api/posts')
    .pipe(map((postData) => {
      return postData.posts.map(post => {
        return {
          title: post.title,
          content: post.content,
          id: post._id
        };
      });
    }))
    .subscribe((postData) => {
      this.posts = postData;
      this.updatedPosts.next([...this.posts]);
    });
  }

  addPost(post: Post): void {
    this.http.post<{ message: string, postId: string }>('http://localhost:3000/api/posts', post).subscribe(responseData => {
      post.id = responseData.postId;
      this.posts.push(post);
      this.updatedPosts.next([...this.posts]);
      this.router.navigate(['/']);
    });
  }

  deletePost(postId: string) {
    this.http.delete('http://localhost:3000/api/posts/' + postId).subscribe(() => {
      this.posts = this.posts.filter(post => post.id !== postId);
      this.updatedPosts.next([...this.posts]);
    });
  }

  getPost(postId: string): Observable<any> {
    return this.http.get('http://localhost:3000/api/posts/' + postId);
  }

  updatePost(post: Post) {
    this.http.put('http://localhost:3000/api/posts/' + post.id, post).subscribe(() => {
      const index = this.posts.findIndex(p => p.id === post.id);
      this.posts[index] = post;
      this.updatedPosts.next([...this.posts]);
      this.router.navigate(['/']);
    });
  }
}
