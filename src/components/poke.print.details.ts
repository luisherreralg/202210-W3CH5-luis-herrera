import { Component } from './component.js';

export class PokeDetailPrint extends Component {
  template!: string;
  pokeDetails: any;
  constructor(public selector: string, public customURL: string) {
    super();
    this.pokeDetails = [];

    this.startFetch();
  }

  async startFetch() {
    this.pokeDetails = fetch(this.customURL).then((response) =>
      response.json()
    );
    console.log(this.pokeDetails);
    // this.manageComponent();
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
    this.pokeDetails.forEach((pokemon: any) => {
      // console.log(pokemon);
      this.template += `<h1>${pokemon.species.name}</h1>`;
    });

    return this.template;
  }

  // async createArrayOfPromises() {}
}
