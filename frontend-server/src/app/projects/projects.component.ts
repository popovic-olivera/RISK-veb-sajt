import { Component, OnInit, ElementRef, Renderer2, HostListener, ViewChildren, QueryList, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css', '../app.component.css']
})
export class ProjectsComponent implements OnInit, AfterViewInit {
  @ViewChildren('cardRight', { read: ElementRef }) elRight: QueryList<ElementRef>;
  @ViewChildren('cardLeft', { read: ElementRef }) elLeft: QueryList<ElementRef>;

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
    this.elLeft.forEach(left => {
      this.renderer.setStyle(left.nativeElement, 'padding-right', '0px');
      this.renderer.setStyle(left.nativeElement.querySelector('mat-card'), 'border-radius', '50% / 35%');
      this.renderer.setStyle(left.nativeElement.querySelector('mat-card'), 'border-bottom-left-radius', '0px');
      this.renderer.setStyle(left.nativeElement.querySelector('mat-card'), 'border-bottom-right-radius', '0px');
    });

    this.elRight.forEach(right => {
      this.renderer.setStyle(right.nativeElement, 'padding-left', '0px');
      this.renderer.setStyle(right.nativeElement.querySelector('mat-card'), 'border-radius', '50% / 35%');
      this.renderer.setStyle(right.nativeElement.querySelector('mat-card'), 'border-top-left-radius', '0px');
      this.renderer.setStyle(right.nativeElement.querySelector('mat-card'), 'border-top-right-radius', '0px');
    });
  }

  setLarge(): void {
    this.elLeft.forEach(left => {
      this.renderer.setStyle(left.nativeElement, 'padding-bottom', '30px');
      this.renderer.setStyle(left.nativeElement, 'padding-right', '15px');
      this.renderer.setStyle(left.nativeElement.querySelector('mat-card'), 'border-radius', '25% / 50%');
      this.renderer.setStyle(left.nativeElement.querySelector('mat-card'), 'border-bottom-right-radius', '0px');
      this.renderer.setStyle(left.nativeElement.querySelector('mat-card'), 'border-top-right-radius', '0px');
    });

    this.elRight.forEach(right => {
      this.renderer.setStyle(right.nativeElement, 'padding-bottom', '30px');
      this.renderer.setStyle(right.nativeElement, 'padding-left', '15px');
      this.renderer.setStyle(right.nativeElement.querySelector('mat-card'), 'border-radius', '25% / 50%');
      this.renderer.setStyle(right.nativeElement.querySelector('mat-card'), 'border-bottom-left-radius', '0px');
      this.renderer.setStyle(right.nativeElement.querySelector('mat-card'), 'border-top-left-radius', '0px');
    });
  }

  initStyle(): void {
    this.elLeft.forEach(left => {
      this.renderer.setStyle(left.nativeElement, 'padding-bottom', '30px');
      this.renderer.setStyle(left.nativeElement, 'padding-right', '15px');
      this.renderer.removeAttribute(left.nativeElement.querySelector('mat-card'), 'style');
      this.renderer.setStyle(left.nativeElement.querySelector('mat-card'), 'padding', '0px');
    });
    this.elRight.forEach(right => {
      this.renderer.setStyle(right.nativeElement, 'padding-bottom', '30px');
      this.renderer.setStyle(right.nativeElement, 'padding-left', '15px');
      this.renderer.removeAttribute(right.nativeElement.querySelector('mat-card'), 'style');
      this.renderer.setStyle(right.nativeElement.querySelector('mat-card'), 'padding', '0px');
    });
  }

}
