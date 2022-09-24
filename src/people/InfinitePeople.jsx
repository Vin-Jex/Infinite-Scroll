import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery } from "react-query"
import { Person } from "./Person";

const initialUrl = "https://swapi.dev/api/people/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfinitePeople() {
  // TODO: get data for InfiniteScroll via React Query
  const { data, fetchNextPage, hasNextPage, isLoading, isFetching, error, isError} = useInfiniteQuery(
    "sw-people", ({ pageParam = initialUrl }) => fetchUrl(pageParam), 
    {
      getNextPageParam: (lastPage) => lastPage.next || undefined,
    }
  );

  if (isLoading) return <div className="loading">Loading...</div>
  if(isError) return <div className="loading">An error occurred: {error.toString()}</div>

  return (
    <>
    {isFetching && <div className="loading">Fetching...</div>  }
      <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
        {data.pages.map((pageData) => {
          return pageData.results.map((person) => {
            return <Person 
              key={person.name}
              name={person.name}
              hairColor={person.hair_color}
              eyeColor={person.eye_color}
            />
          })
        } )}
      </InfiniteScroll>
    </>
  )
}
