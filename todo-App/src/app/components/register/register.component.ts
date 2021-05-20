import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, Routes } from '@angular/router';
import { DataServiceService} from '../../services/data-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router, private user: DataServiceService, private fb: FormBuilder) { }

  custName: '';
  userName: '';
  password: '';
  gender: '';
  dob: '';
  address: '';
  phoneNo: '';
  email: '';
  registerForm = this.fb.group(
    {
      custName: ['', [Validators.required]],
      userName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(10), Validators.pattern('[a-zA-Z0-9]*')]],
      password: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
      gender: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      address: ['', [Validators.required]],
      phoneNo: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      email: ['', [Validators.required]]
    }
  );
  ngOnInit(): void {
  }
  userRegister() {
  
    if(this.registerForm.valid)
    {
        var custname = this.registerForm.value.custName;  
        var username = this.registerForm.value.userName;
        var upwd = this.registerForm.value.password;
        var gender = this.registerForm.value.gender;
        var dob = this.registerForm.value.dob;
        var address = this.registerForm.value.address;
        var phoneno = this.registerForm.value.phoneNo;
        var email = this.registerForm.value.email;
        this.user.userRegister(custname,username,upwd,gender,dob,address,phoneno,email)
        .subscribe((data:any)=>{
          if(data){
            alert(data.message);
            this.router.navigateByUrl('');
          }
        },(data)=>{
          alert(data.error.message);
        })
       
      }
      else
      {
        alert("Invalid Forms");
      }

}

gotoLogin(){
  this.router.navigateByUrl("");
}
}
