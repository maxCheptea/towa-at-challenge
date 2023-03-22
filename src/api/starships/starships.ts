import axios from 'axios';
import { StarShipsResponse } from '../../data-models/starship/StarShipResponseModel';
import { mapStarShipResponseToModel } from '../../data-models/starship/mapStarShipResponseToModel';

const API_ENDPOINT = 'https://swapi.dev/api/starships';

export const getAllStarShips = async (page?: number): Promise<StarShipsResponse> => {
  try {
    // const { data } = await axios.get(API_ENDPOINT);
    const { data } = await axios.get(`${API_ENDPOINT}?${page ? `page=${page}` : ''}`);

    return { data: data.results.map(mapStarShipResponseToModel), status: 200 };
  } catch (error) {
    return { data: [], status: (error as any).response.status };
  }
};