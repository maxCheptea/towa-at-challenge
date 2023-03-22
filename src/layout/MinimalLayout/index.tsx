import { Outlet } from 'react-router-dom';
import ShipsAppBar from '../../components/general/AppBar';
import { Container, Grid } from '@mui/material';

// ==============================|| MINIMAL LAYOUT ||============================== //

const MinimalLayout = () => (
  <>
    <ShipsAppBar />
    <Container maxWidth='xl'>
      <Grid container columnSpacing={2}>
        <Grid item xs={12} md={12} lg={12}>
          <Outlet />
        </Grid>
      </Grid>
    </Container>
  </>
);

export default MinimalLayout;
