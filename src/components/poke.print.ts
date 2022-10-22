import { PokeApi } from '../services/poke.api.js';
import { Component } from './component.js';

export class PokePrint extends Component {
  template!: string;
  pokes: any;
  pokesInfo: any;
  api: PokeApi;

  constructor(public selector: string) {
    super();
    this.api = new PokeApi();
    this.pokes = [];
    this.pokesInfo = '';
    this.startFetch();
  }

  async startFetch() {
    this.pokes = await this.api.getPoke();
    console.log(this.pokes);

    const pokemonArr: any = [];
    this.pokes.results.forEach((item: any) => {
      pokemonArr.push(item.url);
    });

    this.pokesInfo = await Promise.all(
      pokemonArr.map((url: string) => fetch(url).then((r) => r.json()))
    );
    this.manageComponent();
    this.handleGetPoke();
  }

  manageComponent() {
    this.template = this.createTemplate();
    this.renderAdd(this.selector, this.template);
  }

  createTemplate() {
    this.template = '';
    this.pokesInfo.forEach((pokemon: any) => {
      this.template += `<h1>${pokemon.species.name}</h1>`;
      this.template += `<img src="${pokemon.sprites.other.dream_world.front_default}" alt="" id = "${pokemon.species.name}" width="100"/>`;
    });

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
