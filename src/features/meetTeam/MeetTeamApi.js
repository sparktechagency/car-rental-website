import { baseApi } from "../../../utils/apiBaseQuery";



export const TeamApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    team: builder.query({
      query: () => ({
        url: `/user/team-member`,
        method: "GET",
      }),
      providesTags: ["fleet"],
    }),
  }),
});

// Export hooks
export const {
  useTeamQuery
} = TeamApi;