export interface TokenVerification {
    status: boolean,
    data: {
        user_id: number
    } | null
    // token: {
    //     id: number,
    //     iat: string,
    //     exp: number
    // }
}

export interface ServiceReturnInterface {
    status: boolean,
    data: object | any | null,
    message: string,
    error?: any
}
