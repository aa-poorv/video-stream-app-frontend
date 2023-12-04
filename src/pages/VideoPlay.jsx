import { useQuery } from "@tanstack/react-query";
import videojs from "video.js";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { getVideo } from "../utils/http";
import VideoJS from "../components/VideoPlayer";

const VideoPlay = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["video", id],
    queryFn: () => getVideo({ id }),
  });
  const playerRef = React.useRef(null);

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on("waiting", () => {
      videojs.log("player is waiting");
    });

    player.on("dispose", () => {
      videojs.log("player will dispose");
    });
  };

  return (
    <>
      {data && (
        <div className='max-w-2xl mx-9 md:mx-auto mt-8 mb-6 bg-white shadow-md rounded-md'>
          <VideoJS
            options={{
              autoplay: true,
              controls: true,
              responsive: true,
              fluid: true,
              poster: data.thumbnailURL,
              sources: [
                {
                  src: data.videoURL,
                  type: "video/mp4",
                },
                {
                  src: data.videoURL,
                  type: "video/avi",
                },
                {
                  src: data.videoURL,
                  type: "video/mpg",
                },
              ],
            }}
            onReady={handlePlayerReady}
          />
          <div className='mt-6 flex flex-col gap-2 px-4'>
            <h1 className='text-xl sm:text-3xl leading-6 font-semibold'>
              {data.title}
            </h1>
            <h1 className='text-sm sm:text-lg text-gray-700 line-clamp-2'>
              {data.description}
            </h1>
          </div>
          <div className='mt-6 flex justify-around pb-4 sm:pb-6'>
            <Link to='/videos'>
              <button className='text-white text-sm sm:text-base font-medium bg-fuchsia-600 p-2 sm:p-3 rounded-lg transition duration-200 shadow-md hover:opacity-95 hover:shadow-lg'>
                All Videos
              </button>
            </Link>
            <Link to='/'>
              <button className='text-white text-sm sm:text-base font-medium bg-emerald-600 p-2 sm:p-3 rounded-lg transition duration-200 shadow-md hover:opacity-95 hover:shadow-lg'>
                Create Video
              </button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default VideoPlay;
