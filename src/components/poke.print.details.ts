import { PokeApi } from '../services/poke.api.js';
import { Component } from './component.js';

export class PokeDetailPrint extends Component {
  template!: string;
  pokeDetails: any;
  api: PokeApi;
  constructor(public selector: string, public customURL: string) {
    super();
    this.api = new PokeApi();
    this.pokeDetails = [];
    this.startFetch();
  }

  async startFetch() {
    this.pokeDetails = await this.api.getPokeDetails(this.customURL);
    this.manageComponent();
  }

  manageComponent() {
    this.template = this.createTemplate();
    this.renderAdd(this.selector, this.template);
  }

  createTemplate() {
    this.template = '';
    console.log(this.pokeDetails);
    this.template += `<h1>${this.pokeDetails.species.name}</h1>`;
    this.template += `<img src="${this.pokeDetails.sprites.other.home.front_default}" alt="" />`;

    return this.template;
  }

  // async createArrayOfPromises() {}
}
