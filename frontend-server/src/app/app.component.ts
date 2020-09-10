import { Component, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay, filter } from 'rxjs/operators';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { ThemingService } from './theming/theming.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'frontend-server';

  isHandset$: Observable<boolean> = this.breakpointObserver.observe('(max-width: 780px)')
    .pipe(
      map(result => result.matches),
      shareReplay()
  );

  isMedium$: Observable<boolean> = this.breakpointObserver.observe('(max-width: 959px)')
    .pipe(
      map(result => result.matches),
      shareReplay()
  );

  constructor(
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    public themingService: ThemingService) {}

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        document.querySelector('.mat-sidenav-content').scrollTop = 0;
    });
  }

}
