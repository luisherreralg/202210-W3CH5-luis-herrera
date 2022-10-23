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
    this.render(this.selector, this.template);
    this.createStats();
  }

  createTemplate() {
    this.template = '';
    this.template += '<article class="pokemon">';
    this.template += `<h2 class="pokemon__h2">${this.pokeDetails.species.name}</h2>`;
    this.template += `<img src="${this.pokeDetails.sprites.other.dream_world.front_default}" alt="Pokemon image" class="pokemon__img"/>`;
    this.createStats();
    this.createTypes();
    return this.template;
  }

  createStats() {
    this.template +=
      '<div class="pokemon__div"><h3 class="pokemon__h3">STATS</h3> <ul>';
    this.pokeDetails.stats.forEach((item: any) => {
      this.template += `<li>${item.stat.name} - ${item.base_stat}</li>`;
    });
    this.template += `</ul>`;
    return this.template;
  }

  createTypes() {
    this.template += '<h3 class="pokemon__h3">TYPES</h3> <ul>';
    this.pokeDetails.types.forEach((item: any) => {
      this.template += `<li>${item.type.name}</li>`;
    });
    this.template += `</ul></div></article>`;
    return this.template;
  }
}
