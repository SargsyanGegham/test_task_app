"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { getPokemon } from "@/store/thunks/dashboard";
import { Box, Breadcrumbs, Typography } from "@mui/material";
import Link from "next/link";

export default function RecordPage({ params }: { params: { id: string } }) {
  const { loading, pokemon, error } = useSelector((state: RootState) => state.dashboard)
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getPokemon({ id: params.id }))
  }, [dispatch, params.id])
  

  if (loading) return <Typography align="center">Loading...</Typography>;

  if (error) return <Typography color="error" align="center">{error}</Typography>;

  return (
    <Box>
      <Box m={3}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="inherit" href="/dashboard" >
            Dashboard
          </Link>
          <Typography textTransform="capitalize" sx={{ color: 'text.primary' }}>{ params.id } </Typography>
        </Breadcrumbs>
      </Box>
      <Typography fontWeight={800} fontSize={52} align="center" textTransform="capitalize" m={5}>{pokemon.name}</Typography>
      <Box display="flex" gap={5} alignItems="center">
        <img src={pokemon.sprites.front_default} alt={pokemon.name} width={300} height={300}/>
        <Box display="flex" flexWrap="wrap" gap={5}>
          <Typography>Height: <b>{pokemon.height}</b></Typography>
          <Typography>Weight: <b>{pokemon.weight}</b></Typography>
          <Typography>Base Experience: <b>{pokemon.base_experience}</b></Typography>
        </Box>
       </Box>
    </Box>
  );
}
