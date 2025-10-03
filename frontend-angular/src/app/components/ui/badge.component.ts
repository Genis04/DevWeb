import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="getClasses()">
      <ng-content></ng-content>
    </div>
  `
})
export class BadgeComponent {
  @Input() variant: 'default' | 'outline' = 'default';
  @Input() className: string = '';

  getClasses(): string {
    const baseClasses = 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors';

    const variantClasses = {
      default: 'bg-blue-100 text-blue-800',
      outline: 'border border-gray-300 text-gray-700'
    };

    return `${baseClasses} ${variantClasses[this.variant]} ${this.className}`;
  }
}
