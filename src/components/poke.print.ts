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
    const idItems = document.querySelectorAll('img >id');
    console.log(idItems, typeof idItems);
    idItems.forEach((item) => {
      item.addEventListener('click', (e) => {
        console.log('Hola' + item.id);
      });
    });
    // document.querySelectorAll('id').forEach((a) => {
    //   a.addEventListener('click', (e: Event) => {
    //     // Retrieve id from clicked element
    //     const elementId = e.target.id;
    //     // If element has id
    //     if (elementId !== '') {
    //       console.log(elementId);
    //     }
    //     // If element has no id
    //     else {
    //       console.log('An element without an id was clicked.');
    //     }
    //     console.log('A link was clicked');
    //   });
    // });

    this.manageComponent();
  }

  // async createArrayOfPromises() {}
}
