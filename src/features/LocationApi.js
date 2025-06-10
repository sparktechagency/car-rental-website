import { baseApi } from "../../utils/apiBaseQuery";




export const TeamApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getLocation: builder.query({
      query: () => ({
        url: `/location`,
        method: "GET",
      }),
      // providesTags: ["team"],
    }),
  }),
});

// Export hooks
export const {
  useGetLocationQuery
} = TeamApi;