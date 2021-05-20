import { Component, OnInit} from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { DataServiceService } from '../../services/data-service.service';
import { Router, Routes } from '@angular/router';

@Component({
  selector: 'app-todo-home',
  templateUrl: './todo-home.component.html',
  styleUrls: ['./todo-home.component.css']
})
export class TodoHomeComponent implements OnInit {

  todo = [];
  done = [];
  userName = "";
  Name = "";
  listlen = "";

  constructor(private dataservice: DataServiceService, private router: Router) { }

  ngOnInit(): void {
    this.userName = localStorage.getItem("username");
    this.Name = localStorage.getItem("name");
    // alert(this.userName);
    this.dataservice.getListLength(this.userName).subscribe((data: any) => {
      if (data) {
        this.listlen = data.length;
        localStorage.setItem("tasklistlength", this.listlen);
      }
    })

    this.dataservice.getTodoList(this.userName).subscribe((data: any) => {
      if (data) {
        // alert(data.message);
        this.todo = data.todo;
        // var len = this.todo.length;
        //alert(len);
      }
    }), (data) => {
      alert(data.error.message);
    }

    this.dataservice.getDoneList(this.userName).subscribe((data: any) => {
      if (data) {
        //alert(data.message);
        //alert(data.done);
        this.done = data.done;
      }
    }), (data) => {
      alert(data.error.message);

    }

  }

  drag(event: CdkDragDrop<any[]>) {

    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex);
        var item = event.container.data[event.currentIndex];
        // console.log(item);
        // console.log(event.currentIndex);
        
        
    }

    else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      //console.log(event.container.data[event.currentIndex]);

      var item = event.container.data[event.currentIndex];
      //var itemord = event.currentIndex + 1;
       console.log(item);
      this.dataservice.updateItem(item).subscribe((data: any) => {
        if (data) {
          console.log(data);

          alert(data.message);
        }
      }), (data) => {
        alert(data.error.message);
      }
    }
   
   
  }

  removeItem(task){
    //console.log(task);
    this.dataservice.removeItem(this.userName,task).subscribe((data: any) => {
      if (data) {
        console.log(data);

        alert(data.message);
      }
    }), (data) => {
      alert(data.error.message);

    }
    window.location.reload();
  }


  addTask(task) {
    //console.log(task.task);
    var len = localStorage.getItem("tasklistlength");
    var order = Number(len) + 1;
  
    var status = "todo";
    var task = task.task;
    this.dataservice.addItem(order, this.userName, task, status).subscribe((data: any) => {
      if (data) {
        console.log(data);

        alert(data.message);
      }
    }), (data) => {
      alert(data.error.message);

    }
    window.location.reload();
    // this.dataservice.getTodoList(this.userName).subscribe((data: any) => {
    //   if (data) {
    //     this.todo = data.todo;
    //   }
    // }), (data) => {
    //   alert(data.error.message);
    // }
  }

  gotoRegister(){
    this.router.navigateByUrl("register");
  }
}
