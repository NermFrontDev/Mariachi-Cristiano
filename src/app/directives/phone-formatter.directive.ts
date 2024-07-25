import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appPhoneFormatter]'
})
export class PhoneFormatterDirective {

  private regex: RegExp = new RegExp(/^\d{0,3}\s?\d{0,3}\s?\d{0,4}$/g);
  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home'];

  constructor(private el: ElementRef) { }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    // Allow special keys
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }

    // Prevent default if input doesn't match regex
    const current: string = this.el.nativeElement.value;
    const next: string = current.concat(event.key);
    if (next && !String(next).match(this.regex)) {
      event.preventDefault();
    }
  }

  @HostListener('input', ['$event'])
  onInput(event: KeyboardEvent) {
    const input = this.el.nativeElement;
    const formatted = this.formatPhone(input.value);
    input.value = formatted;
  }

  private formatPhone(value: string): string {
    const cleanValue = value.replace(/\D/g, ''); // Remove non-numeric characters
    const match = cleanValue.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);

    if (match) {
      return !match[2] ? match[1] : `${match[1]} ${match[2]}${match[3] ? ' ' + match[3] : ''}`;
    }

    return value;
  }
}
