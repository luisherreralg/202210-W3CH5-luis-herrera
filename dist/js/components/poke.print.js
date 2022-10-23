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
export class PokePrint extends Component {
    constructor(selector) {
        super();
        this.selector = selector;
        this.api = new PokeApi();
        this.pokes = [];
        this.pokesInfo = '';
        this.pokesNext = [];
        this.pokesNextInfo = '';
        this.pokesPrev = [];
        this.pokesPrevInfo = '';
        this.startFirstFetch();
    }
    startFirstFetch() {
        return __awaiter(this, void 0, void 0, function* () {
            this.pokes = yield this.api.getPoke();
            const pokemonArr = [];
            this.pokes.results.forEach((item) => {
                pokemonArr.push(item.url);
            });
            this.pokesInfo = yield Promise.all(pokemonArr.map((url) => fetch(url).then((r) => r.json())));
            this.startNextFetchCycle();
            this.startPrevFetchCycle();
            this.manageComponent();
        });
    }
    startPrevFetchCycle() {
        return __awaiter(this, void 0, void 0, function* () {
            this.pokesPrev = yield this.api.getCustomPage(this.pokes.previous);
            const pokemonArrPrev = [];
            this.pokesPrev.results.forEach((item) => {
                pokemonArrPrev.push(item.url);
            });
            this.pokesPrevInfo = yield Promise.all(pokemonArrPrev.map((url) => fetch(url).then((r) => r.json())));
        });
    }
    startNextFetchCycle() {
        return __awaiter(this, void 0, void 0, function* () {
            this.pokesNext = yield this.api.getCustomPage(this.pokes.next);
            const pokemonArrNext = [];
            this.pokesNext.results.forEach((item) => {
                pokemonArrNext.push(item.url);
            });
            this.pokesNextInfo = yield Promise.all(pokemonArrNext.map((url) => fetch(url).then((r) => r.json())));
        });
    }
    manageComponent(array = this.pokesInfo) {
        this.template = this.createTemplate(array);
        this.render(this.selector, this.template);
        this.handleGetPoke();
        const buttonNext = document.querySelector('.next');
        buttonNext === null || buttonNext === void 0 ? void 0 : buttonNext.addEventListener('click', () => {
            this.pokes = this.pokesNext;
            this.pokesInfo = this.pokesNextInfo;
            this.startNextFetchCycle();
            this.startPrevFetchCycle();
            this.manageComponent();
        });
        const buttonPrev = document.querySelector('.prev');
        buttonPrev === null || buttonPrev === void 0 ? void 0 : buttonPrev.addEventListener('click', () => {
            this.pokes = this.pokesPrev;
            this.pokesInfo = this.pokesPrevInfo;
            this.startNextFetchCycle();
            this.startPrevFetchCycle();
            this.manageComponent();
        });
    }
    createTemplate(array) {
        this.template = '';
        array.forEach((pokemon) => {
            this.template += `<h1>${pokemon.species.name}</h1>`;
            this.template += `<img src="${pokemon.sprites.other.dream_world.front_default}" alt="" id = "${pokemon.species.name}" width="100"/>`;
        });
        this.template += `<button type="submit" class="next">NEXT</button>`;
        this.template += `<button type="submit" class="prev">PREV</button>`;
        return this.template;
    }
    handleGetPoke() {
        const idItems = document.querySelectorAll('img');
        for (const item of idItems) {
            item.addEventListener('click', function (event) {
                localStorage.setItem(`PokeClick`, item.id);
                window.location.href = './details.html';
            });
        }
    }
}
