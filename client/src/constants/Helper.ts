import { useSearchParams } from "react-router-dom"

export const useQuery = (): object => {
    const [searchParams] = useSearchParams();
    return Object.fromEntries(searchParams.entries())
}

export const generateQuery = (object: any): string => {
    let url = new String('?');
    for (const key in object) {
        url = url + `${key}=${object[key]}`
        url = url + '&'
    }
    return url as string
}
export const resolveQuery = (url: string): any => {
    return url
}