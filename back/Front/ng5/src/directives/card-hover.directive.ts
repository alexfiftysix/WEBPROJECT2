import { Directive, ElementRef, HostListener, Renderer, HostBinding } from '@angular/core';

@Directive({
  selector: '[appCardHover]'
})
export class CardHoverDirective {
  // @HostBinding() private isHovering = false;
  constructor( private element: ElementRef, private renderer: Renderer) {
   renderer.setElementStyle(element.nativeElement, 'box-shadow', 'none');
   }

   @HostListener('mouseenter') cardMouseEnter() {
  this.renderer.setElementStyle(this.element.nativeElement, 'box-shadow',
  '0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12)');
  // this.isHovering = true;
   }
   @HostListener('mouseleave') cardMouseLeave() {
    this.renderer.setElementStyle(this.element.nativeElement, 'box-shadow', 'none');
    // this.isHovering = false;
     }
}
