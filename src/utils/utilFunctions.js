const searchFilter = (products, query) => {
  const newList = [];
  if (query === '') {
    return products;
  }
  const queryToLower = query.toLowerCase().split(' ');
  queryToLower.forEach((element) => {
    products.filter((product) => {
      const prodNameToLower = product.name.toLowerCase();
      const prodDemToLower = product.demographic.toLowerCase();
      // const prodBreedToLower = product.breed.toLowerCase();
      const prodCatToLower = product.category.toLowerCase();
      const prodDescToLower = product.description.toLowerCase();
      const prodTypeToLower = product.type.toLowerCase();
      // const queryToLower = query.toLowerCase();
      if (
        prodNameToLower.match(element)
      || prodDemToLower === element
      // || prodBreedToLower === element
      || prodCatToLower.match(element)
      || prodDescToLower.match(element)
      || prodTypeToLower.match(element)
      ) {
        newList.push(product);
      }
      return newList;
    });
  });

  console.log(newList);
  return newList;
};
export default searchFilter;
