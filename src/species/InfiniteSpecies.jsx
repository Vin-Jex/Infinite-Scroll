import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery, useIsFetching } from "react-query";
import { Species } from "./Species";

const initialUrl = "https://swapi.dev/api/species/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfiniteSpecies() {
  // TODO: get data for InfiniteScroll via React Query
  const { data, fetchNextPage, hasNextPage, isError, error, isLoading, isFetching } = useInfiniteQuery("sw-species", ({ pageParam = initialUrl }) => fetchNextPage(pageParam),
  {
    getNextPageParam: (lastPage) => lastPage.next || undefined,
  }
  )

  if (isLoading) return <div className="loading">Loading...</div>

  if (isError) return <div>An error occurred: {error.toString()}</div>

  
  return 
    <>
      { isFetching && <div className="loading">Fetching...</div> }

      <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
      {
        data.pages.map((e) => {
        return e.results.map((species) => {
          return 
          <div key={species}>
            
          </div>
        })
        })
      }
      </InfiniteScroll>
    </>
    
  
}
