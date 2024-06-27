/* tslint:disable */
/* eslint-disable */
/**
*/
export class Animal {
  free(): void;
/**
*/
  rotation: number;
/**
*/
  vision: Float32Array;
/**
*/
  x: number;
/**
*/
  y: number;
}
/**
*/
export class Food {
  free(): void;
/**
*/
  x: number;
/**
*/
  y: number;
}
/**
*/
export class Simulation {
  free(): void;
/**
* @param {any} config
*/
  constructor(config: any);
/**
* @returns {any}
*/
  static default_config(): any;
/**
* @returns {any}
*/
  config(): any;
/**
* @returns {World}
*/
  world(): World;
/**
* @returns {string | undefined}
*/
  step(): string | undefined;
/**
* @returns {string}
*/
  train(): string;
}
/**
*/
export class World {
  free(): void;
/**
*/
  animals: (Animal)[];
/**
*/
  foods: (Food)[];
}
