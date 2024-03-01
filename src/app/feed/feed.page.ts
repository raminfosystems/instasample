import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class FeedPage implements OnInit {
  
  posts: { title: string, description: string, image: string }[] = [];

  constructor() { }

  ngOnInit() {
    // Call to load initial posts
    this.loadPosts();
  }

  loadPosts() {
    // just generate dummy data
    for (let i = 0; i < 10; i++) {
      this.posts.push({
        title: `Post ${i + 1}`,
        description: `This is a description for post ${i + 1}`,
        image: `https://via.placeholder.com/150?text=Post+${i + 1}`
      });
    }
  }

  loadMorePosts(event: { target: { complete: () => void; disabled: boolean; }; }) {
   
    // Simulate loading more posts
    setTimeout(() => {
      // Mock API call to load more posts
      // Replace this with actual API call
      for (let i = 0; i < 5; i++) {
        this.posts.push({ 
          title: 'Post ' + (this.posts.length + 1),
          description: 'This is a description for post ' + (this.posts.length + 1),
          image: `https://via.placeholder.com/150?text=Post+${this.posts.length + 1}`
        });
      }
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (this.posts.length >= 50) {
        event.target.disabled = true;
      }
    }, 500);

  }



}
