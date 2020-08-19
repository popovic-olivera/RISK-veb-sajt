import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeetingComponent } from './meeting/meeting.component';
import { MeetingsListComponent } from './meetings-list/meetings-list.component';
import { CreateMeetingComponent } from './create-meeting/create-meeting.component';
import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    MeetingComponent,
    MeetingsListComponent,
    CreateMeetingComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule
  ]
})

export class MeetingsModule { }
