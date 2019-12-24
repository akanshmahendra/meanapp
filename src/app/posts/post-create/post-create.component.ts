import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  newPostForm: FormGroup;

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.newPostForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(3)]),
      content: new FormControl('', Validators.required)
    });
  }

  onAddPost() {
    this.postService.addPost(this.newPostForm.value);
    this.newPostForm.reset();
  }

}
