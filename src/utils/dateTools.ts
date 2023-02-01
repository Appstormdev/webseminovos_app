import { add, format } from "date-fns";

export const onlyLegalAge = () => {
    return add(new Date(), {
    years: -18
})
}

export const formatDate = (date: Date) => {
   return (`${date.getUTCDate().toString().padStart(2, '0')}-${(date.getUTCMonth()+1).toString().padStart(2, '0')}-${date.getUTCFullYear()}`);
}
