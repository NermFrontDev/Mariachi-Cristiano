import {
  animate,
  style,
  transition,
  trigger,
  AnimationEvent } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';

interface Item {
  imageSrc: string;
  imageAlt: string;
}

@Component({
  selector: 'app-gallery-lightbox',
  templateUrl: './gallery-lightbox.component.html',
  styleUrls: ['./gallery-lightbox.component.scss'],
  animations: [
    trigger('animation', [
      transition('void => visible', [
        style({ opacity: 0, transform: 'scale(0.5)' }),
        animate('150ms', style({ opacity: 1, transform: 'scale(1)' }))
      ]),
      transition('visible => void', [
        animate('150ms', style({ opacity: 1, transform: 'scale(0.5)' }))
      ])
    ])
  ]
})
export class GalleryLightboxComponent implements OnInit{

  @Input() galleryData: Item[] = [];
  @Input() showCount = false;

  previewImage: boolean = false;
  showMask: boolean = false;
  currentLightboxImage: Item = { imageSrc: '', imageAlt: '' };
  currentIndex: number = 0;
  controls: boolean = true;
  totalImageCount: number = 0;

  ngOnInit(): void {
    if (this.galleryData.length > 0) {
      this.currentLightboxImage = this.galleryData[0];
    }
  }

  onPreviewImage(index: number): void {
    this.showCount = true;
    this.currentIndex = index;
    this.currentLightboxImage = this.galleryData[index];
    this.showMask = true;
    this.previewImage = true;
  }

  onClosePreview(): void {
    this.previewImage = false;
    this.showMask = false;
  }

  onAnimationEnd(event: AnimationEvent): void {
    if (event.toState === 'void') {
      this.previewImage = false;
      this.showMask = false;
    }
  }

}
