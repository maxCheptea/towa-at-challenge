import {
  Box,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TextField,
} from '@mui/material';
import { StarShipModel } from '../../data-models/starship/StarShipModel';
import TableHeading from '../../components/table/TableHeader';
import {
  Order,
  getComparator,
  getRows,
  headCells,
  stableSort,
  filterShips,
} from './starShipsService';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const filterObject = {
  name: null,
  model: null,
  length: null,
  passengers: null,
  cargoCapacity: null,
  created: null,
};

export type Filters = typeof filterObject;

interface IStarShipsTable {
  starShips: StarShipModel[];
}

export default function StarShipsTable({ starShips }: IStarShipsTable) {
  const [filterKeys, setFilterKeys] = useState(filterObject);

  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState('name');

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof StarShipModel
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const newFilters = { ...filterKeys, [name]: value };

    setFilterKeys(newFilters);
  };

  useEffect(() => {}, [filterKeys]);

  return (
    <Box>
      <TableContainer
        sx={{
          width: '100%',
          overflowX: 'auto',
          position: 'relative',
          display: 'block',
          maxWidth: '100%',
          '& td, & th': { whiteSpace: 'nowrap' },
        }}
      >
        <Table
          aria-labelledby='tableTitle'
          sx={{
            '& .MuiTableCell-root:first-of-type': {
              pl: 2,
            },
            '& .MuiTableCell-root:last-child': {
              pr: 3,
            },
          }}
        >
          <TableHeading
            headCells={headCells}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
          />
          <TableBody>
            <TableRow
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
              }}
            >
              <TableCell component='th' scope='row' align='left'>
                <TextField
                  id='name-filter'
                  label='Filter by name'
                  variant='standard'
                  name='name'
                  onChange={handleFilterChange}
                />
              </TableCell>
              <TableCell component='th' scope='row' align='left'>
                <TextField
                  id='model-filter'
                  label='Filter by model'
                  variant='standard'
                  name='model'
                  onChange={handleFilterChange}
                />
              </TableCell>
              <TableCell component='th' scope='row' align='left'>
                <TextField
                  id='length-filter'
                  label='Filter by length'
                  variant='standard'
                  name='length'
                  onChange={handleFilterChange}
                />
              </TableCell>
              <TableCell component='th' scope='row' align='left'>
                <TextField
                  id='passengers-filter'
                  label='Filter by passengers'
                  variant='standard'
                  name='cargoCapacity'
                  onChange={handleFilterChange}
                />
              </TableCell>
              <TableCell component='th' scope='row' align='left'></TableCell>
            </TableRow>
            {stableSort(
              getRows(filterShips(starShips, filterKeys)),
              getComparator(order, orderBy)
            ).map((row, index) => {
              return (
                <TableRow
                  hover
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                  }}
                  tabIndex={-1}
                  key={`${row.name}-${index}`}
                >
                  <TableCell component='th' scope='row' align='left'>
                    {row.name}
                  </TableCell>
                  <TableCell component='th' scope='row' align='left'>
                    {row.model}
                  </TableCell>
                  <TableCell component='th' scope='row' align='left'>
                    {row.length}
                  </TableCell>
                  <TableCell component='th' scope='row' align='left'>
                    {row.passengers}
                  </TableCell>
                  <TableCell component='th' scope='row' align='left'>
                    {row.cargoCapacity}
                  </TableCell>
                  <TableCell component='th' scope='row' align='left'>
                    {row.created}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component='div'
        count={cities.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
    </Box>
  );
}

StarShipsTable.propTypes = {
  starShips: PropTypes.array,
};
