import { apiSlice } from "../../../api/apiSlice"

export const CharactersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCharacters: builder.query({
            query: ({ id }) => `/${id}`,
            providesTags: ["characters", "favorites"]
        }),
    }),
});

export const {
    useGetCharactersQuery,
} = CharactersApiSlice;