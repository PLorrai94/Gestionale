import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <h1>Reports Dashboard</h1>
      <p>This page will contain charts and reports for business analytics.</p>
      <p>Under construction.</p>
    </div>
  `,
  styles: []
})
export class ReportsComponent {}
