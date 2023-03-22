import { ResponseModel } from '../../data-models/ResponseModel';
import { StarShipModel } from './StarShipModel';

export interface StarShipResponseModel {
  name: string;
  model: string;
  length: string;
  passengers: string;
  cargo_capacity: string;
  created: string;
}

export default interface StarShipResponse extends ResponseModel {
  data?: StarShipModel;
}

export interface StarShipsResponse extends ResponseModel {
  data: StarShipModel[];
}
