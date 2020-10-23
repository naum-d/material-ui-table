export const turnOffEvent = (e, callback) => {
  e.preventDefault();
  e.stopPropagation();
  return callback;
};

export const searchInTable = (str, table, columns) => {
  let res = [];
  const fields = columns.filter(i => 'canSearch' in i ? !!i['canSearch'] : true).map(i => i['field']);

  for (const row of table) {
    for (const field of fields) {
      if ((row[field]['lookup'] || row[field]).toString().toLowerCase().includes(str)) {
        res = [...res, row];
        break;
      }
    }
  }

  return res;
};

export const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

export const getComparator = (order, orderBy) => {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

export const stableSort = (array, comparator) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};
