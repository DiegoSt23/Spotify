import { useQuery } from '@tanstack/react-query';
import { Api } from '@common/utils';
import { SearchResponse } from '@common/interfaces';

const handleSearch = async (searchQuery?: string): Promise<SearchResponse> => {
  const response = await Api.get<SearchResponse>(
    `/search?q=${searchQuery}&type=album,artist,track,playlist,show,episode`
  );

  return response;
};

export const useSearch = (searchQuery?: string) =>
  useQuery({
    queryKey: ['search', searchQuery],
    enabled: !!searchQuery,
    queryFn: () => handleSearch(searchQuery),
  });
