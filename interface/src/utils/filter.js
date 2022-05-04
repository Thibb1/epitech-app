// Our new builder function
export function buildFilter(filter) {
  let query = {};
  for (let keys in filter) {
    if ((filter[keys].constructor === Object) || (filter[keys].constructor === Array && filter[keys].length > 0)) {
      query[keys] = filter[keys];
    }
  }
  return query;
}

// filter function
export function filterData(data, query) {
  return data.filter(item => {
    for (let key in query) {
      if (item[key] === undefined) {
        return false;
      }
      else if (!query[key].includes(item[key])) {
        return false;
      }
    }
    return true;
  });
}

// filter data but keep only non filtered data
export function filterOutData(data, query) {
  return data.filter(item => {
    for (let key in query) {
      if (item[key] === undefined) {
        return true;
      }
      else if (query[key].includes(item[key])) {
        return false;
      }
    }
    return true;
  });
}

// map function
export function mapData(data, map, dateKeys = ['startDate', 'endDate']) {
  return data.map(item => {
    let newItem = {};
    for (let key in map) {
      if (dateKeys.includes(key)) {
        newItem[key] = new Date(item[map[key]]);
      } else {
        newItem[key] = item[map[key]];
      }
    }
    return newItem;
  });
}
