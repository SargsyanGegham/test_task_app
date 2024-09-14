import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getPokemon, getPokemons, PokemonResponse, PokemonsResponse } from '../thunks/dashboard';

export interface DataItem {
  name: string, 
  url: string,
  sprites: {
    front_default: string;
  }
}

interface DashboardState {
  loading: boolean;
  error: string | null;
  data: DataItem[];
  pokemon: PokemonResponse;
  count: number;
  limit: number;
}

const initialState: DashboardState = {
  loading: false,
  error: null,
  data: [],
  pokemon: {
    base_experience: 0,
    height: 0,
    weight: 0,
    name: '',
    sprites: {
      front_default: '',
    }
  },
  count: 0,
  limit: 10,
};

const DashboardSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPokemons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPokemons.fulfilled, (state, action: PayloadAction<PokemonsResponse>) => {
        state.loading = false;
        state.count = action.payload.count
        state.data = action.payload.results
      })
      .addCase(getPokemon.pending, (state) => {
        state.loading = true
      })
      .addCase(getPokemon.fulfilled, (state, action: PayloadAction<PokemonResponse>) => {
        state.pokemon = action.payload
        state.loading = false;
      })
      .addCase(getPokemons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
  },
});

export default DashboardSlice.reducer;
