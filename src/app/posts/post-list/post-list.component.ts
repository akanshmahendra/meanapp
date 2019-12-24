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
  compoentActive = true;

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.postService.updatedPostsListener().pipe(takeWhile(() => this.compoentActive)).subscribe(p => this.posts = p);
  }

  ngOnDestroy() {
    this.compoentActive = false;
  }

}