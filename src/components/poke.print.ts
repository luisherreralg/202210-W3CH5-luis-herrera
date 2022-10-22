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
      this.template += `<a href="./details.html"><img src="${pokemon.sprites.front_default}" alt="" width="100"/></a>`;
    });

    return this.template;
  }

  handleGetPoke() {
    const title = (document.querySelector('#title') as HTMLInputElement).value;
    const responsible = (document.querySelector('#resp') as HTMLInputElement)
      .value;
    this.tasks.push(new Task(title, responsible));
    this.storeService.setStore(this.tasks);
    this.manageComponent();
  }

  // async createArrayOfPromises() {}
}
