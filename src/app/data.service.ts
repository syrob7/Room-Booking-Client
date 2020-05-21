import {Injectable} from '@angular/core';
import {Layout, LayoutCapacity, Room} from "./model/Room";
import {User} from "./model/User";
import {Booking} from "./model/Booking";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private rooms: Room[];
  private users: User[];
  private bookings: Booking[];

  getRooms(): Observable<Room[]> {
    return of(this.rooms);
  }

  getUsers(): Observable<User[]> {
    return of(this.users);
  }

  getBookings(): Observable<Booking[]> {
    return of(this.bookings);
  }

  updateUser(user: User): Observable<User> {
    const orginalUser = this.users.find(
      u => u.id === user.id
    );
    orginalUser.name = user.name;

    return of(orginalUser);
  }

  addUser(newUser: User, password: String) : Observable<User> {
    let id = 0;
    for (const user of this.users) {
      if (user.id > id) {
        id = user.id;
      }
    }
    newUser.id = id + 1;
    this.users.push(newUser);

    return of(newUser);
  }

  updateRoom(room : Room) : Observable<Room> {
    const orginalRoom = this.rooms.find(r => r.id === room.id);

    orginalRoom.name = room.name;
    orginalRoom.location = room.location;
    orginalRoom.capacities = room.capacities;

    return of(orginalRoom);
  }

  addRoom(newRoom : Room) : Observable<Room> {
    let id = 0;
    for(const room of this.rooms) {
        if(room.id > id) {
          id = room.id;
        }
    }

    newRoom.id = id + 1;
    this.rooms.push(newRoom);

    return of(newRoom);
  }

  deleteRoom(id: number) : Observable<any>{
    const room = this.rooms.find (r => r.id === id);
    this.rooms.splice(this.rooms.indexOf(room), 1);

    return of(null);
  }

  deleteUser(id: number) : Observable<any>{
    const user = this.users.find (r => r.id === id);
    this.users.splice(this.users.indexOf(user), 1);

    return of(null);
  }

  resetUserPassword(id: number) : Observable<any> {
    return of(null);
  }

  getBooking(id: number) : Observable<Booking> {
    const booking = this.bookings.find(b => b.id === id);

    return of(booking);
  }

  addBooking(newBooking: Booking) : Observable<Booking> {
    let id = 0;
    for (const booking of this.bookings) {
      if (booking.id > id) {
        id = booking.id;
      }
    }
    newBooking.id = id + 1;
    this.bookings.push(newBooking);

    return of(newBooking);
  }

  saveBooking(booking: Booking) : Observable<Booking> {
    const orginalBooking = this.bookings.find(b => b.id === booking.id);

    orginalBooking.date = booking.date;
    orginalBooking.layout = booking.layout;
    orginalBooking.title = booking.title;
    orginalBooking.room = booking.room;
    orginalBooking.user = booking.user;
    orginalBooking.startTime = booking.startTime;
    orginalBooking.endTime = booking.endTime;
    orginalBooking.participants = booking.participants;

    return of(orginalBooking);
  }

  deleteBooking(id: number) : Observable<any> {

    const booking = this.bookings.find (b => b.id === id);
    this.bookings.splice(this.bookings.indexOf(booking), 1);

    return of(null);
  }

  constructor() {
    this.rooms = new Array<Room>();
    this.users = new Array<User>();
    this.bookings = new Array<Booking>();

    const room1 = new Room();
    room1.id = 1;
    room1.name = 'First Room';
    room1.location = 'First Floor';

    const capacity1 = new LayoutCapacity();
    capacity1.capacity = 50;
    capacity1.layout = Layout.THEATER;

    const capacity2 = new LayoutCapacity();
    capacity2.capacity = 20;
    capacity2.layout = Layout.USHAPE;

    room1.capacities.push(capacity1);
    room1.capacities.push(capacity2);

    const room2 = new Room();
    room2.id = 2;
    room2.name = 'Second Room';
    room2.location = 'Second Floor';

    const capacity3 = new LayoutCapacity();
    capacity3.capacity = 60;
    capacity3.layout = Layout.THEATER;

    const capacity4 = new LayoutCapacity();
    capacity4.capacity = 30;
    capacity4.layout = Layout.BOARD;

    room2.capacities.push(capacity3);
    room2.capacities.push(capacity4);

    this.rooms.push(room1);
    this.rooms.push(room2);

    const user1 = new User();
    user1.id = 100;
    user1.name = 'Jan Kowalski';

    const user2 = new User();
    user2.id = 101;
    user2.name = 'Adam Słodowy';

    const user3 = new User();
    user3.id = 102;
    user3.name = 'Anna Kurnikowa';

    this.users.push(user1);
    this.users.push(user2);
    this.users.push(user3);

    const booking1 = new Booking();
    booking1.id = 200;
    booking1.room = room1;
    booking1.user = user1;
    booking1.title = 'Title One';
    booking1.layout = Layout.THEATER;
    booking1.participants = 4;
    booking1.date = '2020/05/21';
    booking1.startTime = '11:00';
    booking1.endTime = '12:00';

    const booking2 = new Booking();
    booking2.id = 201;
    booking2.room = room2;
    booking2.user = user2;
    booking2.title = 'Title Two';
    booking2.layout = Layout.USHAPE;
    booking2.participants = 5;
    booking2.date = '2020/05/20';
    booking2.startTime = '14:00';
    booking2.endTime = '15:00';

    this.bookings.push(booking1);
    this.bookings.push(booking2);
  }
}
