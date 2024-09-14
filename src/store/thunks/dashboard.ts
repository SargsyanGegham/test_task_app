import pureClient from '@/services';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { DataItem } from '../slices/dashboard';
import { AxiosResponse } from 'axios';

interface PokemonsRequest {
  limit: number;
  offset: number;
}

export interface PokemonsResponse {
  count: number;
  results: DataItem[];
}

export const getPokemons = createAsyncThunk<PokemonsResponse, PokemonsRequest>(
  'dashboard/pokemons',
  async ({ limit, offset }, { rejectWithValue }) => {
    try {
      const result: AxiosResponse<PokemonsResponse> = await pureClient.get(`/pokemon?limit=${limit}&offset=${offset}`);

      const pokemonDetails = await Promise.all(
        result.data.results.map(async (pokemon: DataItem) => {
          const detailResponse: AxiosResponse<DataItem> = await pureClient.get(`/pokemon/${pokemon.name}`);
          return detailResponse.data;
        })
      );

      const resultsWithSprites = result.data.results.map((item, index) => ({
        ...item,
        sprites: pokemonDetails[index].sprites
      }));

      return {
        count: result.data.count,
        results: resultsWithSprites
      };
    } catch (error) {
      return rejectWithValue('Failed to fetch pokemons');
    }
  }
);

export interface PokemonResponse {
  base_experience: number;
  height: number;
  weight: number;
  name: string
  sprites: {
    front_default: string;
  }
}

interface PokemonRequest {
  id: string
}

export const getPokemon = createAsyncThunk<PokemonResponse, PokemonRequest>(
  'dashboard/pokemon',
  async ({ id }, { rejectWithValue }) => {
    try {
      const detailResponse: AxiosResponse<PokemonResponse> = await pureClient.get(`/pokemon/${id}`);
      
      return detailResponse.data;
    } catch (error) {
      return rejectWithValue('Failed to fetch pokemons');
    }
  }
);