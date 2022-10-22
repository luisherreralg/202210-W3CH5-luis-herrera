// import { IPokes } from '../models/poke.interface.js';
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
    // this.createArrayOfPromises();
    // console.log(this.pokes);

    this.template = this.createTemplate();
    this.renderAdd(this.selector, this.template);
  }

  createTemplate() {
    this.template = '';

    // console.log(this.pokesInfo);
    this.pokesInfo.forEach((pokemon: any) => {
      // console.log(pokemon);
      this.template += `<h1>${pokemon.species.name}</h1>`;
      this.template += `<img src="${pokemon.sprites.front_default}" alt="" id = "${pokemon.species.name}" width="100"/>`;
    });

    return this.template;
  }
  handleGetPoke() {
    const idItems = document.querySelectorAll('img');
    // console.log(idItems, typeof idItems);
    // console.log(idItems[0]);
    // console.log(idItems[0].id); // bulvasur

    for (const item of idItems) {
      item.addEventListener('click', function (event: any) {
        // console.log(event);
        // console.log(item);
        console.log(item.id);
        localStorage.setItem(`PokeClick`, item.id);
        window.location.href = './details.html';
      });
    }
  }
}
