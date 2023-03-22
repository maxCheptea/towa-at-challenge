import { useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import { StarShipModel } from '../../data-models/starship/StarShipModel';
import { getAllStarShips } from '../../api/starships/starships';
import StarShipsTable from './StarShipsTable';

// ==============================|| StarShipsPage - LIST ||============================== //

const StarShipsPage = () => {
  const [starShips, setStarShips] = useState<StarShipModel[]>([]);
  console.log(11);

  useEffect(() => {
    getAllStarShips().then(({ data }) => {
      setStarShips(data);
    });
  }, []);

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant='h5'>StarShipsPage</Typography>
      </Grid>
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <StarShipsTable starShips={starShips} />
      </Grid>
    </Grid>
  );
};

export default StarShipsPage;
