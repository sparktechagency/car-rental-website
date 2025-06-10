import { baseApi } from "../../../utils/apiBaseQuery";



export const FleetApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllVehicles: builder.query({
      query: ({ searchTerm = "", page = 1 }) => ({
        url: `/vehicle?searchTerm=${searchTerm}&page=${page}`,
        method: "GET",
      }),
      providesTags: ["fleet"],
    }),
  }),
});

// Export hooks
export const {
  useGetAllVehiclesQuery
} = FleetApi;