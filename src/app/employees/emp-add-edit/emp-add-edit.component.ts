import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeService } from '../../employee.service';
import { FormControl } from '@angular/forms';
import { DepartmentService } from '../../services/department.service';
import { Department } from '../../models/department';
import { ReportingManager } from '../../models/reporting manager';
import { ManagerService } from '../../services/manager.service';
@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrl: './emp-add-edit.component.css'
})
export class EmpAddEditComponent implements OnInit {
  empForm: FormGroup;
  // toppings = new FormControl('');
  department: Department[] = [];
  reportingMangers: ReportingManager[] = [];
  skillList: string[] = ['Communication', 'Problem solving', 'Leadership', 'Critical thinking', 'Conflict resolution', 'Integrity'];
  constructor(
    private empService: EmployeeService,
    private depService: DepartmentService,
    private managerService: ManagerService,
    private dialogRef: MatDialogRef<EmpAddEditComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.empForm = this.formBuilder.group({
      code: ['',  { validators: [Validators.required , Validators.pattern('^(([A-Z])|#)[0-9]{3}(([0-9][A-Z]{2}|[A-Z]{2}.)[0-9]$)|(([0-9][A-Z]{2}|[A-Z]{2}.).[0-9]{2})$') ,Validators.pattern('^.{8}$|^.{10}$'),]}],
      // code: ['', Validators.required, Validators.pattern('([A-Z][A-Z])(#)')],
      firstName: ['', { validators: [Validators.required ,Validators.minLength(2)]}],
      middleName: ['', { validators: [Validators.required ,Validators.minLength(2)]}],
      lastName: ['', { validators: [Validators.required ,Validators.minLength(2)]}],
      grade: ['', Validators.required],
      department: ['', Validators.required],
      reportingManger: ['', Validators.required],
      basicSalary: ['', { validators: [Validators.required,Validators.min(0),Validators.max(100000)]}],
      houseRent: ['', { validators: [Validators.required,Validators.min(0),Validators.max(100000)]}],
      otherAllowance: ['',{ validators: [Validators.required,Validators.min(0),Validators.max(100000)]}],
      skills: ['', Validators.required],
      salaryPM: ['',{ validators: [Validators.required,Validators.min(0),Validators.max(100000)]}],
      salaryPA: ['', { validators: [Validators.required,Validators.min(0),Validators.max(1200000)]}],
    });
  }
  selectedDep = 1;
  selectedRM = 1;
  selectedSkills= [];
  ngOnInit(): void {
    this.empForm.patchValue(this.data);
    this.depService.getDepartmentList().subscribe({
      next: (val: any) => {
        console.log(val)
        this.department = val;
        this.selectedDep = this.data.department;
        this.selectedSkills = this.data.skills.split(',')

      },
      error: (err: any) => {
        console.error(err);
        alert("Error while updating the employee!");
      },
    })

    this.managerService.getDepartmentList().subscribe({
      next: (val: any) => {
        console.log(val)
        this.reportingMangers = val;
        this.selectedRM = this.data.reportingManger;

      },
      error: (err: any) => {
        console.error(err);
        alert("Error while updating the employee!");
      },
    })

  }

  onSubmit() {
    // debugger
    console.log(this.empForm.value);
    if (this.empForm.valid) {
      if (this.data) {
        this.empService
          .updateEmployee(this.data.id, this.empForm.value)
          .subscribe({
            next: (val: any) => {
              alert('Employee details updated!');
              this.dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
              alert("Error while updating the employee!");
            },
          });
      } else {
        this.empService.addEmployee(this.empForm.value).subscribe({
          next: (val: any) => {
            alert('Employee added successfully!');
            this.empForm.reset();
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
            alert("Error while adding the employee!");
          },
        });
      }
    }
  }
}

