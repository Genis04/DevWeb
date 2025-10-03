import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-label',
  standalone: true,
  imports: [CommonModule],
  template: `
    <label
      [htmlFor]="htmlFor"
      [class]="'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ' + className"
    >
      <ng-content></ng-content>
    </label>
  `
})
export class LabelComponent {
  @Input() htmlFor: string = '';
  @Input() className: string = '';
}
