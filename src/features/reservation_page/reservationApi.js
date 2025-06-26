import { baseApi } from "../../../utils/apiBaseQuery";



export const ReservationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllVehicles: builder.query({
      query: (searchTerm = "", page = 1, limit = 9) => ({
        url: `/vehicle?searchTerm=${searchTerm}&page=${page}`,
        method: "GET",
      }),
      providesTags: ["reservation"],
    }),

    seatDoorLuggageBrands: builder.query({
      query: () => ({
        url: `/vehicle/seat-door-luggage-brands`,
        method: "GET",
      }),
      providesTags: ["reservation"],
    }),

    getAllExtraService: builder.query({
      query: (page = 1, limit = 12) => ({
        url: `/extra-service?limit=${limit}&page=${page}`,
        method: "GET",
      }),
      providesTags: ["reservation"],
    }),

    creatingBooking: builder.mutation({
      query: (body) => ({
        url: `/booking`,
        method: "POST",
        body: body,
      }),
      providesTags: ["reservation"],
    }),

  }),
  overrideExisting: false,
});

// Export hooks
export const {
  useGetAllVehiclesQuery,
  useSeatDoorLuggageBrandsQuery,
  useGetAllExtraServiceQuery,
  useCreatingBookingMutation
} = ReservationApi;