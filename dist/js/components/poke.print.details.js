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
        this.renderAdd(this.selector, this.template);
    }
    createTemplate() {
        this.template = '';
        console.log(this.pokeDetails);
        this.template += `<h1>${this.pokeDetails.species.name}</h1>`;
        this.template += `<img src="${this.pokeDetails.sprites.other.home.front_default}" alt="" />`;
        return this.template;
    }
}
