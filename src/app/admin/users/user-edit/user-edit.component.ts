import {Component, Input, OnInit, OnDestroy} from '@angular/core';
import {User} from "../../../model/User";
import {DataService} from "../../../data.service";
import {Router} from "@angular/router";
import { FormResetService } from "../../../form-reset.service";
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit, OnDestroy {

  @Input()
  user: User;

  formUser: User;

  message: string;

  password: string;

  password2: string;

  nameIsValid = false;

  passwordsAreValid = false;

  passwordsMatch = false;

  resetEventSubscription : Subscription;

  constructor(private dataService: DataService,
              private formResetService: FormResetService,
              private router: Router) { }

  ngOnInit(): void {
    this.initializeForm();
    this.resetEventSubscription = this.formResetService.resetUserFormEvent.subscribe(
      user => {
        this.user = user;
        this.initializeForm();
      }
    );
  }

  initializeForm() {
    this.formUser = Object.assign({}, this.user);
    this.checkIfNameIsValid();
    this.checkIfPasswordAreValid();
  }

  ngOnDestroy(): void {
    this.resetEventSubscription.unsubscribe();
  }

  onSubmit() {
    if (this.formUser.id == null) {
      this.dataService.addUser(this.formUser, this.password).subscribe(
        (newUser) => {
          this.router.navigate(['admin', 'users'], {queryParams: {action: 'view', id: newUser.id}});
        }
      );
    } else {
      this.dataService.updateUser(this.formUser).subscribe(
        (user) => {
          this.router.navigate(['admin', 'users'], {queryParams: {action: 'view', id: user.id}});
        }
      );
    }
  }

  checkIfNameIsValid() {
    if(this.formUser.name) {
      this.nameIsValid = this.formUser.name.trim().length > 0;
    } else {
      this.nameIsValid = false;
    }
  }

  checkIfPasswordAreValid() {
    if(this.formUser.id != null) {
      this.passwordsMatch = true;
      this.passwordsAreValid = true;
    } else {
      this.passwordsMatch = this.password === this.password2;
      if(this.password) {
        this.passwordsAreValid = this.password.trim().length > 0;
      } else {
        this.passwordsAreValid = false;
      }
    }
  }
}
