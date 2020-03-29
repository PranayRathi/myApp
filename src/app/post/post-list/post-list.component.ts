import { Component, OnInit } from '@angular/core';
import { Post} from '../post.model'
import { PostService } from '../post.service';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  posts : Post[] = []
  // [
  //   {title : "1 post", content : '1st post\'s content'},
  //   {title : "2 post", content : '2st post\'s content'},
  //   {title : "3 post", content : '3st post\'s content'}
  // ]

  constructor(public postService: PostService) { }

  ngOnInit(): void {
    this.posts = this.postService.getPosts();
  }

}
