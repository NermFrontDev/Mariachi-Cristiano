import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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

  contactForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      fullName: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{3} [0-9]{3} [0-9]{4}$/)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      console.log('Form Data:', this.contactForm.value);
      // Aquí puedes manejar la lógica de envío de datos
    } else {
      console.log('Form not valid');
    }
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
