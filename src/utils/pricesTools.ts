export const formatPrice = (price: string) => {
    let aux = price + "00";
    aux = aux.replace(/([0-9]{2})$/g, ",$1");
    if (aux.length > 6) aux = aux.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
  
    const formated = `R$ ${aux}`
    return formated;
  };