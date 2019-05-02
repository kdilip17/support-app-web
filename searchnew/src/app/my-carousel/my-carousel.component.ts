import { Component, OnInit } from '@angular/core';
import { slider } from './hello-slide.animation'

@Component({
  selector: 'app-my-carousel',
  templateUrl: './my-carousel.component.html',
  styleUrls: ['./my-carousel.component.css'],
})
export class MyCarouselComponent implements OnInit {
  ngOnInit(): void {
    // throw new Error("Method not implemented.");
  }

 slides = [
    {img: "./assets/images/landing/access-points-img.png", title:"ACCESS POINTS"},
    {img: "./assets/images/landing/carousel-controllers-img.png", title:"CONTROLLERS"},
    {img: "./assets/images/landing/carousel-switches-img.png", title:"SWITCHES"},
    {img: "./assets/images/landing/carousel-solutions-img.png", title:"SOFTWARE SOLUTIONS"},
    {img: "./assets/images/landing/access-points-img.png", title:"ACCESS POINTS"},
    {img: "./assets/images/landing/carousel-controllers-img.png", title:"CONTROLLERS"},
    {img: "./assets/images/landing/carousel-switches-img.png", title:"SWITCHES"},
    {img: "./assets/images/landing/carousel-solutions-img.png", title:"SOFTWARE SOLUTIONS"}
    

  ];
  slideConfig = {
                  "slidesToShow": 4,
                  "slidesToScroll": 1,
                   "dots" :true,
                  "nextArrow":"<div class='nav-btn next-slide'></div>",
                  "prevArrow":"<div class='nav-btn prev-slide'></div>",
                  "infinite": false,
                  responsive: [{
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                }]
                 };

                 slickInit(e) {
                  // console.log('slick initialized');
                }
                
                breakpoint(e) {
                  // console.log('breakpoint');
                }
                
                afterChange(e) {
                  // console.log('afterChange');
                }
                
                beforeChange(e) {
                  // console.log('beforeChange');
                }
               
  
}
