import { IResults } from '../models/poke.interface.js';
import { PokeApi } from '../services/poke.api.js';
import { Component } from './component.js';

export class PokePrint extends Component {
  template!: string;
  pokes: any;
  pokesNext: any;
  pokesNextInfo: Array<string>;
  pokesInfo: Array<string>;
  pokesPrev: any;
  pokesPrevInfo: Array<string>;
  api: PokeApi;
  paginationData: Array<number>;

  constructor(public selector: string) {
    super();
    this.api = new PokeApi();
    this.pokes = [];
    this.pokesInfo = [];
    this.pokesNext = [];
    this.pokesNextInfo = [];
    this.pokesPrev = [];
    this.pokesPrevInfo = [];
    this.startFirstFetch();
    this.paginationData = [20, 0];
  }

  async startFirstFetch() {
    this.pokes = await this.api.getPoke();
    this.paginationData[1] = this.pokes.count;

    const pokemonArr: Array<string> = [];
    this.pokes.results.forEach((item: IResults) => {
      pokemonArr.push(item.url);
    });

    this.pokesInfo = await Promise.all(
      pokemonArr.map((url: string) => fetch(url).then((r) => r.json()))
    );

    this.startNextFetchCycle();
    this.manageComponent();
  }

  async startPrevFetchCycle() {
    this.pokesPrev = await this.api.getCustomPage(this.pokes.previous);

    const pokemonArrPrev: Array<string> = [];
    this.pokesPrev.results.forEach((item: IResults) => {
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

  manageComponent() {
    this.template = this.createTemplate();
    this.render(this.selector, this.template);
    this.handleGetPoke();
    this.buttons();
  }

  createTemplate() {
    this.template = '';
    this.pokesInfo.forEach((pokemon: any) => {
      this.template += `<div class="pokemon">`;
      this.template += `<h2 class="pokemon__h2">${pokemon.species.name}</h2>`;
      this.template += `<img src="${pokemon.sprites.other.dream_world.front_default}" alt="Pokemon Image" id = "${pokemon.species.name}" width="100" class="pokemon__img"/>`;
      this.template += `</div>`;
    });
    this.template += `<div class='pokemon__buttons'><button type="submit" class="pokemon__buttons__prev"><</button>`;
    this.template += `<p class='pokemon__buttons__p'>${this.paginationData[0]} / ${this.paginationData[1]}</p>`;
    this.template += `<button type="submit" class="pokemon__buttons__next">></button></div>`;
    return this.template;
  }

  handleGetPoke() {
    const idItems = document.querySelectorAll('img');

    for (const item of idItems) {
      item.addEventListener('click', function () {
        localStorage.setItem(`PokeClick`, item.id);
        window.location.href = './details.html';
      });
    }
  }

  buttons() {
    const buttonNext = document.querySelector('.pokemon__buttons__next');
    buttonNext?.addEventListener('click', () => {
      this.paginationData[0] += 20;
      this.pokes = this.pokesNext;
      this.pokesInfo = this.pokesNextInfo;
      this.startNextFetchCycle();
      this.startPrevFetchCycle();
      this.manageComponent();
    });

    if (this.paginationData[0] > 20) {
      const buttonPrev = document.querySelector('.pokemon__buttons__prev');
      buttonPrev?.addEventListener('click', () => {
        this.paginationData[0] -= 20;
        this.pokes = this.pokesPrev;
        this.pokesInfo = this.pokesPrevInfo;
        this.startNextFetchCycle();
        this.startPrevFetchCycle();
        this.manageComponent();
      });
    }
  }
}
