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
  weight: number;
  height: number;
  base_experience: number;
  gif: string;
  species: {
    name: string;
    url: string;
  };
  types: {
    slot: number;
    type: {
      name: Type;
      url: string;
    };
  }[];
  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }[];
  flavour_text: string;
}

export const get = async (id: string) => {
  const data = (await fetch(`${constants.BASE_URL}/${id}`).then((res) =>
    res.json()
  )) as Pokemon;
  const { name, stats, weight, height, base_experience } = data;
  const speciesResponse = await fetch(data.species.url).then((res) =>
    res.json()
  );

  return {
    id,
    name,
    stats,
    weight,
    height,
    base_experience,
    image: `${constants.BASE_IMAGE_URL}/${id}.png`,
    gif: `${constants.BASE_IMAGE_URL}/versions/generation-v/black-white/animated/${id}.gif`,
    lg_image: `${constants.BASE_IMAGE_URL}/other/dream-world/${id}.svg`,

    types: data.types.filter(
      (type, index, self) =>
        index === self.findIndex((t) => t.type.name === type.type.name)
    ),
    flavour_text: speciesResponse.flavor_text_entries
      .find((entry: any) => entry.language.name === "en")
      .flavor_text.replace("", " "),
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
