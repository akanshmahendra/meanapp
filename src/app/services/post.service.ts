import { Injectable } from '@angular/core';
import { Post, PostDto } from '../models/post';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private posts: Post[] = [];
  updatedPosts = new Subject<Post[]>();

  constructor(private http: HttpClient) { }

  getPosts(): void {
    this.http.get<PostDto>('http://localhost:3000/api/posts').subscribe((postData) => {
      this.posts = postData.posts;
      this.updatedPosts.next([...this.posts]);
    });
  }

  addPost(post: Post): void {
    this.http.post('http://localhost:3000/api/posts', post).subscribe(responseData => {
      this.posts.push(post);
      this.updatedPosts.next([...this.posts]);
    });
  }
}
