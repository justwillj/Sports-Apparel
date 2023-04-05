const searchFilter = (products, query) => {
  const newList = [];
  if (query === '') {
    return products;
  }
  products.filter((product) => {
    const prodNameToLower = product.name.toLowerCase();
    const prodDemToLower = product.demographic.toLowerCase();
    const prodCatToLower = product.category.toLowerCase();
    const prodDescToLower = product.description.toLowerCase();
    const prodTypeToLower = product.type.toLowerCase();
    const queryToLower = query.toLowerCase();
    if (
      prodNameToLower.match(queryToLower)
      || prodDemToLower.match(queryToLower)
      || prodCatToLower.match(queryToLower)
      || prodDescToLower.match(queryToLower)
      || prodTypeToLower.match(queryToLower)
    ) {
      newList.push(product);
    }
    return newList;
  });
  return newList;
};
export default searchFilter;
