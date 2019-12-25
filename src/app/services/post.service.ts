import { Injectable } from '@angular/core';
import { Post, PostDto } from '../models/post';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private posts: Post[] = [];
  updatedPosts = new Subject<Post[]>();

  constructor(private http: HttpClient) { }

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
    });
  }

  deletePost(postId: string) {
    this.http.delete('http://localhost:3000/api/posts/' + postId).subscribe(() => {
      this.posts = this.posts.filter(post => post.id !== postId);
      this.updatedPosts.next([...this.posts]);
    });
  }
}
