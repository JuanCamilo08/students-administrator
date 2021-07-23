import { Component } from '@angular/core';
import { parse } from 'fast-xml-parser';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Student } from './student-card/student-card.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  form = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50)
    ]),
    lastname: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(70)
    ]),
    age: new FormControl('', Validators.required),
    file: new FormControl(),
  })

  get name() {
    return this.form.get('name')
  }
  get lastname() {
    return this.form.get('lastname')
  }

  get age() {
    return this.form.get('age')
  }

  students: Student[] = [];
    
  uploadFile($event?: any) {
    const reader = new FileReader();

    reader.onload = (ev) => {
      const xml = <string>ev.target?.result;
      const result = parse(xml);
      this.students.unshift(...result.students.student);
    }

    reader.readAsText($event.target.files[0])
    $event.target.value = '';
  }

  postStudent() {
    const { name, lastname, age } = this;

    this.students.unshift({
      name: name?.value,
      lastname: lastname?.value,
      age: age?.value
    })
    
    this.form.reset();
  }
}
