import React, { useEffect, useRef, useState } from "react";
import yesImage from "../assets/yes.png";
import { useMutation } from "@tanstack/react-query";
import { TailSpin } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { postVideo, queryClient } from "../utils/http";
import { useNavigate } from "react-router-dom";

const CreateNewVideo = () => {
  const [imageValue, setImageValue] = useState({ preview: "", raw: "" });
  const [videoValue, setVideoValue] = useState({ preview: "", raw: "" });
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const imageref = useRef(null);
  const videoRef = useRef(null);
  const navigate = useNavigate();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: postVideo,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["videos"] });
      navigate(`video/${data._id}`);
    },
  });

  const videoSubmitHandler = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("video", videoValue.raw);
    formData.append("thumbnail", imageValue.raw);

    mutate({ formData });
  };

  if (isError) {
    console.log(error);
  }

  return (
    <div className='max-w-xl mx-auto mt-28 p-4 sm:p-0'>
      <h1 className='text-center font-bold text-4xl mb-9'>Create New Video</h1>
      <form
        className='flex flex-col gap-4 justify-center'
        onSubmit={videoSubmitHandler}
        encType='multipart/form-data'
      >
        <input
          type='text'
          placeholder='Title'
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className='border border-gray-700 p-3 rounded-lg'
          id='title'
          maxLength={50}
          required
        />
        <textarea
          placeholder='Description'
          className='border border-gray-700 p-3 rounded-lg'
          id='description'
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          cols='30'
          rows='3'
          maxLength={200}
        ></textarea>
        <div className='flex flex-col sm:flex-row gap-3 sm:gap-0 justify-between'>
          <div className='flex flex-col gap-2'>
            <input
              type='file'
              required
              onChange={(e) => {
                setImageValue({
                  preview: URL.createObjectURL(e.target.files[0]),
                  raw: e.target.files[0],
                });
              }}
              accept='.jpg, .png'
              ref={imageref}
              hidden
              id='thumbnail'
            />
            {imageValue.preview ? (
              <div className='flex gap-2'>
                <img
                  src={imageValue.preview}
                  className='h-12 w-12'
                  alt='Thumbnail'
                />
                <h1 className='text-green-500 self-center'>
                  Thumbnail Selected
                </h1>
              </div>
            ) : (
              <h1 className='text-zinc-700 flex-1 flex flex-col justify-end'>
                No thumbnail chosen
              </h1>
            )}
            <button
              type='button'
              onClick={() => imageref.current.click()}
              disabled={isPending}
              className='border border-black p-2 rounded-lg text-white bg-slate-700 min-w-[200px] hover:opacity-95 disabled:opacity-80'
            >
              Choose a Thumbnail
            </button>
          </div>
          <div className='flex flex-col gap-2'>
            <input
              type='file'
              required
              onChange={(e) => {
                setVideoValue({
                  preview: URL.createObjectURL(e.target.files[0]),
                  raw: e.target.files[0],
                });
              }}
              id='video'
              ref={videoRef}
              hidden
              accept='.mpg, .avi, .mp4'
            />
            {videoValue.preview ? (
              <div className='flex sm:flex-row-reverse gap-2'>
                <img
                  src={yesImage}
                  className='h-12 w-12'
                  alt='Thumbnail'
                />
                <h1 className='text-green-500 self-center'>Video Selected</h1>
              </div>
            ) : (
              <h1 className='text-zinc-700 flex-1 sm:text-right flex flex-col justify-end'>
                No video chosen
              </h1>
            )}
            <button
              type='button'
              onClick={() => videoRef.current.click()}
              disabled={isPending}
              className='border border-black p-2 rounded-lg text-white bg-slate-700 min-w-[161px] hover:opacity-95 disabled:opacity-80 disabled:pointer-events-none'
            >
              Choose a Video
            </button>
          </div>
        </div>
        {isError && (
          <h1 className='text-red-600'>{error.response.data.message}</h1>
        )}
        <button
          className='border border-blue-700 p-3 rounded-[32px] font-semibold text-lg  transition ease-in-out duration-500 hover:bg-blue-500 hover:shadow-lg hover:text-white disabled:opacity-60 disabled:pointer-events-none flex align-middle justify-center'
          type='submit'
          disabled={isPending}
        >
          {isPending ? (
            <TailSpin
              height='28'
              width='50'
              color='black'
              ariaLabel='tail-spin-loading'
              radius='2'
              wrapperStyle={{}}
              wrapperClass=''
              visible={true}
            />
          ) : (
            "Submit"
          )}
        </button>
      </form>
      <div className='mt-4 flex justify-center'>
        <Link
          disabled={isPending}
          className='disabled:opacity-50 disabled:pointer-events-none'
          to='/videos'
        >
          <span className='text-center mx-auto text-amber-500 text-lg cursor-pointer hover:opacity-80 '>
            Show all Videos
          </span>
        </Link>
      </div>
    </div>
  );
};

export default CreateNewVideo;
