# @naum_d/material-ui-table

`material-ui-table` is a library which help to work with material-ui tables and improve developing experience by
 adding fully customisable component with multiple props. Note this library required `@material-ui/core`.

## Install

```bash
npm install --save @naum_d/material-ui-table
```

```bash
yarn add @naum_d/material-ui-table
```

## Usage
To start work, you should just import `MUITable` component from `@naum_d/material-ui-table`
```jsx
import React from 'react';
import MUITable from '@naum_d/material-ui-table';

const Heroes = () => {
  const table = [
    { name: 'Tony', surname: 'Stark', nickname: 'Iron Man' },
    { name: 'Peter', surname: 'Parker', nickname: 'Spider Man' },
    { name: 'Bruce', surname: 'Banner', nickname: 'Hulk' },
    { name: 'Hank', surname: 'Pym', nickname: 'Ant Man' },
  ];

  const columns = [
    { field: 'name', label: 'Name' },
    { field: 'surname', label: 'Surname' },
    { field: 'nickname', label: 'Hero Nickname' },
  ];

  return <MUITable {...{ table, columns }} />;
};

export default Heroes;
```

## API

### Base props
| Prop        | Type & Default            | Description                                     |
|-------------|---------------------------|-------------------------------------------------|
| `table`     | `array of objects: []`    | List of values to render in table               |
| `columns`   | `array of objects: []`    | List of columns to render in table              |
| `options`   | `object: {}`              | Object of options to customise table            |
| `methods`   | `object: {}`              | Object of functions to handle component effects |
| `actions`   | `object: {}`              | Object of objects to add custom actions         |

### Columns
```
const columns = [
    { field: 'name', label: 'Name' },
    { field: 'surname', label: 'Surname' },
    { field: 'nickname', label: 'Hero Nickname' },
  ];
```

| Prop        | Type & Default            | Description                                     |
|-------------|---------------------------|-------------------------------------------------|
| `field`     | `string: REQUIRED`        | Key of object (row) in `table` array of objects (rows), to set a source of cell value. You can use `.` for nested objects like `parent.child.foo` |
| `label`     | `string: REQUIRED`        | Label of column |
| `lookup`    | `function: i => i`        | You can set function to change display of data. For example, you have date string, then in `lookup` you can set `d => moment(d).format(DD-MM-YYYY)`
| `filterField`| `string: undefined`      | You can set field for filter if `field` differ from target for filtration |
| `canSort`    | `boolean: true`          | Enable column for sorting |
| `canFilter`  | `boolean: true`          | Enable column for filtration |
| `canSearch`  | `boolean: true`          | Enable column for searching |
| `formCell`   | `boolena: true`          | Enable column cells to become input in create or update mode |

#### `.customFilter(props)`
This is a function which should return custom input component for filtration. Prop types is:
```
props = {
    name: 'string', // name of filter
    lable: 'string', // label of filter input
    value: 'any', // value of filter
    onChange: 'func',
}
```

`onChange` function take two required arguments `onChange('filter value', 'filter name')`

#### `.customInput(props)`
This is a function which should return custom input component for create or update row form. Prop types is:
```
props = {
    name: 'string', // name of filter
    lable: 'string', // label of filter input
    value: 'any', // value of filter
    onChange: 'func',
}
```

`onChange` function take two required arguments `onChange('filter value', 'filter name')`

### Options
| Prop        | Type & Default            | Description                                     |
|-------------|---------------------------|-------------------------------------------------|
| `size`      | `number: 5`               | Rows count per page                             |
| `page`      | `number: 0`               | Setup start page                                |
| `search`    | `string: ''`              | Setup search input value                        |
| `showSearch` | `boolean: true`          | Add search input in toolbar                     |
| `order`     | `string: 'asc'`           | Setup direction of sort. Available `'asc'` & `'desc'` |
| `orderBy`   | `string: null`            | Setup column name for sort                      |
| `canSelect` | `boolean: false`          | Add checkboxes for each row and header          |
| `selected`  | `array: []`               | Setup selected rows in format: `[{id: rowId}, ...]` |
| `showAll`   | `boolean: false`          | Add button which can show all rows in table     |
| `minSize`   | `number: 5`               | Setup min size for `showAll` mode when table wrapped |
| `tableSizes` | `array: [5, 10, 20]`     | Setup sizes for table size selector             |
| `showSize`  | `boolean: true`           | Add selector of table sizes                     |
| `withPaging` | `boolean: true`          | Add pagination buttons for table                |
| `isLoading` |  `boolean: false`         | Activate a circle progress                      |
| `showFilter` | `boolean: false`         | Add filter row under table header               |
| `filters`   |  `object: {} `            | Setup default filters                           |
| `showRowForm` | `boolean: false`        | Add form row under table header                 |
| `rowFormValues` | `object: {}`          | Setup default row form values                   |
| `treeTable` | `boolean: flase`          | Activate tree table mode. Display children values of rows |
| `childrenField` | `string: 'children'`  | Setup source of children for tree table mode    |
| `parentField` | `string: ''`            | If field exist, make tree table from list of values |
| `serverPaging` | `boolean: false`       | When `true`, turn off all library methods like (search, filter), and render received table |
| `rowsCount` | `number: 0`               | Setup table size                                |


### Methods
#### `onRowClick`
Handle row click, when `canSelect === true`, return row and  isCheck, else return row

#### `onPageChange`
Handle page change, return new page

#### `onPageSizeChange`
Handle page size change, return new size

#### `onOrderChange`
Handle order change, return order (`asc` or `desc`) and column name

#### `onSearchChange`
Handle search change, return new search string

#### `onFiltersChange`
Handle filters change, return new filters in object `{filterName: 'filterVaalue', ...otherFilters}`

#### `onSelectAllChange`
Handle select all, in `canSelect === true`, return array of selected

### Actions
You can add custom actions in different places in format:
```
actions = {
    actionName: {
        action1: {
            onClick: () => handleClick,
            component: props => <MyButton {...props} />
        }
        action2: {
            onClick: () => handleClick,
            component: props => <MyButton {...props} />
        }
    }
}
```
`onClick` return different values in depends from action.

#### `line`
Setup action for each row.

`onClick` return current row values and method to activate row form for update: `onClick: (row, open) => open(true)`.

`cmponent` return props and row values: `component: (props, row) => <MyComponent {...props} childre={row.id}/>`

#### `updateForm`
Setup action for update row form.

`onClick` return object of input fields with values: `onClick: formValues => console.log(formValues)`.

#### `header`
Setup action for table header in right top corner.

#### `toolbar`
Setup action for table toolbar in right top corner.

`onClick` return array equal to table and searched and filtered array:
`onClick: (table, filtered) => console.log(table, filtered)`.

#### `toolbarSelected`
Setup action for table toolbar in right top corner when `selected.length > 0`.

`onClick` return array of selected rows: `onClick: selectedRows => console.log(selectedRows)`.

#### `createForm`
Setup action for create row form.

`onClick` return object of input fields with values: `onClick: formValues => console.log(formValues)`.


## License

MIT © [naum-d](https://github.com/naum-d)
