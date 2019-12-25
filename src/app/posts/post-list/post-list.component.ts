import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { takeWhile, takeUntil, take } from 'rxjs/operators';

import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  @Input() posts: Post[] = [];
  isLoading = false;
  compoentActive = true;

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.postService.getPosts();
    this.isLoading = true;
    this.postService.updatedPosts.pipe(takeWhile(() => this.compoentActive)).subscribe(p => {
      this.isLoading = false;
      this.posts = p;
    });
  }

  onDelete(postId: string) {
    this.postService.deletePost(postId);
  }

  ngOnDestroy() {
    this.compoentActive = false;
  }

}
