import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[underline]',
})
export class underlineDirective {
  @HostBinding('class') scaleSize: string;
  @Input() colors: any;

  constructor(private element: ElementRef, private renderer: Renderer2) {
    this.element.nativeElement.style.textDecoration = 'underline';
    this.renderer.setStyle(
      this.element.nativeElement,
      'color',
      this.colors.noHoverColor
    );
    this.scaleSize = 'noScale';
    this.colors = {
      hoverColor: 'blue',
      noHoverColor: '#999',
    };
  }

  @HostListener('mouseover') onHover() {
    this.renderer.setStyle(
      this.element.nativeElement,
      'color',
      this.colors.hoverColor
    );
    this.scaleSize = 'scale';
  }

  @HostListener('mouseout') onMouseOut() {
    this.renderer.setStyle(
      this.element.nativeElement,
      'color',
      this.colors.noHoverColor
    );
    this.scaleSize = 'noScale';
  }
}
