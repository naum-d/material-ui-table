export const defaultProps = {
  options: {
    size: 5,
    page: 0,
    search: '',
    order: 'asc',
    orderBy: null,
    table: [],
    columns: [],
    selected: [],
  },
  methods: {
    onOrderChange: () => {},
    onSearchChange: () => {},
  },
  actions: {
    toolbar: {
      send: { onClick: arr => console.log(arr) },
    },
    toolbarSelected: {
      drop: { onClick: arr => console.log(arr) },
    },
  },
};
