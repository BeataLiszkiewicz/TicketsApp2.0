import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHoverOpacity]',
})
export class HoverOpacityDirective {
  @HostListener('mouseover') focus() {
    this.transparency('0.3');
  }
  @HostListener('mouseleave') blur(){
    this.transparency('1')
  }

  constructor(private el: ElementRef) {}

  private transparency(opacity: string) {
    this.el.nativeElement.style.opacity = opacity;
  }
}
