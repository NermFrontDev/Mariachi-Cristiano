import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

interface GalleryPhoto {
  src: string;
  alt: string;
  size: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  @Output() sectionVisible = new EventEmitter<{ sectionId: string, isVisible: boolean }>();

  onSectionVisible(sectionId: string, isVisible: boolean): void {
    this.sectionVisible.emit({ sectionId, isVisible });
  }

  recaptchaResponse: string | null = null;

  resolved(captchaResponse: string | null) {
    this.recaptchaResponse = captchaResponse;
    if (captchaResponse) {
      console.log(`Resolved captcha with response: ${captchaResponse}`);
    } else {
      console.log('Captcha response is null');
    }
  }

  contactForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router) {}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      fullName: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{3} [0-9]{3} [0-9]{4}$/)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required]]
    });

    this.photos = this.shuffle(this.photos).slice(0, 20);
  }

  private shuffle<T>(items: T[]): T[] {
    const result = [...items];

    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }

    return result;
  }

  onSubmit(): void {
    if (this.contactForm.valid && this.recaptchaResponse) {
      const formValue = this.contactForm.value;

      const templateParams = {
        fullName: formValue.fullName,
        phone: formValue.phone,
        email: formValue.email,
        message: formValue.message
      };

      emailjs.send('service_t918cwc', 'template_r1o3zlg', templateParams, 'UYVWrR-1uLhfGT8LJ')
        .then((result: EmailJSResponseStatus) => {
          console.log('Correo enviado:', result.text);
        }, (error) => {
          console.log('Error al enviar el correo:', error.text);
        });
    } else {
      console.log('Formulario no válido o el reCaptcha no fué valido');
    }

    //reset form
    this.onReset();

  }

  onReset() {
    this.contactForm.reset();
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 2000);
  }
  imgUrl: string = 'assets/images/gallery';

  photos: GalleryPhoto[] = [
    { src: `${this.imgUrl}/img_1.webp`, alt: 'Foto 1', size: 'tall' },
    { src: `${this.imgUrl}/img_2.webp`, alt: 'Foto 2', size: 'wide' },
    { src: `${this.imgUrl}/img_3.webp`, alt: 'Foto 3', size: 'normal' },
    { src: `${this.imgUrl}/img_4.webp`, alt: 'Foto 4', size: 'big' },
    { src: `${this.imgUrl}/img_5.webp`, alt: 'Foto 5', size: 'normal' },
    { src: `${this.imgUrl}/img_6.webp`, alt: 'Foto 6', size: 'tall' },
    { src: `${this.imgUrl}/img_7.webp`, alt: 'Foto 7', size: 'normal' },
    { src: `${this.imgUrl}/img_8.webp`, alt: 'Foto 8', size: 'wide' },
    { src: `${this.imgUrl}/img_9.webp`, alt: 'Foto 9', size: 'normal' },
    { src: `${this.imgUrl}/img_10.webp`, alt: 'Foto 10', size: 'big' },
    { src: `${this.imgUrl}/img_11.webp`, alt: 'Foto 11', size: 'normal' },
    { src: `${this.imgUrl}/img_12.webp`, alt: 'Foto 12', size: 'tall' },
    { src: `${this.imgUrl}/img_13.webp`, alt: 'Foto 13', size: 'normal' },
    { src: `${this.imgUrl}/img_14.webp`, alt: 'Foto 14', size: 'wide' },
    { src: `${this.imgUrl}/img_15.webp`, alt: 'Foto 15', size: 'normal' },
    { src: `${this.imgUrl}/img_16.webp`, alt: 'Foto 16', size: 'big' },
    { src: `${this.imgUrl}/img_17.webp`, alt: 'Foto 17', size: 'normal' },
    { src: `${this.imgUrl}/img_18.webp`, alt: 'Foto 18', size: 'tall' },
    { src: `${this.imgUrl}/img_19.webp`, alt: 'Foto 19', size: 'normal' },
    { src: `${this.imgUrl}/img_20.webp`, alt: 'Foto 20', size: 'wide' }
  ];

  /* Contact Info */
  emailMariachi: string = 'davidhernandezmesinas79@gmail.com';
  phoneMariachi: string = '951-161-7127';
  addressMariachi: string = 'Priv. Reforma 103 Presidente Juarez, Oaxaca de Juarez, Oaxaca C.P. 68146';

}
