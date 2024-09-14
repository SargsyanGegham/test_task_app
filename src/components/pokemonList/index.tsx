import React, { useState, useEffect, useMemo } from 'react';
import { Box, Pagination, Typography } from '@mui/material';
import { getPokemons } from '@/store/thunks/dashboard';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { DataItem } from '@/store/slices/dashboard';
import Card from '@/components/card';

export default function PokemonList () {
  const { limit, count, data } = useSelector((state: RootState) => state.dashboard);
  const dispatch = useDispatch<AppDispatch>()

  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    dispatch(getPokemons({ limit, offset: currentPage * limit}))
  }, [currentPage, dispatch, limit]);
  
  const handleChange = (_: unknown, page: number) => {
   setCurrentPage(page);
  };

  const totalPages = useMemo(() => Math.ceil(count / limit), [count, limit]);

  return (
    <Box>
      <Typography fontSize={42} color="secondary" align='center' margin={5}>Pokemons</Typography>
      <Box display='flex' flexWrap="wrap" gap={5} justifyContent="center">
        {data.map((item: DataItem) => <Card key={item.url} img={item.sprites.front_default} name={item.name} />)}
      </Box>
      <Box mt={10} mb={5} display="flex" justifyContent="center">
        <Pagination size="large" count={totalPages} page={currentPage} onChange={handleChange} />
      </Box>
    </Box>
  );
};
