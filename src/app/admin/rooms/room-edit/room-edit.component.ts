import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import {Room, Layout, LayoutCapacity} from "../../../model/Room";
import {DataService} from "../../../data.service";
import { FormResetService } from "../../../form-reset.service";
import {Validators, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-room-edit',
  templateUrl: './room-edit.component.html',
  styleUrls: ['./room-edit.component.css']
})
export class RoomEditComponent implements OnInit, OnDestroy {

  @Input()
  room: Room;

  layouts = Object.keys(Layout);
  layoutEnum = Layout;

  roomForm : FormGroup;

  resetEventSubscription : Subscription;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private formResetService: FormResetService,
              private dataService: DataService) { }

  ngOnInit(): void {
    this.initializeForm();
    this.resetEventSubscription = this.formResetService.resetRoomFormEvent.subscribe(
      room => {
        this.room = room;
        this.initializeForm();
      }
    );
  }

  ngOnDestroy(): void {
    this.resetEventSubscription.unsubscribe();
  }

  initializeForm() {
    this.roomForm = this.formBuilder.group (
        {
          roomName : [this.room.name, Validators.required],
          location : [this.room.location, [Validators.required, Validators.minLength(2)]]
        }
    );

    for(const layout of this.layouts) {
      const layoutCapacity = this.room.capacities.find(lc => lc.layout === Layout[layout]);
      const initialCapacity = layoutCapacity == null ? 0 : layoutCapacity.capacity;
      this.roomForm.addControl(`layout${layout}`, this.formBuilder.control(initialCapacity));
    }
  }

  onSubmit() {
    this.room.name = this.roomForm.controls['roomName'].value;
    this.room.location = this.roomForm.value['location'];
    this.room.capacities = new Array<LayoutCapacity>();
    for(const layout of this.layouts) {
      const layoutCapacity = new LayoutCapacity();
      layoutCapacity.layout = Layout[layout];
      layoutCapacity.capacity = this.roomForm.controls[`layout${layout}`].value;
      this.room.capacities.push(layoutCapacity);
    }

    if(this.room.id == null) {
      this.dataService.addRoom(this.room).subscribe(
        (next) => {
          this.router.navigate(['admin', 'rooms'], {queryParams: {action: 'view', id: next.id}});
      });
    } else {
      this.dataService.updateRoom(this.room).subscribe(
        (next) => {
          this.router.navigate(['admin', 'rooms'], {queryParams: {action: 'view', id: next.id}});
      });
    }
  }
}

