import { useMutation } from "@tanstack/react-query"
import { LoginParams, LoginResponse } from "../../../types/dto/graphql/authType"
import { NormalizedError } from "../../../utils/error"
import { loginGraphQLApi } from "../../../api/graphql/auth"

export const useLoginApiMutation = () => {
    return useMutation<LoginResponse, NormalizedError, LoginParams>({
        mutationFn: async (params) => {
            return loginGraphQLApi(params);
        }
    })
}