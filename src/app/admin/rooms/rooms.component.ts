import { Component, OnInit } from '@angular/core';
import { DataService } from "../../data.service";
import { FormResetService } from "../../form-reset.service";
import {Room} from "../../model/Room";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  rooms: Room[];
  selectedRoom: Room;
  action: string;

  constructor(private dataService: DataService,
              private route: ActivatedRoute,
              private formResetService: FormResetService,
              private router: Router) { }

  ngOnInit(): void {
    this.dataService.getRooms().subscribe(
      (next) => {
        this.rooms = next;
      }
    );
    this.route.queryParams.subscribe(
      (params) => {
          const id = params['id'];
          if(id) {
            this.selectedRoom = this.rooms.find(room => room.id === +id);
            this.action = params['action'];
          }
          if (params['action'] === 'add') {
            this.selectedRoom = new Room();
            this.action = 'edit';
            this.formResetService.resetRoomFormEvent.emit(this.selectedRoom);
          }
    });
  }

  setRoom(id: number) {
    this.router.navigate(['admin', 'rooms'], {queryParams : {id, action: 'view'} });
  }

  addRoom() {
    this.router.navigate(['admin', 'rooms'], {queryParams : {action: 'add'} });
  }
}
