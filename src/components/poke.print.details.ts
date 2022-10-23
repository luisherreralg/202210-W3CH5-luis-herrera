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
    this.template += `<img src="${this.pokeDetails.sprites.other.dream_world.front_default}" alt="" />`;

    // STATS
    this.template += `<h2>STATS</h2>
<ul>
  <li>
    ${this.pokeDetails.stats[0].stat.name} -
    ${this.pokeDetails.stats[0].base_stat}
  </li>
  <li>
    ${this.pokeDetails.stats[1].stat.name} -
    ${this.pokeDetails.stats[1].base_stat}
  </li>
  <li>
    ${this.pokeDetails.stats[2].stat.name} -
    ${this.pokeDetails.stats[2].base_stat}
  </li>
</ul>`;

    // TYPES

    this.template += `<h2>TYPES</h2>
    <ul>
  <li>${this.pokeDetails.types[0].type.name}</li>
  <li>${this.pokeDetails.types[1].type.name}</li>
</ul>`;

    return this.template;
  }
}
