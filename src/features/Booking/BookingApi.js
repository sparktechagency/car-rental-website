import { baseApi } from "../../../utils/apiBaseQuery";



export const BookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    manageBooking: builder.query({
      query: (id) => ({
        url: `/booking/${id}`,
        method: "GET",
      }),
      providesTags: ["fleet"],
    }),

    getBookingEmailAndId: builder.query({
      query: ({ referenceId, email }) => ({
        url: `/booking/client/${referenceId}?clientEmail=${email}`,
        method: "GET",
      }),
      providesTags: ["fleet"],
    }),


  }),
});



// Export hooks
export const {
  useGetBookingEmailAndIdQuery,
  useManageBookingQuery
} = BookingApi;