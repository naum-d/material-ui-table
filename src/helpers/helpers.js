export const turnOffEvent = (e, callback) => {
  e.preventDefault();
  e.stopPropagation();
  return callback;
};
