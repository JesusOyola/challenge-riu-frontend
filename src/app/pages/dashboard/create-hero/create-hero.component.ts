import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MaterialModule } from '../../../shared/material/material.module';
import { HeroesService } from '../../../shared/service/heroes.service';
import { Router } from '@angular/router';
import { RouterPathNames } from '../../../enum/router-path-names';
import { UppercaseDirective } from '../../../shared/uppercase.directive';

@Component({
  selector: 'app-create-hero',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule,UppercaseDirective],
  templateUrl: './create-hero.component.html',
  styleUrl: './create-hero.component.scss',
})
export default class CreateHeroComponent implements OnInit {
  heroForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private heroesService: HeroesService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.heroForm = this.fb.group({
      id: [''],
      superhero: ['', [Validators.required]],
      publisher: ['', [Validators.required]],
      alter_ego: ['', [Validators.required]],
      first_appearance: ['', [Validators.required]],
      characters: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.heroForm.valid) {
      const heroName = this.heroForm.value.superhero.toUpperCase();
      const heroData = {
        ...this.heroForm.value,
        superhero: heroName
      }
      this.heroesService.createHero(heroData);
      this.toastr.success(
        `Hero ${this.heroForm.controls['superhero'].value} Created`,
        'Hero Created'
      );
      this.router.navigate([`/${RouterPathNames.home}`]);
    } else {
      this.toastr.error(`Verify that all fiels are correct.`, 'Invalid Form');
    }
  }
}
