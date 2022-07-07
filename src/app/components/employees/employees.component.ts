import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
  displayedColumns: string[] = ['empCode', 'empName', 'dob', 'doj', 'qualification', 'managerCode', 'actions'];
  employees: Employee[] = ELEMENT_DATA;
  dataSource = new MatTableDataSource(this.employees);

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  openDelete(employee: Employee) {
    const dialogRef = this.dialog.open(DeleteDialog);
    dialogRef.afterClosed().subscribe(res => {
      console.log("value from dialog", res) //data from dialog
      if (!res.close) {
        var emps = this.employees.filter(ele => ele.empCode !== employee.empCode)
        this.employees = emps;
        this.dataSource = new MatTableDataSource(this.employees);
      }
    });
  }

  openEdit(employee: Employee) {
    this.openDailog('edit', employee)
  }

  addEmployee() {
    this.openDailog('add', null);
  }

  openDailog(type: string, data: any) {
    const dialogRef = this.dialog.open(AddEmployeeComponent, {
      data: { "employee": data, type: type }
    });
    dialogRef.afterClosed().subscribe(res => {
      console.log("value from dialog", res) //data from dialog
      if (!res.close && res.data) {
        if (res.type === 'add') {
          this.employees.push(res.data);
        } else {
          var foundIndex = this.employees.findIndex(ele => ele.empCode === res.data.empCode)
          this.employees[foundIndex] = res.data;
        }
        this.dataSource = new MatTableDataSource(this.employees);
      }
    });
  }

}
const ELEMENT_DATA: Employee[] = [
  new Employee("HRC01", "Ashok", new Date("01/01/1993"), new Date("10/10/2021"), "B.Tech", ""),
  new Employee("HRC02", "Ashok", new Date("01/01/1993"), new Date("10/10/2021"), "B.Tech", ""),
  new Employee("HRC03", "Ashok", new Date("01/01/1993"), new Date("10/10/2021"), "B.Tech", ""),
  new Employee("HRC04", "Ashok", new Date("01/01/1993"), new Date("10/10/2021"), "B.Tech", ""),
  new Employee("HRC05", "Ashok", new Date("01/01/1993"), new Date("10/10/2021"), "B.Tech", ""),];

@Component({
  selector: 'dialog-animations-example-dialog',
  template: `
    <h2>Delete</h2>
    <p>Once deleted you can not get back the data, would you like to proceed with deletion?</p>
    <button style="margin-right:10px" mat-raised-button color="primary"(click)="closeDialog(true)">Cancel</button>
    <button mat-raised-button color="primary" (click)="closeDialog(false)" >Ok</button>
    `,

})
export class DeleteDialog {
  constructor(public dialogRef: MatDialogRef<DeleteDialog>) { }
  closeDialog(close: boolean) {
    this.dialogRef.close({ event: 'close', close: close });
  }
}


