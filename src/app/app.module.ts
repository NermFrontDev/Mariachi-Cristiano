import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FooterComponent } from './components/footer/footer.component';
import { GalleryLightboxComponent } from './components/gallery-lightbox/gallery-lightbox.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { IntersectionObserverDirective } from './directives/intersection.directive';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PhoneFormatterDirective } from './directives/phone-formatter.directive';
import { PhotoGalleryModule } from '@twogate/ngx-photo-gallery';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    GalleryLightboxComponent,
    HomeComponent,
    IntersectionObserverDirective,
    NavbarComponent,
    SidebarComponent,
    PhoneFormatterDirective,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    PhotoGalleryModule.forRoot({ defaultOptions: { showHideOpacity: true } }),
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    RecaptchaModule,
    RecaptchaFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
