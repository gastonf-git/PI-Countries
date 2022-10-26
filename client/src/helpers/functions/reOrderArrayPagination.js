export default function reOrderArrayPagination(arrayCountries){
    let arrayCopyCountries = [...arrayCountries]
    let filteredPaginationCountries = [];
    let paginationCountries = [];
    let countOperations = 0;
    let limitOperations = 0;

    // Si tiene menos de 9 elementos el array, lo inserto directamente
    if(arrayCountries.length <= 9 && arrayCountries.length !== 0){
      filteredPaginationCountries.push(arrayCountries);
    }
    // Si tiene mas elementos, entoces realizamos la logica para que el primer paginado tenga 9 elemn y el restante 10 o menos
    if(arrayCountries.length > 9) {
      while(arrayCopyCountries.length !== 0){
        countOperations = countOperations + 1;
        limitOperations = arrayCopyCountries.length - 1
        if(arrayCopyCountries.length <= 10) {
          paginationCountries = [];
          paginationCountries = arrayCopyCountries.splice(limitOperations)
          filteredPaginationCountries.push(paginationCountries);
        } else {
          if(countOperations === 1) {
            paginationCountries = []
            paginationCountries = arrayCopyCountries.splice(0, 9);
            filteredPaginationCountries.push(paginationCountries);
          }
          if(countOperations > 1) {
            paginationCountries = []
            paginationCountries = arrayCopyCountries.splice(0, 10)
            filteredPaginationCountries.push(paginationCountries);
          }
        }
      }
    }
    return filteredPaginationCountries;
  }