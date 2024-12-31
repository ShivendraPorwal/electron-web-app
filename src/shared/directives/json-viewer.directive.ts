import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import { ForceAny } from '@shared/typescript';

@Directive({
  selector: '[appJsonViewer]',
})
export class JsonViewerDirective implements OnChanges {
  @Input('appJsonViewer') jsonData: ForceAny; // Input to accept JSON data

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['jsonData']) {
      this.renderJson();
    }
  }

  private renderJson(): void {
    if (!this.jsonData) {
      this.el.nativeElement.innerHTML = 'No data available';
      return;
    }

    const formattedJson = JSON.stringify(this.jsonData, null, 2); // Pretty print JSON
    const preElement = this.renderer.createElement('pre');
    preElement.style.background = '#f4f4f4';
    preElement.style.padding = '10px';
    preElement.style.border = '1px solid #ddd';
    preElement.style.borderRadius = '5px';
    preElement.style.overflowX = 'auto';

    const textNode = this.renderer.createText(formattedJson);
    this.renderer.appendChild(preElement, textNode);
    this.el.nativeElement.innerHTML = ''; // Clear previous content
    this.renderer.appendChild(this.el.nativeElement, preElement);
  }
}
