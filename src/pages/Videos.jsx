import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import React from "react";
import { getAllVideos } from "../utils/http";
import { TailSpin } from "react-loader-spinner";
import { Link } from "react-router-dom";
import VideoCard from "../components/VideoCard";

const Videos = () => {
  const {
    data,
    isFetching,
    status,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    error,
  } = useInfiniteQuery({
    queryKey: ["videos"],
    queryFn: ({ pageParam = 1 }) => getAllVideos({ pageParam }),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage.length === 9 ? allPages.length + 1 : undefined;
      return nextPage;
    },
  });

  return (
    <div
      className={`mt-12 ${
        hasNextPage ? "mb-1" : "mb-10"
      } flex flex-col gap-4 max-w-6xl mx-auto`}
    >
      <h1 className='text-5xl font-bold text-center'>Videos</h1>
      <div className='flex justify-center'>
        <Link to='/'>
          <span className='text-lg text-amber-600 font-medium cursor-pointer hover:opacity-80'>
            Create new video
          </span>
        </Link>
      </div>
      {status === "pending" && (
        <div className='mt-20 flex justify-center'>
          <TailSpin
            height='80'
            width='80'
            color='black'
            ariaLabel='tail-spin-loading'
            radius='2'
            wrapperStyle={{}}
            wrapperClass=''
            visible={true}
          />
        </div>
      )}
      {status === "error" && (
        <div className='flex flex-col gap-2'>
          <h1 className='text-red-600'>{error.response.data.message}</h1>
          <Link to='..'>Reload</Link>
        </div>
      )}
      {status === "success" && (
        <>
          {data.pages[0].length === 0 && (
            <div className='flex justify-center mt-2'>
              <span className='text-xl font-medium text-gray-500'>
                No Videos Available!!
              </span>
            </div>
          )}
          <div className='flex gap-7 sm:gap-5 p-4 flex-wrap'>
            {data.pages.map((group, i) => (
              <React.Fragment key={i}>
                {group.map((video) => (
                  <VideoCard
                    key={video._id}
                    video={video}
                  />
                ))}
              </React.Fragment>
            ))}
          </div>
          {hasNextPage && !isFetchingNextPage && (
            <div className='flex justify-center pt-2 pb-4 mb-8'>
              <span
                className=' flex items-center gap-1 text-green-700 animate-bounce cursor-pointer'
                onClick={() => fetchNextPage()}
              >
                <p className='text-lg'>Show more</p>
              </span>
            </div>
          )}
          {isFetchingNextPage && (
            <div className='mt-20 flex justify-center'>
              <TailSpin
                height='80'
                width='80'
                color='black'
                ariaLabel='tail-spin-loading'
                radius='2'
                wrapperStyle={{}}
                wrapperClass=''
                visible={true}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Videos;
