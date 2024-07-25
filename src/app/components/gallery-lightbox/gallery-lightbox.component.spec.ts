import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryLightboxComponent } from './gallery-lightbox.component';

describe('GalleryLightboxComponent', () => {
  let component: GalleryLightboxComponent;
  let fixture: ComponentFixture<GalleryLightboxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GalleryLightboxComponent]
    });
    fixture = TestBed.createComponent(GalleryLightboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
