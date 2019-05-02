import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { MatComponentsModule } from './mat-components/mat-components.module';
import { LandingComponent } from './landing/landing.component';

import { TabsModule } from 'ngx-bootstrap/tabs';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NguCarouselModule } from '@ngu/carousel';
import 'hammerjs';
import { MyCarouselComponent } from './my-carousel/my-carousel.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { SearchResultsComponent } from './search-results/search-results.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    AppComponent,    
    LandingComponent, HeaderComponent, FooterComponent, MyCarouselComponent, SearchResultsComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatComponentsModule,
    CarouselModule.forRoot(),
    TabsModule.forRoot(),
    NguCarouselModule,
    SlickCarouselModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
