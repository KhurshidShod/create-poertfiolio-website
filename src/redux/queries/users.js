import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ENDPOINT } from "../../constants/constants";
import Cookies from "js-cookie";

const usersQuery = createApi({
  reducerPath: "users",
  baseQuery: fetchBaseQuery({
    baseUrl: `${ENDPOINT}api/v1`,
  }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (params) => ({
        method: "GET",
        url: "users",
        params,
      }),
      transformResponse: (res) => ({
        users: res.data.map((el) => ({ ...el, key: el._id })),
        total: res.pagination.total,
      }),
    }),
    getNonClientUsers: builder.query({
      query: (params) => ({
        headers: {
          "Authorization": `Bearer ${Cookies.get("token")}`,
        },
        method: "GET",
        url: "users",
        params,
      }),
      transformResponse: (res) => ({
        users: res.data.map((el) => ({ ...el, key: el._id })),
        total: res.pagination.total,
      }),
    }),
    deleteUsers: builder.mutation({
      query: (id) => ({
        method: "DELETE",
        url: `users/${id}`,
        headers: {
          "Authorization": `Bearer ${Cookies.get("token")}`,
        },
      }),
    }),
    getUser: builder.mutation({
      query: (id) => ({
        method: "GET",
        url: `users/${id}`,
        headers: {
          "Authorization": `Bearer ${Cookies.get("token")}`,
        },
      }),
    }),
    updateUser: builder.mutation({
      query: (id, role) => ({
        method: "PUT",
        url: `users/${id}`,
        headers: {
          "Authorization": `Bearer ${Cookies.get("token")}`,
        },
        body: {
          role
        }
      }),
    }),
  }),
});

const { reducer: usersReducer, reducerPath: usersName } = usersQuery;

export { usersQuery as default, usersName, usersReducer };

export const { useGetUserMutation ,useGetUsersQuery, useUpdateUserMutation, useGetNonClientUsersQuery, useDeleteUsersMutation } = usersQuery;
