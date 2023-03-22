import { HeadCell } from "../../components/table/TableHeader";
import { StarShipModel } from "../../data-models/starship/StarShipModel";
import { Filters } from "./StarShipsTable";

export type Order = "desc" | "asc"

export const headCells: HeadCell<StarShipModel>[] = [
  {
    id: 'name',
    align: 'left',
    disablePadding: false,
    label: 'Nume',
    sortable: true,
  },
  {
    id: 'model',
    align: 'left',
    disablePadding: false,
    label: 'Model',
    sortable: true,
  },
  {
    id: 'length',
    align: 'left',
    disablePadding: false,
    label: 'Length',
    sortable: true,
  },
  {
    id: 'passengers',
    align: 'left',
    disablePadding: false,
    label: 'Passengers',
    sortable: true,
  },
  {
    id: 'cargoCapacity',
    align: 'left',
    disablePadding: false,
    label: 'Cargo capacity',
    sortable: true,
  },
  {
    id: 'created',
    align: 'left',
    disablePadding: false,
    label: 'Created',
    sortable: false,
  },
];

export function createData(ship: StarShipModel) {
  return {
    ...ship,
  };
}

export const getRows = (ships: StarShipModel[]) => ships.map((ship) => createData(ship));

export function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  let first = a[orderBy] as string | Date;
  let second = b[orderBy] as string | Date;

  if (second < first) {
    return -1;
  }
  if (second > first) {
    return 1;
  }
  return 0;
}

export function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const textFilter = (text: string, criteria: string) => {
  return text.toLowerCase().includes(criteria.toLowerCase());
}

const numberFilter = (number: number, criteria: number, comparator: '=' | '>' | '<') => {
  // console.log(number, criteria, comparator);
  if (isNaN(number)) return true;
  switch (comparator) {
    case '>':
      return number > criteria;
    case '<':
      return number < criteria;
    case '=':
      default:
      return number == criteria;
  }
};

const getFilterComparator = (value: string) => {
  if (value.includes('>')) return '>';
  if (value.includes('<')) return '<';

  return '=';
}

const getNumber = (value: string) => {
  const criteria = value.split(' ');

  if (criteria.length === 1) return parseInt(criteria[0]);
  if (criteria.length === 2) return parseInt(criteria[1]);

  return 0;
}

export const filterShips = (ships: StarShipModel[], filters: Filters) => {
  const keys = Object.keys(filters);

  return ships.filter((ship) => {
    const status = keys.every(key => {
      // @ts-ignore
      if (!filters[key]) return true;
      // @ts-ignore
      if (typeof ship[key] === 'string') return textFilter(ship[key], filters[key]);
      // @ts-ignore
      if (typeof ship[key] === 'number') return numberFilter(parseFloat(ship[key]), getNumber(filters[key]), getFilterComparator(filters[key]));
      return false
    });

    return status;
  })
}
