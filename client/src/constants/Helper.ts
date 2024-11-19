import {useSearchParams} from "react-router-dom"

export const useQuery = (): any => {
    const [searchParams] = useSearchParams();
    return Object.fromEntries(searchParams.entries())
}

export const generateQuery = (object: Record<string, string>): string => {
    let url = new String('?');
    for (const key in object) {
        url = url + `${key}=${object[key]}`
        url = url + '&'
    }
    return url as string
}
export const generateFilterQuery = (object: Record<string, Array<string>>): string => {
    return new String(encodeURIComponent(JSON.stringify(object))) as string
}

export const resolveQuery = (url: string): any => {
    return url
}
