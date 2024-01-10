import { Component, OnInit } from '@angular/core';
import { ImagesService } from '../../services/images.service';
import { Image } from '../../models/image.interface';
import { trigger, state, style, transition, animate } from '@angular/animations';


@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrl: './images.component.css',
  animations: [
    trigger('slideInLeft', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)', opacity: 0 }),
        animate('{{ delay }}ms', style({ transform: 'translateX(0)', opacity: 1 })),
      ]),
    ]),
  ]
})
export class ImagesComponent implements OnInit {
  images:Image[]=[];
  viewMode: 'cards' | 'table' = 'table';
  isLoading = true;

  constructor(private imagesService:ImagesService) { }

  ngOnInit(): void {

    this.imagesService
    .getImages()
    .subscribe((images)=> {
      this.images = images;
      this.isLoading = false;
    });
  }

  switchView(mode: 'cards' | 'table'): void {
    this.viewMode = mode;
  }
}
