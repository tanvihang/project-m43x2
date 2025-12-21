import { LoginParams, LoginResponse } from "../../types/dto/graphql/authType";
import { graphQLRequestWithNormalizedError } from "../graphqlClient";

const LoginDocument = `
mutation Login($email: String!, $password: String!) {  
    login(email: $email, password: $password)
}
`

export const loginGraphQLApi = async(params: LoginParams): Promise<LoginResponse> => {
    const response = await graphQLRequestWithNormalizedError<{login: LoginResponse}>(LoginDocument, params);

    return response.login;
}

