const searchFilter = (products, query) => {
  const newList = [];
  if (query === '') {
    return products;
  }
  products.filter((product) => {
    if (
      product.name === query
        || product.demographic.localeCompare(
          query,
          undefined,
          { sensitivity: 'base' }
        ) === 0
        || product.description === query
        || product.category.localeCompare(
          query,
          undefined,
          { sensitivity: 'base' }
        ) === 0
        || product.type.localeCompare(
          query,
          undefined,
          { sensitivity: 'base' }
        ) === 0
    ) {
      newList.push(product);
      return newList;
    }
    return newList;
  });
  console.log(newList);
  return newList;
};

export default searchFilter;
