import { Component, OnInit } from '@angular/core';
import { Booking } from "../../model/Booking";
import { Room, Layout } from "../../model/Room";
import { User } from "../../model/User";
import { DataService } from "../../data.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-calendar-detail',
  templateUrl: './calendar-detail.component.html',
  styleUrls: ['./calendar-detail.component.css']
})
export class CalendarDetailComponent implements OnInit {

  booking: Booking;
  rooms: Array<Room>;
  users: Array<User>;
  layouts = Object.keys(Layout);
  layoutEnum = Layout;

  constructor(
        private dataService: DataService,
        private router: Router,
        private route: ActivatedRoute
        ) { }

  ngOnInit(): void {
    this.dataService.getRooms().subscribe(
      (next) => {
        this.rooms = next;
      }
    );
    this.dataService.getUsers().subscribe(
      (next) => {
        this.users = next;
      }
    );
    const id = this.route.snapshot.queryParams['id'];

    if(id) {
      this.dataService.getBooking(+id).subscribe(
        next => this.booking = next
      );
    } else {
      this.booking = new Booking();
    }
  }

  onSubmit() {
    if (this.booking.id != null) {
      this.dataService.saveBooking(this.booking).subscribe(
        next => this.router.navigate([''])
      );
    } else {
      this.dataService.addBooking(this.booking).subscribe(
        next => this.router.navigate([''])
      );
    }
  }
}
