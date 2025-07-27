export interface IHasuraClaims {
    "x-hasura-user-id": string;
    "x-hasura-email": string;
    "x-hasura-default-role": string;
    "x-hasura-allowed-roles": string[];
}
export interface IJwtPayload {
    user_id: string;
    first_name: string;
    last_name: string;
    email: string;
    roles: string[];
    "https://hasura.io/jwt/claims": IHasuraClaims;
    schoolId?: string;
    iat?: number;
    exp?: number;
    aud?: string;
    iss?: string;
}
