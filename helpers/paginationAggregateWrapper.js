const paginationAggregateWrapper = async (
  model,
  query,
  page = 1,
  limit = 10
) => {
  const skip = page * limit;
  const newQuery = [
    ...query,
    {
      $facet: {
        metadata: [{ $count: "total" }],
        data: [{ $skip: skip }, { $limit: limit }],
      },
    },
  ];
  try {
    const result = await model.aggregate(newQuery);
    return result;
  } catch (error) {
    throw new Error("Error paginating results");
  }
};
module.exports = paginationAggregateWrapper;
