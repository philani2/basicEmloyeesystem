import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { Employee } from 'src/app/shared/employee.model';
import { NgForm } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(public employeeService: EmployeeService, private firestore: AngularFirestore, private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }


  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this.employeeService.formData = {
      id: null,
      fullname: '',
      position: '',
      empCode: '',
      mobile: ''
    };

  }

  onSubmit(form: NgForm) {
    const storeData = Object.assign({}, form.value);
    delete storeData.id;
    if (form.value.id == null) {
      this.firestore.collection('employee').add(storeData);
      this.toastr.success('Submited successfully', 'EMP Registed');

    } else {
      this.firestore.doc('employee/' + form.value.id).update(storeData);
      this.toastr.success('Update Successfully', 'EMP Register');
    }
    this.resetForm(form);
  }

}
