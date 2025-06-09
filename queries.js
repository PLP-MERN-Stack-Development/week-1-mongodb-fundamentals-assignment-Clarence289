// Aggregation Pipeline Queries (Simple Version)

// 1. Average price by genre
db.books.aggregate([{ $group: { _id: "$genre", averagePrice: { $avg: "$price" } } }]);

// 2. Author with the most books
db.books.aggregate([
  { $group: { _id: "$author", count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $limit: 1 }
]);

// 3. Group books by publication decade and count
db.books.aggregate([
  {
    $group: {
      _id: { $concat: [ { $substr: [ { $toString: "$published_year" }, 0, 3 ] }, "0s" ] },
      count: { $sum: 1 }
    }
  }
]);
