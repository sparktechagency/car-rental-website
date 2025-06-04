import { baseApi } from "../../utils/apiBaseQuery";




export const TeamApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTeamMember: builder.query({
      query: () => ({
        url: `/contact`,
        method: "GET",
      }),
      providesTags: ["team"],
    }),
  }),
});

// Export hooks
export const {
  useGetTeamMemberQuery
} = TeamApi;