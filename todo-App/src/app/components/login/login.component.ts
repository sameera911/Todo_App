import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {Router,Routes} from '@angular/router';
import {DataServiceService} from '../../services/data-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router,private user:DataServiceService, private fb:FormBuilder) { }

  userName:'';
  password:'';
  loginForm=this.fb.group(
    {
    userName:['',[Validators.required,Validators.minLength(4),Validators.maxLength(10),Validators.pattern('[a-zA-Z0-9]*')]],
    password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
    }
  );

  ngOnInit(): void {
  }

  login()
  { 
      if(this.loginForm.valid)
      {
            
          var username = this.loginForm.value.userName;
          var upwd = this.loginForm.value.password;
          this.user.login(username,upwd)
          .subscribe((data:any)=>{
            if(data){
              alert(data.message);
              localStorage.setItem("username",data.userName);
              localStorage.setItem("name",data.fullName);
              this.router.navigateByUrl('todoHome');
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

}
