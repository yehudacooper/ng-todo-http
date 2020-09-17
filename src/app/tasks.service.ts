import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TasksService {

  arrTask:BehaviorSubject<any> = new BehaviorSubject(null);
  constructor(private http:HttpClient) {
    this.getUsers();

   }
   ngOnInit() {
 
  }
   getUsers() {
     console.log("yehuda")
     this.http.get('http://localhost:8080/tasks.json')
    .subscribe( (data) =>{ this.arrTask.next(data)})
  }
  addTask(task){
    this.http.get(`http://localhost:8080/tasks.json/?add=${task}`)
    .subscribe((data) =>{ this.arrTask.next(data)});
    // this.getUsers();
  }
  removeTask(id){
    this.http.get(`http://localhost:8080/tasks.json/?remove=${id}`).subscribe(data=>{
      this.arrTask.next(data)
    });
    // this.getUsers();
  }
  taskDone(id){
    this.http.get(`http://localhost:8080/tasks.json/?done=${id}`).subscribe(data=>{
      this.arrTask.next(data)
    });
    // this.getUsers();
  }
  editTask(id){
    this.http.get(`http://localhost:8080/tasks.json/?edit=${id}`).subscribe(data=>{
      this.arrTask.next(data)
    });
    // this.getUsers();
  }
  editNewTask(task,id){
    this.http.get(`http://localhost:8080/tasks.json/?editnew=${task}&&id=${id}`).subscribe(data=>{
      this.arrTask.next(data)
    });
    // this.getUsers();
  }
  clearAll(){
    this.http.get(`http://localhost:8080/tasks.json/?clear=clear`).subscribe(data=>{
      this.arrTask.next(data)
    });
    // this.getUsers();

  }

  

}
