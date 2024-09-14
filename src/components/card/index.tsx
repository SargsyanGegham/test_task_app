import { Card as MuiCard, CardMedia, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

interface CardState { 
  img: string;
  name: string;
}

export default function Card ({ img, name }: CardState) {
  const router = useRouter();

  const handleClickOnPokemon = (name: string) => () => {
    router.push(`dashboard/${name}`);
  };
  
  return (
    <MuiCard onClick={handleClickOnPokemon(name)} style={{ cursor: 'pointer' }}>
      <CardMedia
        sx={{ height: 250, width: 250 }}
        image={img}
      />
      <Typography textTransform="uppercase" align="center" m={2} color="textPrimary">{name}</Typography>
    </MuiCard>
  );
}