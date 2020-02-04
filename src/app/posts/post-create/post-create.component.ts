import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { mimeType } from 'src/app/validators/mime-type.validator';

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
  imagePreview: string | ArrayBuffer;

  constructor(private postService: PostService, private router: ActivatedRoute) { }

  ngOnInit() {
    this.newPostForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(3)]),
      content: new FormControl('', Validators.required),
      id: new FormControl(''),
      image: new FormControl(null, { validators: [Validators.required], asyncValidators: [mimeType] })
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
            id: postData._id,
            image: postData.imagePath
          });
        });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.newPostForm.patchValue({ image: file });
    this.newPostForm.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    }
    reader.readAsDataURL(file);
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
