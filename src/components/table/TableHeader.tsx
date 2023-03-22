import PropTypes from 'prop-types';
import { TableCell, TableCellProps, TableHead, TableRow, TableSortLabel } from "@mui/material";

export type Order = 'asc' | 'desc';

export interface HeadCell<T> {
  disablePadding: boolean;
  id: keyof T | 'actions';
  label: string;
  align: any;
  sortable?: boolean;
  isDateFormat?: boolean;
}

export interface TableHeadProps<T> {
  order: Order;
  orderBy: string;
  onRequestSort: (event: any, data: any) => void,
  headCells: HeadCell<T>[]
};

// ==============================|| GENERIC TABLE HEADER ||============================== //

const TableHeading = <T extends unknown>({ headCells, order, orderBy, onRequestSort }: TableHeadProps<T>) => {
  const createSortHandler = (property: HeadCell<T>['id']) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell, index: number) => (
          <TableCell
            key={`${String(headCell.id)}-${index}`}
            align={headCell.align as TableCellProps['align']}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {
              headCell.sortable
              ? <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : 'asc'}
                  onClick={createSortHandler(headCell.id)}
                  >
                    {headCell.label}
                </TableSortLabel>
              : <span>{headCell.label}</span>
            }
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

TableHeading.propTypes = {
  order: PropTypes.string,
  orderBy: PropTypes.string,
  headCells: PropTypes.array,
  onRequestSort: PropTypes.func,
};

export default TableHeading;
