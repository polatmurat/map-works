import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const authService = createApi({
    reducerPath: 'auth',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/api/'
    }),
    endpoints: (builder) => {
        return {
            userLogin: builder.mutation({
                query: (loginData) => {
                    return {
                        url: 'login',
                        method: 'POST',
                        body: loginData
                    }
                }
            }),

            userRegister: builder.mutation({
                query: registerData => {
                    return {
                        url: 'register',
                        method: 'POST',
                        body: registerData
                    }
                }
            })
        }
    }
});

export const { useUserLoginMutation, useUserRegisterMutation } = authService;
export default authService;