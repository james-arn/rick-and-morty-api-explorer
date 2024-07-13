import { Character } from "../characters/types";

/**
 * Represents a location in the Rick and Morty universe.
 */
export interface Location {
    id: string;
    name: string;
    type: string;
    dimension: string;
    residents: Character[];
    created: string;
  }
  
  /**
   * Represents the data structure for locations query.
   */
  export interface LocationsData {
    locations: {
      info: {
        count: number;
        pages: number;
        next: number | null;
        prev: number | null;
      };
      results: Location[];
    };
  }