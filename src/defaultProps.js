export const defaultProps = {
  options: {
    size: 5,
    page: 0,
    search: '',
    table: [],
    selected: [],
  },
  methods: {
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
