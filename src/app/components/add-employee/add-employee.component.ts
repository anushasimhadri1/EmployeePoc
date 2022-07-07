import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from 'src/app/models/employee';
import * as moment from 'moment';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {

  mode = "Add";
  qualifications = ['B.Tech', 'M.Tech', 'B.Sc', 'M.Sc', 'MBA']
  employeeForm: FormGroup = new FormGroup({});
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, public dialogRef: MatDialogRef<AddEmployeeComponent>,) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    let isEdit = this.data.type === 'edit';
    this.mode = this.data.type;
    let employee: Employee = this.data.employee;
    this.employeeForm = this.fb.group({
      empCode: [isEdit ? employee.empCode : '', [Validators.required, Validators.pattern("^[a-zA-Z0-9]{5}$")]],
      empName: [isEdit ? employee.empName : '', [Validators.required, Validators.pattern("^[a-zA-Z0-9 ]{1,100}$")]],
      dob: [isEdit ? employee.dob : '', [Validators.required, ageValidator]],
      doj: [isEdit ? employee.doj : '', [Validators.required, dojValidator]],
      qualification: [isEdit ? employee.qualification : ''],
      managerCode: [isEdit ? employee.managerCode : ''],
    });
  }

  addEmployee() {
    this.closeDialog(false);
  }

  closeDialog(close: boolean) {
    this.dialogRef.close({ event: 'close', data: this.employeeForm.valid ? this.employeeForm.value : undefined, type: this.mode, close: close });
  }

  public myError = (controlName: string, errorName: string) => {
    return this.employeeForm.controls[controlName].hasError(errorName);
  }


}


export function ageValidator(control: AbstractControl) {
  if (control.value) {
    const dob = moment(control.value);
    const age = moment(moment.now()).diff(dob, 'years');
    if (age < 21)
      return { age: true };
  }
  return null;
}

export function dojValidator(control: AbstractControl) {
  if (control.touched) {
    const doj = moment(control.value);
    const now = moment(moment.now())
    if (doj.isAfter(now)) { return { 'doj': true } }
  }

  return null
}