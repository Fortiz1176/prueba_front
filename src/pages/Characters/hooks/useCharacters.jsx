import { useEffect, useState, useCallback } from "react";
/* import type { ApiResponse, Character } from "../types/characters"; */

import { useGetCharactersQuery } from "../services/charactersApiSlice"
import { useParams } from "react-router-dom";

export const useCharacters = () => {

  const { id } = useParams();

  const { data, error, isLoading } = useGetCharactersQuery({ id }, { skip: !id });

  console.log(data)

  /* const [data, setData] = useState<Character[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [page, setPage] = useState<number>(1);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const fetchCharacters = useCallback(async () => {
    try {
      setIsLoading(true);

      const res = await fetch(
        `https://rickandmortyapi.com/api/character?page=${page}`
      );

      if (!res.ok) {
        throw new Error(`Error ${res.status}: ${res.statusText}`);
      }

      const json: ApiResponse = await res.json();

      setData(json.results);
      setTotalPages(json.info.pages);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchCharacters();
  }, [fetchCharacters]);

  const nextPage = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  const prevPage = () => {
    if (page > 1) setPage((prev) => prev - 1);
  }; */

  return {
    state: {
      data,
      error,
      isLoading,
      /* refetch: fetchCharacters, 
      page,
      setPage,
      totalPages,
      nextPage,
      prevPage, */
    },
  };
};
