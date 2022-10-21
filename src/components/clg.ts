import { PokeApi } from '../services/poke.api.js';
import { Component } from './component.js';

export class Clg extends Component {
  template!: any;
  pokes: any;
  api: PokeApi;
  constructor(public selector: string) {
    super();
    this.api = new PokeApi();
    this.pokes = '';

    this.startPrint();
  }

  async startPrint() {
    this.pokes = await this.api.getPoke();
    this.manageComponent();
  }

  manageComponent() {
    console.log(this.pokes);
    this.template = this.createTemplate();
    this.renderAdd(this.selector, this.template);
  }

  createTemplate() {
    this.template = '';
    this.pokes.results.forEach((pokemon: any) => {
      this.template += `<h1>${pokemon.name}</h1>`;
    });
    return this.template;
  }
}
