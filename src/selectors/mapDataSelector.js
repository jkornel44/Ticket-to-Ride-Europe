import { cities } from '../constants/cities';
import { connections } from '../constants/connections';

export const importCities = cities;
export const importConnections = connections;

export const getCities = state => state.mapData.cities;
export const getConnections = state => state.mapData.connections; 
export const getSelectedDestinationFrom = state => state.mapData.from;
export const getSelectedDestinationTo = state => state.mapData.to;

