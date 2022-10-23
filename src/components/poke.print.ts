import { PokeApi } from '../services/poke.api.js';
import { Component } from './component.js';

export class PokePrint extends Component {
  template!: string;
  pokes: any;
  pokesNext: any;
  pokesNextInfo: any;
  pokesInfo: any;
  pokesPrev: any;
  pokesPrevInfo: any;
  api: PokeApi;

  constructor(public selector: string) {
    super();
    this.api = new PokeApi();
    this.pokes = [];
    this.pokesInfo = '';
    this.pokesNext = [];
    this.pokesNextInfo = '';
    this.pokesPrev = [];
    this.pokesPrevInfo = '';
    this.startFirstFetch();
  }

  async startFirstFetch() {
    this.pokes = await this.api.getPoke();

    const pokemonArr: any = [];
    this.pokes.results.forEach((item: any) => {
      pokemonArr.push(item.url);
    });

    this.pokesInfo = await Promise.all(
      pokemonArr.map((url: string) => fetch(url).then((r) => r.json()))
    );

    this.startNextFetchCycle();
    this.startPrevFetchCycle();
    this.manageComponent();
  }

  async startPrevFetchCycle() {
    this.pokesPrev = await this.api.getCustomPage(this.pokes.previous);

    const pokemonArrPrev: any = [];
    this.pokesPrev.results.forEach((item: any) => {
      pokemonArrPrev.push(item.url);
    });

    this.pokesPrevInfo = await Promise.all(
      pokemonArrPrev.map((url: string) => fetch(url).then((r) => r.json()))
    );
  }

  async startNextFetchCycle() {
    this.pokesNext = await this.api.getCustomPage(this.pokes.next);

    const pokemonArrNext: any = [];
    this.pokesNext.results.forEach((item: any) => {
      pokemonArrNext.push(item.url);
    });

    this.pokesNextInfo = await Promise.all(
      pokemonArrNext.map((url: string) => fetch(url).then((r) => r.json()))
    );
  }

  manageComponent(array = this.pokesInfo) {
    this.template = this.createTemplate(array);
    this.render(this.selector, this.template);
    this.handleGetPoke();

    const buttonNext = document.querySelector('.next');
    buttonNext?.addEventListener('click', () => {
      this.pokes = this.pokesNext;
      this.pokesInfo = this.pokesNextInfo;
      this.startNextFetchCycle();
      this.startPrevFetchCycle();
      this.manageComponent();
    });

    const buttonPrev = document.querySelector('.prev');
    buttonPrev?.addEventListener('click', () => {
      this.pokes = this.pokesPrev;
      this.pokesInfo = this.pokesPrevInfo;
      this.startNextFetchCycle();
      this.startPrevFetchCycle();
      this.manageComponent();
    });
  }

  createTemplate(array: any) {
    this.template = '';
    array.forEach((pokemon: any) => {
      this.template += `<h1>${pokemon.species.name}</h1>`;
      this.template += `<img src="${pokemon.sprites.other.dream_world.front_default}" alt="" id = "${pokemon.species.name}" width="100"/>`;
    });

    this.template += `<button type="submit" class="next">NEXT</button>`;
    this.template += `<button type="submit" class="prev">PREV</button>`;
    return this.template;
  }

  handleGetPoke() {
    const idItems = document.querySelectorAll('img');

    for (const item of idItems) {
      item.addEventListener('click', function (event: any) {
        console.log(item.id);
        localStorage.setItem(`PokeClick`, item.id);
        window.location.href = './details.html';
      });
    }
  }
}
