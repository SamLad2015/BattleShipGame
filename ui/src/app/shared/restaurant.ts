export class Restaurant {
  id: number;
  name: string;
  address: string;
  cuisine: string[];
  cuisineTagIds: number[];
  familyFriendly: boolean;
  veganOptions: boolean;
  rating: number;
}

export class Cuisine {
  id: number;
  name: string;
}
