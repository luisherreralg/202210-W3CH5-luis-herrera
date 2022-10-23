var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
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
    this.pokes = '';
    this.startPrint();
  }
  startPrint() {
    return __awaiter(this, void 0, void 0, function* () {
      this.pokes = yield this.api.getPoke();
      this.manageComponent();
    });
  }
  manageComponent() {
    console.log(this.pokes);
    this.template = this.createTemplate();
    this.renderAdd(this.selector, this.template);
  }
  createTemplate() {
    this.template = '';
    this.pokes.results.forEach((pokemon) => {
      this.template += `<h1>${pokemon.name}</h1>`;
    });
    return this.template;
  }
}
