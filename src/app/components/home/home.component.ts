import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

interface Item {
  imageSrc: string;
  imageAlt: string;
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
  imgUrl: string = 'assets/images/home/img-gallery';

  data: Item[] = [
    {
      imageSrc: `${this.imgUrl}/img_1.png`,
      imageAlt: '1'
    },
    {
      imageSrc: `${this.imgUrl}/img_2.png`,
      imageAlt: '2'
    },
    {
      imageSrc: `${this.imgUrl}/img_3.png`,
      imageAlt: '3'
    },
    {
      imageSrc: `${this.imgUrl}/img_4.png`,
      imageAlt: '4'
    },
    {
      imageSrc: `${this.imgUrl}/img_5.png`,
      imageAlt: '5'
    }
  ]

}
