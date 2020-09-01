import { Component, OnInit } from '@angular/core';
import { People } from './people';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css', '../app.component.css']
})
export class OrganizationComponent implements OnInit {
  people = People;

  constructor() { }

  ngOnInit(): void {
  }

}
