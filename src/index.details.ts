import { PokeDetailPrint } from './components/poke.print.details.js';

new PokeDetailPrint(
  'body',
  `https://pokeapi.co/api/v2/pokemon/${localStorage.getItem('PokeClick')}`
);
