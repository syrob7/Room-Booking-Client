import { Component, OnInit, Input } from '@angular/core';
import {Room, Layout, LayoutCapacity} from "../../../model/Room";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-room-edit',
  templateUrl: './room-edit.component.html',
  styleUrls: ['./room-edit.component.css']
})
export class RoomEditComponent implements OnInit {

  @Input()
  room: Room;

  layouts = Object.keys(Layout);
  layoutEnum = Layout;

  roomForm : FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.roomForm = this.formBuilder.group(
        {
          roomName : this.room.name,
          location : this.room.location
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

    console.log(this.room);
  }
}

