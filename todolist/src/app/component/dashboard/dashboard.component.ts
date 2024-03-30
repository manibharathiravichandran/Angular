import { Component } from '@angular/core';
import { Task } from 'src/app/model/task';
import { CrudService } from 'src/app/service/crud.service';
import * as uuid from 'uuid';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  taskObj: Task = new Task();
  task: Task = new Task();
  taskArr: Task[] = [];
  addTaskValue: string = '';
  editTaskValue:string="";
  constructor(private crudService: CrudService) {}
  ngOnInit() {
    this.editTaskValue="";
    this.addTaskValue="";
    this.taskObj = new Task();
    this.taskArr=[];
    this.getAllTask();
  }

  getAllTask() {
    this.crudService.getAllTask().subscribe(
      (resp: any) => {
        this.taskArr=resp;
      },
      (err) =>{
        alert("unable to get list of task");
      }
    );
  }

  addTask() {
    this.taskObj.task_name=this.addTaskValue;
    this.taskObj.id=uuid.v1();
    this.crudService.addTask(this.taskObj).subscribe(
      (resp) => {
        this.ngOnInit();
        this.addTaskValue=""
      },
      (err) => {
        alert(err);
      }
    );
  }

  editTask() {
    this.taskObj.task_name=this.editTaskValue;
    this.crudService.editTask(this.taskObj).subscribe(res=>{
      this.ngOnInit();
    },err=>{
      alert("failed to update");
    })
  }
  deleteTask(task:any){
    this.crudService.deleteTask(task).subscribe((resp)=>{
      this.ngOnInit();
    },err=>{
      alert("failed to delete task");
    })
  }
  call(task:Task){
    this.taskObj=task;
    this.editTaskValue=task.task_name;
  }
}
