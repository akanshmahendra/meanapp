import { Injectable } from '@angular/core';
import { Post } from '../models/post';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private posts: Post[] = [];
  private updatedPosts = new Subject<Post[]>();

  constructor() { }

  getPosts(): Post[] {
    return [...this.posts];
  }

  updatedPostsListener(): Observable<Post[]> {
    return this.updatedPosts.asObservable();
  }

  addPost(post: Post): void {
    this.posts.push(post);
    this.updatedPosts.next([...this.posts]);
  }
}
