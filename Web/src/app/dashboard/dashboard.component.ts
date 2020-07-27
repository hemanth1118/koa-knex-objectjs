import { Component, NgModule } from '@angular/core';
import { map } from 'rxjs/operators';
import { BrowserModule } from '@angular/platform-browser';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { single } from '../../../src/data';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AuthService } from '../auth.service'


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  users = []
  userslength
  single: any[];
  view: any[] = [400, 200];

  constructor(private breakpointObserver: BreakpointObserver,
    public authService: AuthService) {
    this.authService.getAllUsers().subscribe((res) => {
      this.users = res.user
      console.log(this.users)
      // this.userslength = this.users.length
      let id = 1
      if (id <= 5) {
        console.log("enterd")
        this.single = [
          {
            "name": "Germany",
            "value": 8940000
          },
          {
            "name": "USA",
            "value": 5000000
          },
          {
            "name": "France",
            "value": 7200000
          }
        ];
        Object.assign(this.single);
      }
    })

    // Object.assign(this, { single });
  }
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: string = 'below';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  onSelect(data): void {
    // console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    // console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    // console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Card 1', cols: 1, rows: 1 },
          { title: 'Card 2', cols: 1, rows: 1 },
          { title: 'Card 3', cols: 1, rows: 1 },
          { title: 'Card 4', cols: 1, rows: 1 },
          { title: 'Card 5', cols: 1, rows: 1 }
        ];
      }

      return [
        { title: 'Card 1', cols: 1, rows: 1 },
        { title: 'Card 2', cols: 1, rows: 1 },
        { title: 'Card 3', cols: 1, rows: 1 },
        { title: 'Card 4', cols: 1, rows: 1 },
        { title: 'Card 5', cols: 1, rows: 1 }
      ];
    })
  );

}
