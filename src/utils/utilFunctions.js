/**
      * @name searchFilter
      * @description This filters search-results from api
      * @param products - return from api call
      * @param query - users query
      * @returns - setsTotalProducts
      */
const searchFilter = (products, query) => {
  const newList = [];
  if (query === '') {
    return products;
  }
  // commented out for advanced search
  // const queryToLower = query.toLowerCase().split(' ');
  // queryToLower.forEach((element) => {
  products.filter((product) => {
    const prodNameToLower = product.name.toLowerCase();
    const prodDemToLower = product.demographic.toLowerCase();
    // const prodBreedToLower = product.breed.toLowerCase();
    const prodCatToLower = product.category.toLowerCase();
    const prodDescToLower = product.description.toLowerCase();
    const prodTypeToLower = product.type.toLowerCase();
    const queryToLower = query.toLowerCase();

    // if (
    //   prodNameToLower.match(element)
    //   || prodDemToLower === element
    //   || prodBreedToLower === element
    //   || prodCatToLower.match(element)
    //   || prodDescToLower.match(element)
    //   || prodTypeToLower.match(element)
    // )
    if (
      prodNameToLower.match(queryToLower)
        || prodDemToLower === queryToLower
        // || prodBreedToLower === queryToLower
        || prodCatToLower.match(queryToLower)
        || prodDescToLower.match(queryToLower)
        || prodTypeToLower.match(queryToLower)
    ) {
      newList.push(product);
    }
    return newList;
  });
  // });
  return newList;
};
export default searchFilter;
