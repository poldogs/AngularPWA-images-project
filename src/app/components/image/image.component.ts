import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ImagesService } from '../../services/images.service';
import { Image } from '../../models/image.interface';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrl: './image.component.css'
})
export class ImageComponent implements OnInit{
  image: undefined | Image;
  showDetails = false;

  constructor(
    private router: Router, 
    private activatedRoute: ActivatedRoute, 
    private imagesService: ImagesService,
  ) {}

  ngOnInit(): void {
    const identifier = this.activatedRoute.snapshot.paramMap.get('id');

    this.imagesService.getImageById(identifier ?? '').subscribe((image) => {

        if(!image){
          this.router.navigateByUrl('/');
          return; // Add return statement here
        }

        this.image = image;
      });
  }
}
