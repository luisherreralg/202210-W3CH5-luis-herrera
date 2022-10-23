import { Component } from './component.js';

export class Header extends Component {
  template: string;
  constructor(public selector: string) {
    super();
    this.template = this.createTemplate();
    this.renderAdd(this.selector, this.template);
  }
  createTemplate() {
    return `<header class='header'>
    <h1 style="display:none">POKÉDEX</h1>
    <img src="../src/assets/pokemon-logo.svg" alt="Pokemon Logo" class='header_img'/>
    </header>
    <section class='section'></section>`;
  }
}
