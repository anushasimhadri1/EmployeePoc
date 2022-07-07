export class Employee {
    public empCode: string;
    public empName: string;
    public dob: Date;
    public doj: Date;
    public qualification: string;
    public managerCode: string;

    constructor(empCode: string, empName: string, dob: Date, doj: Date, qualification: string, managerCode: string) {
        this.empCode = empCode;
        this.empName = empName;
        this.dob = dob;
        this.doj = doj;
        this.qualification = qualification;
        this.managerCode = managerCode;
    }
}
