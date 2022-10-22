export class PokeApi {
  urlDefault: string;
  constructor() {
    this.urlDefault = 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0';
  }

  // read / get
  getPoke(): Promise<Array<PokeApi>> {
    return fetch(this.urlDefault).then((response) => response.json());
  }

  getPokeDetails(customURL: string): Promise<string> {
    return fetch(customURL).then((response) => response.json());
  }

  // getPokeInfo(urlInfo: string) {
  //   return fetch(this.urlInfo).then((response) => response.json());
  // }
  // getPokeImg(): Promise<Array<PokeApi>> {
  //   return fetch('https://pokeapi.co/api/v2/pokemon/1/').then((response) =>
  //     response.json()
  //   );
  // }

  // // create / post
  // createPoke(task: PokeApi): Promise<PokeApi> {
  //   return fetch(this.url, {
  //     method: 'POST',
  //     body: JSON.stringify(task),
  //     headers: {
  //       'content-type': 'application/json',
  //     },
  //   }).then((response) => response.json());
  // }

  // // delete
  // deletePoke(id: number): Promise<Response> {
  //   return fetch(`${this.url}/${id}`, {
  //     method: 'DELETE',
  //   });
  // }

  // // uptate / patch
  // updatePoke(id: number, partialTask: Partial<PokeApi>): Promise<PokeApi> {
  //   return fetch(`${this.url}/${id}`, {
  //     method: 'PATCH',
  //     body: JSON.stringify(partialTask),
  //     headers: {
  //       'content-type': 'application/json',
  //     },
  //   }).then((response) => response.json());
  // }
}
