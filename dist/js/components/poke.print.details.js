var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Component } from './component.js';
export class PokeDetailPrint extends Component {
    constructor(selector, customURL) {
        super();
        this.selector = selector;
        this.customURL = customURL;
        this.pokeDetails = [];
        this.startFetch();
    }
    startFetch() {
        return __awaiter(this, void 0, void 0, function* () {
            this.pokeDetails = fetch(this.customURL).then((response) => response.json());
            console.log(this.pokeDetails);
            // this.manageComponent();
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
        this.pokeDetails.forEach((pokemon) => {
            // console.log(pokemon);
            this.template += `<h1>${pokemon.species.name}</h1>`;
        });
        return this.template;
    }
}
