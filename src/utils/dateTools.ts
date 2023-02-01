import { add, format } from "date-fns";

export const onlyLegalAge = () => {
    return add(new Date(), {
    years: -18
})
}

export const formatDate = (date: Date) => {
    return format(new Date(date), 'dd/MM/yyyy')
}