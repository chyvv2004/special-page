import { Component, HostListener } from '@angular/core';
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
    {
      image: 'assets/photos/photo1.jpg',
      caption: 'A beautiful memory ❤️'
    },
    {
      image: 'assets/photos/photo2.jpg',
      caption: 'One of those moments worth remembering 😊'
    },
    {
      image: 'assets/photos/photo3.jpg',
      caption: 'Another little memory ✨'
    },
    {
      image: 'assets/photos/photo4.jpg',
      caption: 'And this one... ❤️'
    }
  ];

  currentPhotoIndex = 0;


  /* ================================= */
  /* NO BUTTON POSITION */
  /* ================================= */

  noButtonX = 0;
  noButtonY = 0;

  noButtonMoved = false;

  private readonly BUTTON_WIDTH = 110;
  private readonly BUTTON_HEIGHT = 50;

  private readonly SAFE_DISTANCE = 150;


  /* ================================= */
  /* PAGE NAVIGATION */
  /* ================================= */

  goToPage(page: number): void {

    this.currentPage = page;

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

  }


  /* ================================= */
  /* PHOTO NAVIGATION */
  /* ================================= */

  nextPhoto(): void {

    if (this.currentPhotoIndex < this.photos.length - 1) {

      this.currentPhotoIndex++;

    } else {

      this.goToPage(3);

    }

  }


  /* ================================= */
  /* DETECT MOUSE APPROACH */
  /* ================================= */

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {

    if (this.currentPage !== 3) {
      return;
    }

    const button = document.querySelector(
      '.no-button'
    ) as HTMLElement | null;

    if (!button) {
      return;
    }

    const rect = button.getBoundingClientRect();

    const buttonCenterX =
      rect.left + rect.width / 2;

    const buttonCenterY =
      rect.top + rect.height / 2;


    const distanceX =
      event.clientX - buttonCenterX;

    const distanceY =
      event.clientY - buttonCenterY;


    const distance =
      Math.sqrt(
        distanceX * distanceX +
        distanceY * distanceY
      );


    /*
     * If cursor gets close enough,
     * move the button somewhere else
     * on the entire screen.
     */

    if (distance < this.SAFE_DISTANCE) {

      this.moveNoButton();

    }

  }


  /* ================================= */
  /* TOUCH / CLICK */
  /* ================================= */

  onNoButtonInteraction(event: Event): void {

    event.preventDefault();

    this.moveNoButton();

  }


  /* ================================= */
  /* MOVE BUTTON ANYWHERE */
  /* ================================= */

  moveNoButton(): void {

    /*
     * Width and height of the visible screen.
     */

    const screenWidth = window.innerWidth;

    const screenHeight = window.innerHeight;


    /*
     * Keep a small margin from the edges.
     */

    const margin = 15;


    const maxX =
      screenWidth -
      this.BUTTON_WIDTH -
      margin;


    const maxY =
      screenHeight -
      this.BUTTON_HEIGHT -
      margin;


    /*
     * Generate random position.
     */

    let randomX =
      margin +
      Math.random() * (maxX - margin);


    let randomY =
      margin +
      Math.random() * (maxY - margin);


    /*
     * Occasionally force the button
     * toward a random screen region.
     *
     * This makes the movement feel
     * much more unpredictable.
     */

    const locationType =
      Math.floor(Math.random() * 8);


    switch (locationType) {

      /* TOP LEFT */

      case 0:

        randomX = margin;
        randomY = margin;

        break;


      /* TOP RIGHT */

      case 1:

        randomX =
          screenWidth -
          this.BUTTON_WIDTH -
          margin;

        randomY = margin;

        break;


      /* BOTTOM LEFT */

      case 2:

        randomX = margin;

        randomY =
          screenHeight -
          this.BUTTON_HEIGHT -
          margin;

        break;


      /* BOTTOM RIGHT */

      case 3:

        randomX =
          screenWidth -
          this.BUTTON_WIDTH -
          margin;

        randomY =
          screenHeight -
          this.BUTTON_HEIGHT -
          margin;

        break;


      /* TOP CENTER */

      case 4:

        randomX =
          screenWidth / 2 -
          this.BUTTON_WIDTH / 2;

        randomY = margin;

        break;


      /* BOTTOM CENTER */

      case 5:

        randomX =
          screenWidth / 2 -
          this.BUTTON_WIDTH / 2;

        randomY =
          screenHeight -
          this.BUTTON_HEIGHT -
          margin;

        break;


      /* RANDOM */

      case 6:
      case 7:

        // Keep the random position

        break;

    }


    this.noButtonX = randomX;

    this.noButtonY = randomY;

    this.noButtonMoved = true;

  }


  /* ================================= */
  /* YES */
  /* ================================= */

  sayYes(): void {

    this.goToPage(4);
  }
}
