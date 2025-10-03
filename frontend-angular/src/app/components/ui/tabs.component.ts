import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="className">
      <ng-content></ng-content>
    </div>
  `
})
export class TabsComponent {
  @Input() defaultValue: string = '';
  @Input() className: string = '';

  activeTab: string = '';

  ngOnInit() {
    this.activeTab = this.defaultValue;
  }

  setActiveTab(value: string) {
    this.activeTab = value;
  }

  isActive(value: string): boolean {
    return this.activeTab === value;
  }
}

@Component({
  selector: 'app-tabs-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="'inline-flex h-10 items-center justify-center rounded-md bg-gray-100 p-1 text-gray-600 ' + className">
      <ng-content></ng-content>
    </div>
  `
})
export class TabsListComponent {
  @Input() className: string = '';
}

@Component({
  selector: 'app-tabs-trigger',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      [class]="getClasses()"
      (click)="handleClick()"
    >
      <ng-content></ng-content>
    </button>
  `
})
export class TabsTriggerComponent {
  @Input() value: string = '';
  @Input() className: string = '';
  @Output() tabChange = new EventEmitter<string>();

  isActive: boolean = false;

  getClasses(): string {
    const baseClasses = 'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';
    const activeClasses = this.isActive ? 'bg-white text-gray-950 shadow-sm' : 'text-gray-600';

    return `${baseClasses} ${activeClasses} ${this.className}`;
  }

  handleClick() {
    this.tabChange.emit(this.value);
  }
}

@Component({
  selector: 'app-tabs-content',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="isActive" [class]="'mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 ' + className">
      <ng-content></ng-content>
    </div>
  `
})
export class TabsContentComponent {
  @Input() value: string = '';
  @Input() className: string = '';

  isActive: boolean = false;
}
