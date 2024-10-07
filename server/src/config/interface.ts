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