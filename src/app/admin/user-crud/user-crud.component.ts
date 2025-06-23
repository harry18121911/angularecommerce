import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { User } from '../../core/Model/object-model';
import { HttpParams } from '@angular/common/http';
import { toggleVisibilityService } from '../../service/toggle-visibility.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-crud',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './user-crud.component.html',
  styleUrl: './user-crud.component.css'
})
export class UserCrudComponent implements OnInit {
  all_user_data: User[] = [];
  single_user_data: User = new User;
  addEditUserForm: FormGroup = new FormGroup({
    name: new FormControl(""),
    password: new FormControl(""),
    email: new FormControl(""),
  });
  user_dto: User = new User;
  user_reg_data: User = new User;
  upload_file_name: string = "";
  addEditUser: boolean = false;
  add_user: boolean = false;
  edit_user: boolean = false;
  popup_header: string = "";
  signInFormValue: User = new User;
  ;

  constructor(private formBuilder: FormBuilder, private router: Router, private adminService: AdminService, private toggleVisibilityService:toggleVisibilityService) {
    this.isVisible$ = this.toggleVisibilityService.isVisible$; // ✅ Now it's safe
  }

  ngOnInit(): void {
    this.addEditUserForm = this.formBuilder.group({
      id: ["", Validators.required],
      name: ["", Validators.required],
      uploadPhoto: ["", Validators.required],
      role: ["", Validators.required],
      password: ["", Validators.required],
      number: ["", Validators.required],
      address: ["", Validators.required],
      gender: ["", Validators.required],
      language: ["", Validators.required],
      email: ["", Validators.required],
      dateOfBirth: ["", Validators.required],
      agreetc: ["", Validators.required],
      age: ["", Validators.required],
      aboutYou: ["", Validators.required],
    })

    this.getAllUser()
  }

  get rf() {
    return this.addEditUserForm.controls;
  }

  getAllUser() {
    this.adminService.allUser().subscribe(data => {
      this.all_user_data = data as User[];
      console.log(this.all_user_data);
    }
    )
  }


  addUserPopup() {
    this.edit_user = false;
    this.add_user = true;
    this.popup_header = "Add New User";
    this.addEditUserForm.reset();
  }

  addUser() {
    this.addEditUser = true;
    if (this.addEditUserForm.invalid) {
      alert("Error!!! " + JSON.stringify(this.addEditUserForm.value))
    }
    this.user_reg_data = this.addEditUserForm.value;
    this.user_dto = {
      id: this.user_reg_data.id,
      aboutYou: this.user_reg_data.aboutYou,
      age: this.user_reg_data.age,
      agreetc: this.user_reg_data.agreetc,
      dateOfBirth: this.user_reg_data.dateOfBirth,
      email: this.user_reg_data.email,
      gender: this.user_reg_data.gender,
      address: this.user_reg_data.address,
      language: this.user_reg_data.language,
      number: this.user_reg_data.number,
      name: this.user_reg_data.name,
      uploadPhoto: this.user_reg_data.uploadPhoto,
      role: this.user_reg_data.role,
      password: this.user_reg_data.password
    }
    this.adminService.addUser(this.user_dto).subscribe(data => {
      this.getAllUser();
      // Change for Tailwind equivalent
      // JQuery("#addEditUserModal").modal("toggle")
    }
    )
  }
  editUserPopout(id:HttpParams) {
    this.edit_user = true;
    this.add_user = false;
    this.popup_header = "Edit User";
    this.adminService.singleUser(id).subscribe((data: Object) => {
      console.log("This is data  " + JSON.stringify(data))
      this.single_user_data = data as User;
      console.log("Admin singleUser edit")
      console.log(id);
      console.log("This should tell one user " + JSON.stringify(this.single_user_data));
      this.upload_file_name = "";
      console.log("This is user address " + JSON.stringify(this.single_user_data.address))
      this.addEditUserForm.setValue({
        id:id,
        name: this.single_user_data.name,
        age: this.single_user_data.age,
        email:this.single_user_data.email,
        dateOfBirth: this.single_user_data.dateOfBirth,
        password: this.single_user_data.password,
        gender: this.single_user_data.gender,
        uploadPhoto: this.upload_file_name,
        address: this.single_user_data.address,
        aboutYou: this.single_user_data.aboutYou,
        number: this.single_user_data.number,
        language: this.single_user_data.language,
        agreetc: this.single_user_data.agreetc,
        role: this.single_user_data.role,
      })
    })
  }

  updateUser(id:string) {
    let user_id = new HttpParams;
    user_id.set('id',id);
    if (this.addEditUserForm.invalid) {
      alert("Error!!! " + JSON.stringify(this.addEditUserForm.value))
    }
    this.user_reg_data = this.addEditUserForm.value;
    this.user_dto = {
      id: this.user_reg_data.id,
      aboutYou: this.user_reg_data.aboutYou,
      age: this.user_reg_data.age,
      agreetc: this.user_reg_data.agreetc,
      dateOfBirth: this.user_reg_data.dateOfBirth,
      email: this.user_reg_data.email,
      gender: this.user_reg_data.gender,
      address: this.user_reg_data.address,
      language: this.user_reg_data.language,
      number: this.user_reg_data.number,
      name: this.user_reg_data.name,
      uploadPhoto: (this.user_reg_data.uploadPhoto == "" ? this.upload_file_name:this.user_reg_data.uploadPhoto),
      role: this.user_reg_data.role,
      password: this.user_reg_data.password
    }
    this.adminService.editUser(user_id, this.user_dto).subscribe(data => {
      this.getAllUser();
      // Change for Tailwind equivalent
      // JQuery("#addEditUserModal").modal("toggle")
    }
    )
  }

  deleteUser(id:string){
    let user_id = new HttpParams;
    user_id.set('id',id)
    this.adminService.deleteUser(user_id).subscribe(data=>{
      this.getAllUser();
    })

  }

  // Visibility funtions
  isVisible$: Observable<boolean>;
  toggleVisibility():void {
    this.toggleVisibilityService.toggleVisibility(); // Toggle the boolean value
  }
}



