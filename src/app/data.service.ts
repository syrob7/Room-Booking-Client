import {Injectable} from '@angular/core';
import {Layout, LayoutCapacity, Room} from "./model/Room";
import {User} from "./model/User";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private rooms: Room[];
  private users: User[];

  getRooms(): Observable<Room[]> {
    return of(this.rooms);
  }

  getUsers(): Observable<User[]> {
    return of(this.users);
  }

  updateUser(user: User): Observable<User> {
    const orginalUser = this.users.find(
      u => u.id === user.id
    );
    orginalUser.name = user.name;

    return of(orginalUser);
  }

  addUser(newUser: User, password: String) {
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

  constructor() {
    this.rooms = new Array<Room>();
    this.users = new Array<User>();

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
  }
}
