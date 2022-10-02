//For testing the access of json data
const data = {
  took: 434,
  timed_out: false,
  _shards: {
    total: 1,
    successful: 1,
    skipped: 0,
    failed: 0,
  },
  hits: {
    total: {
      value: 1,
      relation: "eq",
    },
    max_score: 2.3842063,
    hits: [
      {
        _index: "movies",
        _id: "kK-amYMB3r7-LglMZBus",
        _score: 2.3842063,
        _source: {
          id: "3",
          name: "Harry Potter",
          year: "2012",
          genre: "Supernatural",
          rating: "5",
        },
      },
    ],
  },
}; 
var hits = data.hits.hits;
console.log(hits[0]._source.name);