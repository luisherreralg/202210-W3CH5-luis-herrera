import { Component } from './component.js';
export class Header extends Component {
    constructor(selector) {
        super();
        this.selector = selector;
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
