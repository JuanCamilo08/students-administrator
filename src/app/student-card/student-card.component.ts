import { Component, Input } from '@angular/core';

export interface Student {
  name: string,
  lastname: string,
  age: number,
  documentLink?: string
}

@Component({
  selector: 'app-student-card',
  template: `
  <div class="card student-card" *ngIf="student">
    <div class="card-body">
      <h5>{{ student.name | titlecase }} {{ student.lastname | titlecase }}</h5>
      <p>Edad: {{ student.age }} a&ntilde;os</p>
      <a
        [href]="student.documentLink ?? ''"
        class="btn btn-decargar"
        [class]="student.documentLink ? '' : 'disabled'">
        Descargar CV
      </a>
    </div>
  </div>
  `,
  styleUrls: ['./student-card.component.css']
})
export class StudentCardComponent {
  @Input('student') student?: Student;
}

