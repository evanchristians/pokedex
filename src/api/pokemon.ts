import { Type } from "../components/TypeBadge";
import * as constants from "../common/constants";

export type PokemonListItem = {
  name: string;
  url: string;
};

export interface Pokemon {
  id: number;
  name: string;
  image: string;
  lg_image: string;
  gif: string;
  types: {
    slot: number;
    type: {
      name: Type;
      url: string;
    };
  }[];
}

export const get = async (id: string) => {
  const response = await fetch(`${constants.BASE_URL}/${id}`);
  const data = (await response.json()) as Pokemon;
  const { name } = data;
  const image = `${constants.BASE_IMAGE_URL}/${id}.png`;
  const gif = `${constants.BASE_IMAGE_URL}/versions/generation-v/black-white/animated/${id}.gif`;
  const lg_image = `${constants.BASE_IMAGE_URL}/other/dream-world/${id}.svg`;
  // make types unique
  const types = data.types.filter(
    (type, index, self) =>
      index === self.findIndex((t) => t.type.name === type.type.name)
  );
  return {
    id,
    name,
    image,
    gif,
    types,
    lg_image,
  };
};

export const all = async (from: number = 0, to: number = 500) => {
  const response = await fetch(
    `${constants.BASE_URL}?offset=${from}&limit=${to}`
  );
  const data = (await response.json()) as { results: PokemonListItem[] };
  data.results = data.results.map((item) => {
    const id = item.url.split("/")[6];
    return {
      ...item,
      id,
      image: `${constants.BASE_IMAGE_URL}/${id}.png`,
    };
  });
  return data.results;
};

export const allWithData = async (from: number = 0, to: number = 500) => {
  const response = await fetch(
    `${constants.BASE_URL}?offset=${from}&limit=${to}`
  );
  const data = await response.json();
  data.results = await Promise.all(
    data.results.map(async (item: PokemonListItem) => {
      const id = item.url.split("/")[6];
      const pokemon = await get(id);
      return {
        ...item,
        ...pokemon,
      };
    })
  );
  return data.results;
};
