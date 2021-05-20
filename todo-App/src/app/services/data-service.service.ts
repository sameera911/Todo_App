import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


const options = {
  withCredentials: true
}
@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor(private http: HttpClient) { }

  getListLength(userName:any){
    return this.http.get(environment.apiUrl+"/getListLength/"+userName)
  }

  getTodoList(userName:any){
    return this.http.get(environment.apiUrl+"/getTodoList/"+userName)
  }
  getDoneList(userName:any){
    return this.http.get(environment.apiUrl+"/getDoneList/"+userName)
  }

  login(userName: any, password: any) {
    const data = {
      userName,
      password
    }
    return this.http.post(environment.apiUrl + "/userLogin", data, options)
  }

  removeItem(userName,task){
    // const data = {
    //   userName,
    //   task
    // }
  //  alert(task);
    return this.http.delete(environment.apiUrl + "/removeItem/"+task);
  }

  userRegister(fullName, userName, password, gender, dob, address, phoneNo, email) {
    const data = {
      fullName,
      userName,
      password,
      gender,
      dob,
      address,
      phoneNo,
      email
    }
    return this.http.post(environment.apiUrl + "/userRegister", data)
  }

  addItem(order,userName,task,status){
    const data={
      order,
      userName,
      task,
      status
    }
    console.log(data);
    
   return this.http.post(environment.apiUrl+"/addItem",data,options);
  }

  updateItem(task){
      const data={
      order:task.order,
      userName:task.userName,
      task:task.task,
      status:task.status
    }
    //console.log(data);
    
    return this.http.put(environment.apiUrl+"/updateItem/"+task.userName,data,options);
  }

}
