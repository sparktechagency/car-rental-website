import { baseApi } from "../../../utils/apiBaseQuery";


export const HomeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all categories
    getLocationSearch: builder.query({
      query: ({ searchTerm = "" }) => ({
        url: `/location?searchTerm=${searchTerm}`,
        method: "GET",
      }),
      providesTags: ["home"],
    }),


    getAllVehiclesRecents: builder.query({
      query: () => ({
        url: `/vehicle?sort=createdAt&limit=4`,
        method: "GET",
      }),
      providesTags: ["home"],
    }),

    getAllVehiclesPopular: builder.query({
      query: () => ({
        url: `/vehicle`,
        method: "GET",
      }),
      providesTags: ["home"],
    }),

    getReviews: builder.query({
      query: (page) => ({
        url: `/review?page=${page}`,
        method: "GET",
      }),
      providesTags: ["home"],
    }),

    getFAQ: builder.query({
      query: () => ({
        url: `/company-cms`,
        method: "GET",
      }),
      providesTags: ["home"],
    }),


  }),
});

// Export hooks
export const {
  useGetLocationSearchQuery,
  useGetAllVehiclesRecentsQuery,
  useGetAllVehiclesPopularQuery,
  useGetReviewsQuery,
  useGetFAQQuery
} = HomeApi;