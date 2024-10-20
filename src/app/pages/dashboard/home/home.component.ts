import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Hero } from '../../../shared/interface/hero';
import { MaterialModule } from '../../../shared/material/material.module';
import { HeroesService } from '../../../shared/service/heroes.service';
import { Router } from '@angular/router';
import { RouterPathNames } from '../../../enum/router-path-names';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export default class HomeComponent {
  displayedColumns: string[] = [
    'id',
    'superhero',
    'publisher',
    'alter_ego',
    'first_appearance',
    'characters',
    'actions',
  ];
  dataSource: MatTableDataSource<Hero> = new MatTableDataSource<Hero>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private heroService: HeroesService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  ngAfterViewInit(): void {
    this.heroService.getHeroes().subscribe({
      next: (response) => {
        this.dataSource = new MatTableDataSource<Hero>(response);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    const filteredHeroes = this.heroService.searchHeroesByName(
      filterValue.trim().toLowerCase()
    );
    this.dataSource.data = filteredHeroes;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  redirectToCreateHero() {
    this.router.navigate([`/${RouterPathNames.createHero}`]);
  }

  deleteHero(index: number, name: string) {
    this.heroService.deleteHero(index);
    this.toastr.success(`Hero ${name} deleted`, 'Hero deleted');
  }
}
