var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { PokeApi } from '../services/poke.api.js';
import { Component } from './component.js';
export class PokeDetailPrint extends Component {
    constructor(selector, customURL) {
        super();
        this.selector = selector;
        this.customURL = customURL;
        this.api = new PokeApi();
        this.pokeDetails = [];
        this.startFetch();
    }
    startFetch() {
        return __awaiter(this, void 0, void 0, function* () {
            this.pokeDetails = yield this.api.getPokeDetails(this.customURL);
            this.manageComponent();
        });
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
        this.pokeDetails.stats.forEach((item) => {
            this.template += `<li>${item.stat.name} - ${item.base_stat}</li>`;
        });
        this.template += `</ul>`;
        return this.template;
    }
    createTypes() {
        this.template += '<h3 class="pokemon__h3">TYPES</h3> <ul>';
        this.pokeDetails.types.forEach((item) => {
            this.template += `<li>${item.type.name}</li>`;
        });
        this.template += `</ul></div></article>`;
        return this.template;
    }
}
