import CardPost from "./CardPostJsx.jsx"; // Corrige la ruta de importación
import "photoswipe/style.css";
import "photoswipe-dynamic-caption-plugin/photoswipe-dynamic-caption-plugin.css";
import { loadQuery } from "../sanity/lib/load-query";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import PhotoSwipeDynamicCaption from "photoswipe-dynamic-caption-plugin";
import { useEffect, useState, useRef } from "react";

function GalleryPrueba() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await loadQuery({
          query: `*[_type == "cardGallery" && defined(slug.current)] | order(publishedAt) [${page * 4} ... ${(page + 1) * 4}]{title, "mainImage": mainImage.asset->url,
          "imageWidth": mainImage.asset->metadata.dimensions.width,
          "imageHeight": mainImage.asset->metadata.dimensions.height, 'alt' : mainImage.alt,'caption': caption} `,
          params: {},
        });
        setPosts((prevPosts) => [...prevPosts, ...data]);
        if (data.length < 4) {
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
            mainImage={post.mainImage}
            imageWidth={post.imageWidth}
            imageHeight={post.imageHeight}
            alt={post.alt}
            caption={post.caption}
          />
        ))}
      </ul>
      {hasMore && (
        <div className="flex justify-center p-2">
          <button
            onClick={loadMorePosts}
            className="text-white load-more-button"
          >
            Cargar más
          </button>
        </div>
      )}
    </main>
  );
}

export default GalleryPrueba;
