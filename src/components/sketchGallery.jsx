import CardPost from "./CardPostJsx.jsx"; // Corrige la ruta de importación
import "photoswipe/style.css";
import "photoswipe-dynamic-caption-plugin/photoswipe-dynamic-caption-plugin.css";
import { loadQuery } from "../sanity/lib/load-query";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import PhotoSwipeDynamicCaption from "photoswipe-dynamic-caption-plugin";
import { useEffect, useState } from "react";
import { urlForImage } from "../sanity/lib/urlForImage.js";

function sketchGallery() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await loadQuery({
          query: `*[_type == "sketchGallery"] | order(publishedAt) [${page * 20} ... ${(page + 1) * 20}]{title, "mainImage": mainImage.asset->url,
          "imageWidth": mainImage.asset->metadata.dimensions.width,
          "imageHeight": mainImage.asset->metadata.dimensions.height, 'alt' : mainImage.alt,'caption': caption} `,
          params: {},
        });
        setPosts((prevPosts) => [...prevPosts, ...data]);
        if (data.length < 20) {
          setHasMore(false);
        }
      } catch (error) {
        console.error(
          "Error loading posts please check your connection and try again"
        );
      }
    };

    fetchPosts();
  }, [page]);

  useEffect(() => {
    let lightbox;

    const initLightbox = () => {
      if (lightbox) {
        lightbox.destroy();
      }

      lightbox = new PhotoSwipeLightbox({
        gallery: "#my-gallery",
        childSelector: ".pswp-gallery__item",
        showHideAnimationType: "zoom",
        closeOnVerticalDrag: true,
        bgOpacity: 0.9,
        wheelToZoom: true,
        pswpModule: () => import("photoswipe"),
      });

      const captionPlugin = new PhotoSwipeDynamicCaption(lightbox, {
        type: "auto",
        captionContent: ".pswp-caption-content",
        mobileLayoutBreakpoint: 600,
        horizontalEdgeThreshold: 20,
        mobileCaptionOverlapRatio: 0.3,
      });

      lightbox.init();
    };

    initLightbox();

    return () => {
      if (lightbox) {
        lightbox.destroy();
      }
    };
  }, [posts]);

  const loadMorePosts = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <main className="p-4 flex flex-col gap-4">
      <ul
        className="mx-auto flex-1 gap-4 columns-2 md:columns-3 lg:columns-4 xl:columns-5 2xl:columns-6"
        id="my-gallery"
      >
        {posts.map((post, index) => (
          <CardPost
            key={index}
            title={post.title}
            mainImage={urlForImage(post.mainImage)
              .width(1920) // Mantén el ancho original
              .height(Math.round((1920 * post.imageHeight) / post.imageWidth))
              .format("webp")
              .quality(100) // Ajusta la calidad según sea necesario
              .url()}
            imageWidth={1920}
            imageHeight={Math.round((1920 * post.imageHeight) / post.imageWidth)}
            alt={post.alt}
            caption={post.caption}
          />
        ))}
      </ul>
      {hasMore && (
        <div className="flex justify-center p-2">
          <button
            onClick={loadMorePosts}
            className="text-white hover:text-fuchsia-500 load-more-button border border-white rounded-md p-2 active:translate-y-1 active:shadow-lg hover:shadow-md transition-transform duration-75 ease-in-out"
          >
            More
          </button>
        </div>
      )}
    </main>
  );
}

export default sketchGallery;
