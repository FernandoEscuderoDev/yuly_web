import React, { useState } from "react";
import { urlForImage } from "../sanity/lib/urlForImage";

const POSTS_PER_PAGE = 6;

const PostGrid = ({ posts }) => {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const start = (page - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;
  const paginatedPosts = posts.slice(start, end);

  return (
    <div className="p-4 pb-0">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {paginatedPosts.map((post) => (
          <div
            key={post._id}
            className="group bg-fuchsia-700/20 backdrop-blur-sm rounded-xl overflow-hidden 
                     shadow-lg hover:shadow-fuchsia-500/20 transition-all duration-300 
                     hover:transform hover:scale-105"
          >
            <a href={`/post/${post.slug.current}`} className="block">
              <div className="relative">
                <img
                  src={urlForImage(post.mainImage)
                    .width(600)
                    .height(600)
                    .quality(70)
                    .format("webp")
                    .url()}
                  alt={post.alt}
                  className="w-full h-64 object-cover transition-transform duration-300 
                           group-hover:scale-105"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t group-hover:scale-105 from-black/60 to-transparent opacity-0 
                              group-hover:opacity-100 transition-opacity duration-300"
                />
              </div>
              <div className="p-5 space-y-3">
                <h2 className="text-2xl font-semibold text-fuchsia-300 capitalize">
                  {post.title}
                </h2>
                <p className="text-gray-100 line-clamp-2">{post.description}</p>
              </div>
            </a>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center gap-3 my-4">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`w-10 h-10 rounded-full transition-all duration-300 
                     flex items-center justify-center text-lg font-medium
                     ${
                       page == i + 1
                         ? "bg-fuchsia-600 text-white shadow-lg shadow-fuchsia-500/50"
                         : "bg-white/10 text-gray-300 hover:bg-fuchsia-600/30"
                     }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PostGrid;
