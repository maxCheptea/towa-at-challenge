import { StarShipModel } from "./StarShipModel";
import { StarShipResponseModel } from "./StarShipResponseModel";

export const mapStarShipResponseToModel = (ship: StarShipResponseModel): StarShipModel => ({
  name: ship.name,
  model: ship.model,
  length: parseFloat(ship.length),
  passengers: parseInt(ship.passengers),
  cargoCapacity: parseInt(ship.cargo_capacity),
  created: ship.created,
});
