import {Injectable} from '@angular/core';
import {Layout, LayoutCapacity, Room} from "./model/Room";
import {User} from "./model/User";
import {Booking} from "./model/Booking";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  getRooms(): Observable<Room[]> {
    return of(null);
  }

  getUsers(): Observable<User[]> {
    return of(null);
  }

  getBookings(date: string): Observable<Booking[]> {
    return of(null);
  }

  updateUser(user: User): Observable<User> {
    return of(null);
  }

  addUser(newUser: User, password: String) : Observable<User> {
    return of(null);
  }

  updateRoom(room : Room) : Observable<Room> {
    return of(null);
  }

  addRoom(newRoom : Room) : Observable<Room> {
    return of(null);
  }

  deleteRoom(id: number) : Observable<any>{
    return of(null);
  }

  deleteUser(id: number) : Observable<any>{
    return of(null);
  }

  resetUserPassword(id: number) : Observable<any> {
    return of(null);
  }

  getBooking(id: number) : Observable<Booking> {
    return of(null);
  }

  addBooking(newBooking: Booking) : Observable<Booking> {
    return of(null);
  }

  saveBooking(booking: Booking) : Observable<Booking> {
    return of(null);
  }

  deleteBooking(id: number) : Observable<any> {
    return of(null);
  }

  constructor() {
  }
}
