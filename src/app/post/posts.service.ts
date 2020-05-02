import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: any = [];
  private postsUpdated = new Subject<Post[]>();

  constructor (private http : HttpClient){}
  getPosts() {
    this.http.get<{msg : string, posts: any}>('http://localhost:3000/api/posts')
    .pipe(map((postData) => {
        return postData.posts.map(post =>{
          return {
              title : post.title,
              content : post.content,
              id : post._id
          };
        });
    }))
    .subscribe((postChangedID) =>{
      this.posts = postChangedID;
      this.postsUpdated.next([...this.posts]);
    });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const post: Post = {id : null,title: title, content: content};
    this.http.post<{msg : string}>('http://localhost:3000/api/posts', post)
      .subscribe((resposeData) => {
        console.log(resposeData);

      this.posts.push(post);
      this.postsUpdated.next([...this.posts]);
      });
  }

  deletePost(postId : string){
    this.http.delete("http://localhost:3000/api/posts/" + postId)
      .subscribe(() => {
         console.log('Post Deleted!!');
      });
  }
}