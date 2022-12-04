export interface Isochrone {
  features: IsochroneFeature[]
}

export interface IsochroneFeature {
  type: string;
  geometry: {
    coordinates: [number, number][][];
  }
}
