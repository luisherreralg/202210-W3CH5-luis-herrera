var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// import { IPokes } from '../models/poke.interface.js';
import { PokeApi } from '../services/poke.api.js';
import { Component } from './component.js';
export class PokePrint extends Component {
    constructor(selector) {
        super();
        this.selector = selector;
        this.api = new PokeApi();
        this.pokes = [];
        this.pokesInfo = '';
        this.startFetch();
    }
    startFetch() {
        return __awaiter(this, void 0, void 0, function* () {
            this.pokes = yield this.api.getPoke();
            console.log(this.pokes);
            const pokemonArr = [];
            this.pokes.results.forEach((item) => {
                pokemonArr.push(item.url);
            });
            this.pokesInfo = yield Promise.all(pokemonArr.map((url) => fetch(url).then((r) => r.json())));
            this.manageComponent();
            this.handleGetPoke();
        });
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
        this.pokesInfo.forEach((pokemon) => {
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
}
