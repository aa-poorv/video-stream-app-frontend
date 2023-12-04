import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./utils/http";
import CreateNewVideo from "./pages/CreateNewVideo";
import VideoPlay from "./pages/VideoPlay";
import Videos from "./pages/Videos";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CreateNewVideo />,
  },
  {
    path: "/video/:id",
    element: <VideoPlay />,
  },
  {
    path: "/videos",
    element: <Videos />,
  },
]);

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
