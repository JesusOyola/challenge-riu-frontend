import { TestBed } from '@angular/core/testing';
import { HeroesService } from './heroes.service';
import { Hero } from '../interface/hero';

describe('HeroesService', () => {
  let service: HeroesService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeroesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return default heroes if no heroes in localStorage', (done) => {
    service.getHeroes().subscribe((heroes) => {
      expect(heroes.length).toBeGreaterThan(0);
      expect(heroes[0].superhero).toBe('Batman');
      done();
    });
  });

  it('should save heroes to localStorage', () => {
    service['heroesList'] = [];
    const hero: Hero = {
      id: 0,
      superhero: 'Test Hero',
      publisher: 'Test Publisher',
      alter_ego: 'Test Alter Ego',
      first_appearance: 'Test First Appearance',
      characters: 'Test Characters',
    };

    service.createHero(hero);
    const savedHeroes = JSON.parse(localStorage.getItem('heroes') || '[]');
    expect(savedHeroes.length).toBe(1);
    expect(savedHeroes[0].superhero).toBe('Test Hero');
  });

  it('should retrieve hero by ID', () => {
    const hero: Hero = {
      id: 1,
      superhero: 'Test Hero',
      publisher: 'Test Publisher',
      alter_ego: 'Test Alter Ego',
      first_appearance: 'Test First Appearance',
      characters: 'Test Characters',
    };

    service.createHero(hero);

    const retrievedHero = service.getHeroById(1);
    expect(retrievedHero?.id).toEqual(1);
  });

  it('should search heroes by name', () => {
    service['heroesList'] = [];
    service.createHero({
      id: 1,
      superhero: 'Superman',
      publisher: 'DC Comics',
      alter_ego: 'Kal-El',
      first_appearance: 'Action Comics #1',
      characters: 'Kal-El',
    });

    service.createHero({
      id: 2,
      superhero: 'Batman',
      publisher: 'DC Comics',
      alter_ego: 'Bruce Wayne',
      first_appearance: 'Detective Comics #27',
      characters: 'Bruce Wayne',
    });

    const foundHeroes = service.searchHeroesByName('man');
    expect(foundHeroes.length).toBe(2);
    expect(foundHeroes[0].superhero.toLowerCase()).toContain('man');
    expect(foundHeroes[1].superhero.toLowerCase()).toContain('man');
  });

  it('should delete a hero', () => {
    service['heroesList'] = [];
    service.createHero({
      id: 1,
      superhero: 'Superman',
      publisher: 'DC Comics',
      alter_ego: 'Kal-El',
      first_appearance: 'Action Comics #1',
      characters: 'Kal-El',
    });

    service.createHero({
      id: 2,
      superhero: 'Batman',
      publisher: 'DC Comics',
      alter_ego: 'Bruce Wayne',
      first_appearance: 'Detective Comics #27',
      characters: 'Bruce Wayne',
    });

    let heroesListBeforeDelete = service['heroesList'].length;
    expect(heroesListBeforeDelete).toBe(2);

    service.deleteHero(1);

    let heroesListAfterDelete = service['heroesList'].length;
    expect(heroesListAfterDelete).toBe(1);

    const foundHero = service.getHeroById(1);
    expect(foundHero).toBeUndefined();
  });

  it('should edit a hero', () => {
    const hero: Hero = {
      id: 0,
      superhero: 'Test Hero',
      publisher: 'Test Publisher',
      alter_ego: 'Test Alter Ego',
      first_appearance: 'Test First Appearance',
      characters: 'Test Characters',
    };

    service.createHero(hero);
    const updatedHero: Hero = { ...hero, superhero: 'Updated Hero', id: 1 };
    service.editHero(updatedHero);

    const retrievedHero = service.getHeroById(1);
    expect(retrievedHero?.superhero).toBe('Updated Hero');
  });
});
