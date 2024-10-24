import { Injectable, signal, WritableSignal } from '@angular/core';
import { Hero } from '../interface/hero';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  private heroesList: Hero[] = this.getHeroesFromLocalStorage();
  private heroes$ = new BehaviorSubject<Hero[]>(this.heroesList);
  heroData: WritableSignal<Hero> = signal({
    id: 0,
    superhero: '',
    publisher: '',
    alter_ego: '',
    first_appearance: '',
    characters: '',
  });
  private saveHeroesToLocalStorage() {
    localStorage.setItem('heroes', JSON.stringify(this.heroesList));
  }

  private getHeroesFromLocalStorage(): Hero[] {
    const heroes = localStorage.getItem('heroes');
    return heroes ? JSON.parse(heroes) : this.defaultHeroes();
  }
  private defaultHeroes(): Hero[] {
    return [
      {
        id: 1,
        superhero: 'Batman',
        publisher: 'DC Comics',
        alter_ego: 'Bruce Wayne',
        first_appearance: 'Detective Comics #27',
        characters: 'Bruce Wayne',
      },
      {
        id: 2,
        superhero: 'Superman',
        publisher: 'DC Comics',
        alter_ego: 'Kal-El',
        first_appearance: 'Action Comics #1',
        characters: 'Kal-El',
      },
      {
        id: 3,
        superhero: 'Flash',
        publisher: 'DC Comics',
        alter_ego: 'Jay Garrick',
        first_appearance: 'Flash Comics #1',
        characters: 'Jay Garrick, Barry Allen, Wally West, Bart Allen',
      },
      {
        id: 4,
        superhero: 'Green Lantern',
        publisher: 'DC Comics',
        alter_ego: 'Alan Scott',
        first_appearance: 'All-American Comics #16',
        characters:
          'Alan Scott, Hal Jordan, Guy Gardner, John Stewart, Kyle Raynor, Jade, Sinestro, Simon Baz',
      },
      {
        id: 5,
        superhero: 'Green Arrow',
        publisher: 'DC Comics',
        alter_ego: 'Oliver Queen',
        first_appearance: 'More Fun Comics #73',
        characters: 'Oliver Queen',
      },
      {
        id: 6,
        superhero: 'Wonder Woman',
        publisher: 'DC Comics',
        alter_ego: 'Princess Diana',
        first_appearance: 'All Star Comics #8',
        characters: 'Princess Diana',
      },
      {
        id: 7,
        superhero: 'Martian Manhunter',
        publisher: 'DC Comics',
        alter_ego: "J'onn J'onzz",
        first_appearance: 'Detective Comics #225',
        characters: 'Martian Manhunter',
      },
      {
        id: 8,
        superhero: 'Robin/Nightwing',
        publisher: 'DC Comics',
        alter_ego: 'Dick Grayson',
        first_appearance: 'Detective Comics #38',
        characters: 'Dick Grayson',
      },
      {
        id: 9,
        superhero: 'Blue Beetle',
        publisher: 'DC Comics',
        alter_ego: 'Dan Garret',
        first_appearance: 'Mystery Men Comics #1',
        characters: 'Dan Garret, Ted Kord, Jaime Reyes',
      },
      {
        id: 10,
        superhero: 'Black Canary',
        publisher: 'DC Comics',
        alter_ego: 'Dinah Drake',
        first_appearance: 'Flash Comics #86',
        characters: 'Dinah Drake, Dinah Lance',
      },
      {
        id: 11,
        superhero: 'Spider Man',
        publisher: 'Marvel Comics',
        alter_ego: 'Peter Parker',
        first_appearance: 'Amazing Fantasy #15',
        characters: 'Peter Parker',
      },
      {
        id: 12,
        superhero: 'Captain America',
        publisher: 'Marvel Comics',
        alter_ego: 'Steve Rogers',
        first_appearance: 'Captain America Comics #1',
        characters: 'Steve Rogers',
      },
      {
        id: 13,
        superhero: 'Iron Man',
        publisher: 'Marvel Comics',
        alter_ego: 'Tony Stark',
        first_appearance: 'Tales of Suspense #39',
        characters: 'Tony Stark',
      },
      {
        id: 14,
        superhero: 'Thor',
        publisher: 'Marvel Comics',
        alter_ego: 'Thor Odinson',
        first_appearance: 'Journey into Myster #83',
        characters: 'Thor Odinson',
      },
      {
        id: 15,
        superhero: 'Hulk',
        publisher: 'Marvel Comics',
        alter_ego: 'Bruce Banner',
        first_appearance: 'The Incredible Hulk #1',
        characters: 'Bruce Banner',
      },
      {
        id: 16,
        superhero: 'Wolverine',
        publisher: 'Marvel Comics',
        alter_ego: 'James Howlett',
        first_appearance: 'The Incredible Hulk #180',
        characters: 'James Howlett',
      },
      {
        id: 17,
        superhero: 'Daredevil',
        publisher: 'Marvel Comics',
        alter_ego: 'Matthew Michael Murdock',
        first_appearance: 'Daredevil #1',
        characters: 'Matthew Michael Murdock',
      },
      {
        id: 18,
        superhero: 'Hawkeye',
        publisher: 'Marvel Comics',
        alter_ego: 'Clinton Francis Barton',
        first_appearance: 'Tales of Suspense #57',
        characters: 'Clinton Francis Barton',
      },
      {
        id: 19,
        superhero: 'Cyclops',
        publisher: 'Marvel Comics',
        alter_ego: 'Scott Summers',
        first_appearance: 'X-Men #1',
        characters: 'Scott Summers',
      },
      {
        id: 20,
        superhero: 'Silver Surfer',
        publisher: 'Marvel Comics',
        alter_ego: 'Norrin Radd',
        first_appearance: 'The Fantastic Four #48',
        characters: 'Norrin Radd',
      },
    ];
  }

  getHeroes(): Observable<Hero[]> {
    return this.heroes$.asObservable();
  }

  getHeroById(id: number): Hero | undefined {
    return this.heroesList.find((hero) => hero.id === id);
  }

  searchHeroesByName(name: string): Hero[] {
    return this.heroesList.filter((hero) =>
      hero.superhero.toLowerCase().includes(name.toLowerCase())
    );
  }

  createHero(hero: Hero) {
    hero.id = this.heroesList.length + 1;
    this.heroesList.push(hero);
    this.saveHeroesToLocalStorage();
    this.heroes$.next(this.heroesList);
  }

  editHero(updatedHero: Hero) {
    const index = this.heroesList.findIndex(
      (hero) => hero.id === updatedHero.id
    );
    if (index !== -1) {
      this.heroesList[index] = updatedHero;
      this.saveHeroesToLocalStorage();
      this.heroes$.next(this.heroesList);
    }
  }

  deleteHero(id: number) {
    this.heroesList = this.heroesList.filter((hero) => hero.id !== id);
    this.saveHeroesToLocalStorage();
    this.heroes$.next(this.heroesList);
  }
}
