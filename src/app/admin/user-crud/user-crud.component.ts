import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { User } from '../../core/Model/object-model';
import { toggleVisibilityService } from '../../service/toggle-visibility.service';

@Component({
  selector: 'app-user-crud',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './user-crud.component.html',
  styleUrl: './user-crud.component.css'
})
export class UserCrudComponent implements OnInit {
  all_user_data: User[] = [];
  single_user_data: User = new User;
  addEditUserForm: FormGroup = new FormGroup({
    id: new FormControl(""),
    name: new FormControl(""),
    password: new FormControl(""),
    email: new FormControl(""),
    uploadPhoto: new FormControl(""),
    role: new FormControl(""),
    number: new FormControl(0),
    address: new FormControl(""),
    gender: new FormControl(""),
    language: new FormControl(""),
    dateOfBirth: new FormControl(""),
    agreetc: new FormControl(false),
    age: new FormControl(0),
    aboutYou: new FormControl(""),
  });
  user_dto: User = new User;
  user_reg_data: User = new User;
  upload_file_name: string = "";
  addEditUser: boolean = false;
  add_user: boolean = false;
  edit_user: boolean = false;
  popup_header: string = "";
  signInFormValue: User = new User;

  constructor(private formBuilder: FormBuilder, private router: Router, private adminService: AdminService, private toggleVisibilityService: toggleVisibilityService) {
  }

  ngOnInit(): void {
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
    this.addEditUserForm.reset(
      {
        id: "",
        name: "",
        uploadPhoto: "",
        role: "",
        password: "",
        number: 0,
        address: "",
        gender: "",
        language: "",
        email: "",
        dateOfBirth: "",
        agreetc: false,
        age: 0,
        aboutYou: ""
      }
    );
  }

  addUser() {
    this.addEditUser = true;

    if (this.addEditUserForm.invalid) {
      console.warn('Form is invalid. Listing control errors:');
      Object.keys(this.addEditUserForm.controls).forEach(key => {
        const controlErrors = this.addEditUserForm.get(key)?.errors;
        if (controlErrors) {
          console.warn(`Control: ${key}, Errors:`, controlErrors);
        }
      });
      return;
    }

    this.user_reg_data = this.addEditUserForm.value;
    this.user_dto = {
      id: (this.all_user_data.length +1).toString(),
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

    console.log("THIS IS USERDTO " + this.user_dto)
    this.adminService.addUser(this.user_dto).subscribe(data => {
      this.getAllUser();
      // Change for Tailwind equivalent
      // JQuery("#addEditUserModal").modal("toggle")
    }
    )
  }
  editUserPopout(id: string) {
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
        id: id,
        name: this.single_user_data.name,
        age: this.single_user_data.age,
        email: this.single_user_data.email,
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


  updateUser(id: string) {
    if (this.addEditUserForm.invalid) {
      console.warn('Form is invalid. Listing control errors:');
      Object.keys(this.addEditUserForm.controls).forEach(key => {
        const controlErrors = this.addEditUserForm.get(key)?.errors;
        if (controlErrors) {
          console.warn(`Control: ${key}, Errors:`, controlErrors);
        }
      });
      return;
    }

    this.user_reg_data = this.addEditUserForm.value;
    this.user_dto = {
      id: this.user_reg_data.id.toString(),
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
      uploadPhoto: (this.user_reg_data.uploadPhoto == "" ? this.upload_file_name : this.user_reg_data.uploadPhoto),
      role: this.user_reg_data.role,
      password: this.user_reg_data.password
    }

    this.adminService.editUser(id, this.user_dto).subscribe(data => {
      console.log("This should show the values of this.user_dto " + JSON.stringify(this.user_dto))
      this.getAllUser();
      // Change for Tailwind equivalent
      // JQuery("#addEditUserModal").modal("toggle")
    }
    )
  }

  deleteUser(id: string) {
    console.log("User crud component id: " + id)
    this.adminService.deleteUser(id).subscribe(data => {
      this.getAllUser();
    })

  }


  isVisible$ = false;
  toggleVisibility() {
    console.log(this.isVisible$)
    this.isVisible$ = this.toggleVisibilityService.toggleVisibility(this.isVisible$);
    console.log(this.isVisible$)
  }
}



