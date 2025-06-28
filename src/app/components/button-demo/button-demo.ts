import { Component } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-button-demo',
  imports: [CommonModule],
  templateUrl: './button-demo.html',
  styleUrl: './button-demo.css'
})
export class ButtonDemo {

  posts: any[] = []
  isLoading = false

  constructor(private apiService: ApiService) { }

  //obter posts

  fetchPosts() {
    this.isLoading = true;
    this.apiService.getPosts().subscribe({
      next: (data) => {
        this.posts = data;
        this.isLoading = false
      },
      error: () => {
        alert('erro ao buscar posts');
        this.isLoading = false
      },
    })
  }

  // Criar um novo post

  createPost() {
    const newPost = {
      title: 'Novo Post',
      body: 'este é o corpo do post',
      userId: 1,
    };
    this.apiService.createPost(newPost).subscribe((post) => {
      this.posts.unshift(post);
      alert('post criado com successo')
    })
  }

  // Atualizar um post
  updatePost(){
    if(this.posts.length > 0) {
      const postId = this.posts[0].id;
      const updates = {title: 'titulo atualizado'};
      this.apiService.updatePost(postId, updates).subscribe((updatePost) => {
        this.posts[0] = updatePost;
        alert('Post atualizado com sucesso!')
      })
    }
  }

  deletePost() {
    if(this.posts.length > 0 ) {
      const postId = this.posts[0].id;
      this.apiService.deletePost(postId).subscribe(() =>{
        this.posts.shift();
        alert('post excluido')
      })
    }
  }

}
