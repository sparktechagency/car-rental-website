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

    contact: builder.query({
      query: () => ({
        url: `/company-cms/contact`,
        method: "GET",
      }),
      providesTags: ["contact"],
    }),
  }),
});

// Export hooks
export const {
  useCreatingContactMutation,
  useContactQuery
} = ContactApi;