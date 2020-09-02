import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeetingComponent } from './meeting/meeting.component';
import { MeetingsListComponent } from './meetings-list/meetings-list.component';
import { CreateMeetingComponent } from './create-meeting/create-meeting.component';
import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CarouselModule, WavesModule } from 'angular-bootstrap-md';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SerbianDatePipe } from './serbian-date.pipe';


@NgModule({
  declarations: [
    MeetingComponent,
    MeetingsListComponent,
    CreateMeetingComponent,
    SerbianDatePipe
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    CarouselModule,
    WavesModule,
    FormsModule,
    ReactiveFormsModule
  ]
})

export class MeetingsModule { }
