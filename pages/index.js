import React from 'react';
import { DataTableBase } from '../components/Table';

const columns = [
  {
    name: 'Title',
    selector: (row) => row.title,
    sortable: true,
  },
  {
    name: 'Year',
    selector: (row) => row.year,
    sortable: true,
  },
  {
    name: 'Another Title',
    selector: (row) => row.another,
    sortable: true,
  },
];

const items = [
  {
    id: 1,
    title: 'Beetlejuice',
    year: '1988',
    another: 'Cool thing',
  },
  {
    id: 2,
    title: 'Ghostbusters',
    year: '1984',
    another: 'Something else!',
  },
  {
    id: 3,
    title: 'Ghostbusters',
    year: '1984',
    another: 'Something else!',
  },
];

const Home = () => (
  <>
    <h1>Table</h1>

    <DataTableBase
      title="Cool Film Stuff"
      columns={columns}
      data={items}
      selectableRows
      expandableRows
      selectableRowsHighlight
    />
  </>
);

export default Home;
