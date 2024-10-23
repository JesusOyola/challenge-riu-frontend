import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MaterialModule } from '../../../shared/material/material.module';
import { HeroesService } from '../../../shared/service/heroes.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RouterPathNames } from '../../../enum/router-path-names';
import { Hero } from '../../../shared/interface/hero';
import { UppercaseDirective } from '../../../shared/uppercase.directive';

@Component({
  selector: 'app-edit-hero',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, UppercaseDirective],
  templateUrl: './edit-hero.component.html',
  styleUrl: './edit-hero.component.scss',
})
export default class EditHeroComponent {
  heroForm!: FormGroup;
  fb = inject(FormBuilder);
  heroesService = inject(HeroesService);
  router = inject(Router);
  toastr = inject(ToastrService);

  ngOnInit(): void {
    const heroToEdit: Hero = this.heroesService.heroData();
    this.heroForm = this.fb.group({
      id: [heroToEdit.id],
      superhero: [heroToEdit.superhero, [Validators.required]],
      publisher: [heroToEdit.publisher, [Validators.required]],
      alter_ego: [heroToEdit.alter_ego, [Validators.required]],
      first_appearance: [heroToEdit.first_appearance, [Validators.required]],
      characters: [heroToEdit.characters, [Validators.required]],
    });
  }

  onSubmit() {
    if (this.heroForm.invalid) {
      this.toastr.error(`Verify that all fields are correct.`, 'Invalid Form');
      return;
    }
    if (this.heroForm.valid) {
      const heroName = this.heroForm.value.superhero.toUpperCase();
      const heroData = {
        ...this.heroForm.value,
        superhero: heroName,
      };
      this.heroesService.editHero(heroData);
      this.toastr.success(
        `Hero ${this.heroForm.controls['superhero'].value} Updated`,
        'Hero Updated'
      );
      this.router.navigate([`/${RouterPathNames.home}`]);
    }
  }
}
