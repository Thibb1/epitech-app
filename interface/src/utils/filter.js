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

// // Initial filter used in basic example
// // let filter = {
// //   codeInstance: [
// //     'LIL-0-1',
// //   ],
// //   moduleAvailable: [
// //     true,
// //   ],
// //   modeduleRegistered: [
// //     true,
// //   ],
// //   allowRegister: [
// //     true,
// //   ],
// //   eventRegistered: [
// //     true,
// //   ],
// // };


// // Initial query
// const fs = require('fs');
// const file = fs.readFileSync('housing_data.json');
// const data = JSON.parse(file);
// let query = buildFilter(filter);        // <-- Now this has been initialized with 'let'

// let result = filterData(data, query);   // <-- Now this has been initialized with 'let'
// console.log(JSON.stringify(result, null, 4));

// console.log('----------------------');  // For easier reading in the console

// // Updated filter
// filter = {
//     type: [
//         'Apartment',
//     ],
//     saleType: [
//         'For Rent',
//     ],
//     listPrice: {
//         min: 1000,
//         max: 1800
//     },
//     bedrooms: {
//         min: 1,
//         max: null
//     },
//     washerDryerInUnit: [
//         true,
//     ],
// };

// // Updated query
// query = buildFilter(filter);
// result = filterData(data, query);
// console.log(JSON.stringify(result, null, 4))