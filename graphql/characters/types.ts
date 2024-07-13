import { Episode } from "../episodes/types";
import { Location } from "../locations/types";

/**
 * Represents a character in the Rick and Morty universe.
 */
export interface Character {
    id: string;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: Location;
    location: Location;
    image: string;
    episode: Episode[];
    created: string;
  }
  
  /**
   * Represents the data structure for characters query.
   */
  export interface CharactersData {
    characters: {
      info: {
        count: number;
        pages: number;
        next: number | null;
        prev: number | null;
      };
      results: Character[];
    };
  }