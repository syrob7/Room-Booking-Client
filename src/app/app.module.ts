import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {RouterModule, Routes} from "@angular/router";
import {UsersComponent} from "./admin/users/users.component";
import {RoomsComponent} from "./admin/rooms/rooms.component";
import {CalendarComponent} from "./calendar/calendar.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {MenuComponent} from "./menu/menu.component";
import { RoomDetailComponent } from './admin/rooms/room-detail/room-detail.component';
import { UserDetailComponent } from './admin/users/user-detail/user-detail.component';
import { UserEditComponent } from './admin/users/user-edit/user-edit.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { RoomEditComponent } from './admin/rooms/room-edit/room-edit.component';
import { CalendarDetailComponent } from './calendar/calendar-detail/calendar-detail.component';

const routes: Routes = [
  {path : 'admin/users', component : UsersComponent},
  {path : 'admin/rooms', component : RoomsComponent},
  {path : '', component : CalendarComponent},
  {path : 'editBooking', component : CalendarDetailComponent},
  {path : 'addBooking', component : CalendarDetailComponent},
  {path : '404', component : PageNotFoundComponent},
  {path : '**', redirectTo : '/404'}
];

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    CalendarComponent,
    RoomsComponent,
    UsersComponent,
    PageNotFoundComponent,
    RoomDetailComponent,
    UserDetailComponent,
    UserEditComponent,
    RoomEditComponent,
    CalendarDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
