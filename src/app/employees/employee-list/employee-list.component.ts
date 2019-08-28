import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { Employee } from 'src/app/shared/employee.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Toast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
 list: Employee[];
  constructor(private service: EmployeeService, private firestore: AngularFirestore, private toastr: ToastrService) { }
  ngOnInit() {
    this.service.getEmployees().subscribe(listarray => {
      this.list = listarray.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as Employee;
      });
    });
  }

  onEdit(emp: Employee) {
    this.service.formData = Object.assign({}, emp);
  }

  onDelete(id: string) {
    if (confirm('Are sure to delete this document')) {
      this.firestore.doc('employee/' + id).delete();
      this.toastr.warning('Deleted Successfully', 'EMP Register')
    }
  }

}
