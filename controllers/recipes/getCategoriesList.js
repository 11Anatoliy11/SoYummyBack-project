// recipes/category-list

const categoriesList = require("../../data/categories");

const getCategoryList = async (req, res) => {
  const filteredCategories = categoriesList.sort((a, b) => a.localeCompare(b));
  res.json({
    status: 200,
    message: "success",
    categories: filteredCategories,
  });
};

module.exports = getCategoryList;
