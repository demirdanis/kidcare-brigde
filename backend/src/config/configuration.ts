export default () => ({
  hasura: {
    adminSecret: process.env.HASURA_ADMIN_SECRET,
    graphqlEndpoint: process.env.HASURA_GRAPHQL_ENDPOINT,
  },
  httpPort: process.env.HTTP_PORT || 3001,
  tcpPort: process.env.TCP_PORT || 4001,

  jwt: {
    secret: process.env.JWT_SECRET,
    algorithm: process.env.JWT_ALGORITHM,
    audience: process.env.JWT_AUDIENCE,
    issuer: process.env.JWT_ISSUER,
    expiresIn: process.env.JWT_EXPIRES_IN || '1y',
  },
});
