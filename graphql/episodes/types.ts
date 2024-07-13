import { Character } from "../characters/types";

/**
 * Represents an episode in the Rick and Morty universe.
 */
export interface Episode {
    id: string;
    name: string;
    air_date: string;
    episode: string;
    characters: Character[];
    created: string;
  }
  
  /**
   * Represents the data structure for episodes query.
   */
  export interface EpisodesData {
    episodes: {
      info: {
        count: number;
        pages: number;
        next: number | null;
        prev: number | null;
      };
      results: Episode[];
    };
  }