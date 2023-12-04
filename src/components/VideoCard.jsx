/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";

const VideoCard = ({ video }) => {
  return (
    <div className='flex flex-col overflow-hidden w-full sm:w-[315px] rounded-lg pb-4 mx-7 sm:mx-0 transition-shadow duration-500 shadow-md hover:shadow-xl bg-white'>
      <Link
        to={`/video/${video._id}`}
        className='flex flex-col gap-6'
      >
        <img
          src={video.thumbnailURL}
          alt='Thumbnail'
          className='h-[280px] sm:h-[220px] object-cover w-full sm:w-auto transition hover:scale-105 duration-500'
        />
        <h1 className='text-zinc-800 text-xl font-semibold p-3 truncate'>
          {video.title}
        </h1>
      </Link>
    </div>
  );
};

export default VideoCard;
