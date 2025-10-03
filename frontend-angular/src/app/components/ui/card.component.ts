import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="'rounded-lg border bg-white shadow-sm ' + className">
      <ng-content></ng-content>
    </div>
  `
})
export class CardComponent {
  @Input() className: string = '';
}

@Component({
  selector: 'app-card-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="'flex flex-col space-y-1.5 p-6 ' + className">
      <ng-content></ng-content>
    </div>
  `
})
export class CardHeaderComponent {
  @Input() className: string = '';
}

@Component({
  selector: 'app-card-title',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h3 [class]="'text-2xl font-semibold leading-none tracking-tight ' + className">
      <ng-content></ng-content>
    </h3>
  `
})
export class CardTitleComponent {
  @Input() className: string = '';
}

@Component({
  selector: 'app-card-description',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p [class]="'text-sm text-gray-600 ' + className">
      <ng-content></ng-content>
    </p>
  `
})
export class CardDescriptionComponent {
  @Input() className: string = '';
}

@Component({
  selector: 'app-card-content',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="'p-6 pt-0 ' + className">
      <ng-content></ng-content>
    </div>
  `
})
export class CardContentComponent {
  @Input() className: string = '';
}
