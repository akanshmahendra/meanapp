import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  newPostForm: FormGroup;
  mode: string;
  postId: string;
  isLoading: boolean = false;

  constructor(private postService: PostService, private router: ActivatedRoute) { }

  ngOnInit() {
    this.newPostForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(3)]),
      content: new FormControl('', Validators.required),
      id: new FormControl('')
    });

    this.router.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.isLoading = true;
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.postService.getPost(this.postId).subscribe(postData => {
          this.isLoading = false;
          this.newPostForm.setValue({
            title: postData.title,
            content: postData.content,
            id: postData._id
          });
        });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }

  onSavePost() {
    this.isLoading = true;
    if (this.mode === 'edit') {
      this.postService.updatePost(this.newPostForm.value);
    } else {
      this.postService.addPost({ ...this.newPostForm.value, id: this.postId });
    }
    this.newPostForm.reset();
  }

}
