export const getFromObject = (key, obj) => {
  return key.split('.').reduce((obj, key) => (!!obj ? obj[key] : null), obj);
};

export const getFields = (columns, can) => {
  return Object.fromEntries(new Map(
    columns
      .filter(i => can in i ? !!i[can] : true)
      .map(i => [i['field'], i['lookup'] || (i => i)]),
  ));
};

export const turnOffEvent = (e, callback) => {
  e.preventDefault();
  e.stopPropagation();
  return callback;
};

export const searchInTable = (str, table, columns) => {
  let res = [];
  const fields = getFields(columns, 'canSearch');

  for (const row of table) {
    for (const field of Object.keys(fields)) {
      const val = fields[field](getFromObject(field, row)) || '';
      if (JSON.stringify(val).toLowerCase().includes(str)) {
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

export const getFilterTable = (table, filters) => {
  const res = [];

  tableLoop: for (const row of table) {
    for (const field in filters) {
      if (getFromObject(field, row).toString().toLowerCase() === filters[field].toString().toLowerCase()) continue;
      else continue tableLoop;
    }
    res.push(row);
  }

  return res;
};

export const arrayToTree = (array, parentField) => {
  let tree = [];
  let nodes = {};

  for (let item of array) {
    nodes[item['id']] = item;
    nodes[item['id']]['children'] = [];
  }

  for (let id in nodes) {
    const item = nodes[id];
    if (!!item[parentField] && !!nodes[item[parentField]]) {
      nodes[item[parentField]]['children'].push(item);
    }
    else {
      tree.push(item);
    }
  }
  return tree;
};
