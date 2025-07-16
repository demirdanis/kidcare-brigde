export interface HasuraClaims {
  'x-hasura-user-id': string;
  'x-hasura-email': string;
  'x-hasura-default-role': string;
  'x-hasura-allowed-roles': string[];
}

export interface JwtPayload {
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  roles: string[];
  'https://hasura.io/jwt/claims': HasuraClaims;
  schoolId?: string;
}
