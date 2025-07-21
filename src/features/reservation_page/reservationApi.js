import { baseApi } from "../../../utils/apiBaseQuery";



export const ReservationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllVehicles: builder.query({
      query: ({ pickupTime, returnTime }) => ({
        url: `/booking/get-available-vehicle`,
        method: "GET",
        params: {
          ...(pickupTime && { pickupTime }),
          ...(returnTime && { returnTime })
        }
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



    getExtraServicesofvehiclebyvehicleid: builder.query({
      query: (id) => ({
        url: `/vehicle/extra-services/${id}`,
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


    getVat: builder.query({
      query: () => ({
        url: `/company-cms/default-vat-percent`,
        method: "GET",
      }),
      providesTags: ["reservation"],
    }),
  }),
  overrideExisting: true
});

// Export hooks
export const {
  useGetAllVehiclesQuery,
  useSeatDoorLuggageBrandsQuery,
  useGetAllExtraServiceQuery,
  useCreatingBookingMutation,
  useGetExtraServicesofvehiclebyvehicleidQuery,
  useGetVatQuery
} = ReservationApi;