import { Component, OnInit, ElementRef, Renderer2, HostListener, ViewChildren, QueryList, AfterViewInit, Input } from '@angular/core';
import { Projects } from './projects.model';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css', '../app.component.css']
})
export class ProjectsComponent implements OnInit, AfterViewInit {
  @ViewChildren('elem', { read: ElementRef })
  elem: QueryList<ElementRef>;
  projects = Projects;

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.initStyle();

    if (window.innerWidth < 600) {
      this.setSmall();
    } else {
      this.setLarge();
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.initStyle();

    if (event.target.innerWidth < 600) {
      this.setSmall();
    } else {
      this.setLarge();
    }
  }

  setSmall(): void {
    this.elem.forEach(left => {
      if (left.nativeElement.getAttribute('data-index') % 2 === 0) {
        this.renderer.setStyle(left.nativeElement.querySelector('mat-card'), 'border-radius', '50% / 35%');
        this.renderer.setStyle(left.nativeElement.querySelector('mat-card'), 'border-bottom-left-radius', '0px');
        this.renderer.setStyle(left.nativeElement.querySelector('mat-card'), 'border-bottom-right-radius', '0px');
      } else {
        this.renderer.setStyle(left.nativeElement.querySelector('mat-card'), 'border-radius', '50% / 35%');
        this.renderer.setStyle(left.nativeElement.querySelector('mat-card'), 'border-top-left-radius', '0px');
        this.renderer.setStyle(left.nativeElement.querySelector('mat-card'), 'border-top-right-radius', '0px');
      }
    });
  }

  setLarge(): void {
    this.elem.forEach(left => {
      if (left.nativeElement.getAttribute('data-index') % 2 === 0) {
        this.renderer.setStyle(left.nativeElement.querySelector('mat-card'), 'border-radius', '25% / 50%');
        this.renderer.setStyle(left.nativeElement.querySelector('mat-card'), 'border-bottom-right-radius', '0px');
        this.renderer.setStyle(left.nativeElement.querySelector('mat-card'), 'border-top-right-radius', '0px');
      } else {
        this.renderer.setStyle(left.nativeElement.querySelector('mat-card'), 'border-radius', '25% / 50%');
        this.renderer.setStyle(left.nativeElement.querySelector('mat-card'), 'border-bottom-left-radius', '0px');
        this.renderer.setStyle(left.nativeElement.querySelector('mat-card'), 'border-top-left-radius', '0px');
      }
    });
  }

  initStyle(): void {
    this.elem.forEach(left => {
      if (left.nativeElement.getAttribute('data-index') % 2 === 0) {
        this.renderer.removeAttribute(left.nativeElement.querySelector('mat-card'), 'style');
        this.renderer.setStyle(left.nativeElement.querySelector('mat-card'), 'padding', '0px');
      } else {
        this.renderer.removeAttribute(left.nativeElement.querySelector('mat-card'), 'style');
        this.renderer.setStyle(left.nativeElement.querySelector('mat-card'), 'padding', '0px');
      }
    });
  }

  trackById(index, item) {
    return index;
  }

}
