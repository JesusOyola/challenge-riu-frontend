import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterPathNames } from '../../enum/router-path-names';
import { MaterialModule } from '../material/material.module';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  constructor(private router: Router) {}

  redirectToHome() {
    this.router.navigate([`/${RouterPathNames.home}`]);
  }
  logOut() {
    this.router.navigate([`/${RouterPathNames.login}`]);
  }
}
