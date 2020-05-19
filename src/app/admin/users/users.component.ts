import { Component, OnInit } from '@angular/core';
import {DataService} from "../../data.service";
import { FormResetService } from "../../form-reset.service";
import {User} from "../../model/User";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[];
  selectedUser: User;
  action: string;

  constructor(private dataService: DataService,
              private route: ActivatedRoute,
              private formResetService: FormResetService,
              private router: Router) { }

  ngOnInit(): void {
    this.dataService.getUsers().subscribe(
      (data) => {
        this.users = data;
      }
    );
    this.route.queryParams.subscribe(
      (params) => {
        const id = params['id'];
        this.action = params['action'];
        if(id) {
          this.selectedUser = this.users.find(user => user.id === +id);
        }
      });
  }

  setUser(id: number) {
    this.router.navigate(['admin', 'users'], {queryParams : {id, action: 'view'} });
  }

  addUser() {
    this.selectedUser = new User();
    this.router.navigate(['admin', 'users'], {queryParams : {action: 'add'} });
    this.formResetService.resetUserFormEvent.emit(this.selectedUser);
  }
}
