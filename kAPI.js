const kijiji = require("kijiji-scraper");
const colors = require("colors");

class Search {
  constructor(query) {
    this.searchObject = {
      options: { maxResults: 10, adType: "OFFER" },
      params: {
        keywords: "verdun",
        maxPrice: 1000,
        minPrice: 400,
        locationId: 1700281, // Greater Montreal
        categoryId: 34, // Real estate
        sortByName: "priceAsc", // Show the cheapest listings first
        hasImages: true,
      },
    };
    console.log("Constructor called".blue);
    console.log("The query you input is", query);
    //Check if the query is valid
    console.log("queryCheck returned".green, this.queryCheck(query));
    return this.search(this.prepareQuery(query));

    //return Promise.resolve(res);
  }

  //Checks if query is valid
  queryCheck(query) {
    const queryKeys = Object.keys(query);
    const condition = Object.keys(this.searchObject);
    const validKeys = queryKeys.every((ob) => {
      return condition.indexOf(ob) !== -1;
    });
    return validKeys;
  }
  //Prepares the query by replacing the relevant values
  prepareQuery(query) {
    for (const key in query) {
      if (query.hasOwnProperty(key)) {
        const element = query[key];
        for (const subKey in element) {
          if (this.searchObject.hasOwnProperty(key)) {
            const subElement = element[subKey];
            this.searchObject[key][subKey] = subElement;
          }
        }
      }
    }
    console.log(this.searchObject);
    return this.searchObject;
  }

  search(query) {
    // Scrape using returned promise
    return kijiji.search(query.params, query.options);
  }
}

module.exports = Search;
