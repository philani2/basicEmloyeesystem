import { Injectable } from '@angular/core';
import { Employee } from './employee.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  formData: Employee;
  constructor(private firebase: AngularFirestore) { }

  getEmployees()  {
    return this.firebase.collection('employee').snapshotChanges();
  }
}


