import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,NavbarComponent, RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export default class DashboardComponent {

}
