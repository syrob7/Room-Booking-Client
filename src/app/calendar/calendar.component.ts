import { Component, OnInit } from '@angular/core';
import { DataService } from "../data.service";
import { Booking } from "../model/Booking";
import { Router} from "@angular/router";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  bookings: Booking[];

  booking: Booking;

  constructor(
              private dataService: DataService,
              private router: Router
        ) { }

  ngOnInit(): void {
    this.dataService.getBookings().subscribe(
      (next) => {
        this.bookings = next;
      }
    );
  }

  addBooking() {
    this.router.navigate(['addBooking']);
  }

  editBooking(id: number) {
    this.router.navigate(['editBooking'], {queryParams: {id}});
  }

  deleteBooking(id: number) {
    this.dataService.deleteBooking(id).subscribe(
      next => this.router.navigate(['', ''])
    );
  }
}
