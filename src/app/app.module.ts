import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FooterComponent } from './components/footer/footer.component';
import { GalleryLightboxComponent } from './components/gallery-lightbox/gallery-lightbox.component';
import { HomeComponent } from './components/home/home.component';
import { IntersectionObserverDirective } from './directives/intersection.directive';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PhotoGalleryModule } from '@twogate/ngx-photo-gallery';
import { ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { PhoneFormatterDirective } from './directives/phone-formatter.directive';

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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
