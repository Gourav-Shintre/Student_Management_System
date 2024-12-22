import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const StudentApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/myapp/",
  }),
  tagTypes: ["getall"],
  endpoints: (builder) => ({
    getAllPost: builder.query({
      query: () => "students/",
      providesTags: ["getall"],
    }),
    getPostbyId: builder.query({
      query: (id) => ({
        url: `students/${id}`,
        method: "GET",
      }),
    }),

    deletepostById: builder.mutation({
      query: (id) => {
        return {
          url: `students/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["getall"],
    }),

    createPost: builder.mutation({
      query: (body) => {
        return {
          url: `students/`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["getall"],
    }),

    updatePost: builder.mutation({
      query: (body) => {
        return {
          url: `students/${body.std_id}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["getall"],
    }),
  }),
});

export const {
  useGetAllPostQuery,
  useDeletepostByIdMutation,
  useCreatePostMutation,
  useUpdatePostMutation,
  useGetPostbyIdQuery,
} = StudentApi;
