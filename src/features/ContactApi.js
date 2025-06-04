import { baseApi } from "../../utils/apiBaseQuery";




export const ContactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    creatingContact: builder.mutation({
      query: (data) => ({
        url: `/contact`,
        method: "POST",
        body: data,
      }),
      providesTags: ["contact"],
    }),
  }),
});

// Export hooks
export const {
  useCreatingContactMutation
} = ContactApi;