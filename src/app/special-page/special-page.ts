import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Photo {
  image: string;
  caption: string;
}

@Component({
  selector: 'app-special-page',
  imports: [CommonModule],
  templateUrl: './special-page.html',
  styleUrl: './special-page.scss',
})
export class SpecialPage {
  currentPage = 1;

  photos: Photo[] = [
    { image: '/assets/IMG-20260818-WA0010.jpg', caption: 'Nee smile chusthe chaalu, aa moment automatic ga beautiful aipothundi ❤️' },
    { image: '/assets/IMG-20260629-WA0094.jpg', caption: 'Nuvvu em chesina, enduko oka special vibe untundi nee lo ✨' },
    { image: '/assets/IMG-20251211-WA0008.jpg', caption: 'Ee pic lo chala cute ga unnavu… chusthe automatic ga muddu pettalani undi 😍😘' },
    { image: '/assets/IMG-20260115-WA0013.jpg', caption: 'Nuvvu simple ga unna kuda, somehow chala special ga kanipistav 💗😘' },
    { image: '/assets/IMG-20260629-WA0045.jpg', caption: 'Ninnu special chesedi nee looks matrame kaadu… nee way of being ishtam ✨' },
    { image: '/assets/IMG-20251227-WA0003.jpg', caption: 'Ee sunset entha beautiful ga unna, naa attention matram nee daggare aagipoyindi ❤️' },
    { image: 'assets/IMG-20260209-WA0035.jpg', caption: 'Heart ni ila hands tho chupinchav… kaani naaku anipinchindi, naa heart already nee daggare undipoyindi ani ❤️😘' },
    { image: 'assets/IMG-20260812-WA0051.jpg', caption: 'Nuvvu entha simple ga unna, nee presence matram eppudu simple ga undadu… attention motham nee meedake vasthundi  💕🥰❤️' },
  ];

  currentPhotoIndex = 0;

  // No-button position
  noButtonX = 0;
  noButtonY = 0;
  noButtonMoved = false;

  private readonly BUTTON_WIDTH = 110;
  private readonly BUTTON_HEIGHT = 50;

  // Page navigation
  goToPage(page: number): void {
    this.currentPage = page;
  }

  // Photo navigation
  nextPhoto(): void {
    if (this.currentPhotoIndex < this.photos.length - 1) {
      this.currentPhotoIndex++;
    } else {
      this.goToPage(3);
    }
  }

  previousPhoto(): void {
    if (this.currentPhotoIndex > 0) {
      this.currentPhotoIndex--;
    }
  }
  
  onNoButtonInteraction(event: Event): void {
    event.preventDefault();
    this.moveNoButton();
  }

  // Move the "no" button to a random (or corner-biased) spot on screen
  moveNoButton(): void {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const margin = 15;

    const maxX = screenWidth - this.BUTTON_WIDTH - margin;
    const maxY = screenHeight - this.BUTTON_HEIGHT - margin;

    let randomX = margin + Math.random() * (maxX - margin);
    let randomY = margin + Math.random() * (maxY - margin);

    // Occasionally snap to a screen region so the movement feels less predictable
    const locationType = Math.floor(Math.random() * 8);

    switch (locationType) {
      case 0: // top left
        randomX = margin;
        randomY = margin;
        break;
      case 1: // top right
        randomX = screenWidth - this.BUTTON_WIDTH - margin;
        randomY = margin;
        break;
      case 2: // bottom left
        randomX = margin;
        randomY = screenHeight - this.BUTTON_HEIGHT - margin;
        break;
      case 3: // bottom right
        randomX = screenWidth - this.BUTTON_WIDTH - margin;
        randomY = screenHeight - this.BUTTON_HEIGHT - margin;
        break;
      case 4: // top center
        randomX = screenWidth / 2 - this.BUTTON_WIDTH / 2;
        randomY = margin;
        break;
      case 5: // bottom center
        randomX = screenWidth / 2 - this.BUTTON_WIDTH / 2;
        randomY = screenHeight - this.BUTTON_HEIGHT - margin;
        break;
      default: // keep the random position
        break;
    }

    this.noButtonX = randomX;
    this.noButtonY = randomY;
    this.noButtonMoved = true;
  }

  sayYes(): void {
    this.goToPage(4);
  }
}