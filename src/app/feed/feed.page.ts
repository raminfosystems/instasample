import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AlertController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class FeedPage implements OnInit {
  
  posts: { title: string, description: string, image: string }[] = [];

  constructor(private alertController : AlertController) { }

  ngOnInit() {
    // Call to load initial posts
    this.loadPosts();
    this.displayPopupIfNotLoggedIn();
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
        this.displayPopupIfNotLoggedIn();
      }
    }, 500);

  }

  async displayPopupIfNotLoggedIn() {
    // Simulating user not being logged in after 10 seconds
    setTimeout(async () => {
      const alert = await this.alertController.create({
        header: 'Login Required',
        message: 'Please log in to continue.',
        buttons: ['OK']
      });
  
      await alert.present();
    }, 5000); // Adjust the time as needed (e.g., 10000 milliseconds for 10 seconds)
  }
  

  // check every 5 seconds if the user is logged in
  // if not, display the popup
  // this is just a mock implementation
  // replace with actual implementation
  checkIfLoggedIn() {
    setInterval(() => {
      this.displayPopupIfNotLoggedIn();
    }, 5000);
  }

  // when user scroll on the page, check if the user is logged in 
  // if not, display the popup
  // this is just a mock implementation 
  // replace with actual implementation
  onScroll(event: any) {
    this.checkIfLoggedIn();
  }

  // when user click on the page, check if the user is logged in
  // if not, display the popup
  // this is just a mock implementation
  // replace with actual implementation
  onClick(event: any) {
    console.log('click event', event);
    this.checkIfLoggedIn();
  }

}
