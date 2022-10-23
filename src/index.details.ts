import { Header } from './components/header.js';
import { PokeDetailPrint } from './components/poke.print.details.js';

new Header('body');

new PokeDetailPrint(
  'section.section',
  `https://pokeapi.co/api/v2/pokemon/${localStorage.getItem('PokeClick')}`
);
