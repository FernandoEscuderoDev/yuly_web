import { useEffect, useState, useCallback } from "react";
import CardPost from "./CardPostJsx.jsx";
import "photoswipe/style.css";
import "photoswipe-dynamic-caption-plugin/photoswipe-dynamic-caption-plugin.css";
import { loadQuery } from "../sanity/lib/load-query";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import PhotoSwipeDynamicCaption from "photoswipe-dynamic-caption-plugin";
import { urlForImage } from "../sanity/lib/urlForImage.js";

function GalleryPrueba() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const ITEMS_PER_PAGE = 10;

  // Configuración responsive de thumbnails
  const getThumbnailWidth = () => {
    if (window.innerWidth >= 1536) return 600;
    if (window.innerWidth >= 1280) return 500;
    if (window.innerWidth >= 1024) return 400;
    if (window.innerWidth >= 768) return 300;
    return 200;
  };

  const fetchPosts = useCallback(async () => {
    if (!hasMore || isLoading) return;
    
    setIsLoading(true);
    try {
      const { data } = await loadQuery({
        query: `*[_type == "cardGallery"] | order(_createdAt) [${page * ITEMS_PER_PAGE}...${(page + 1) * ITEMS_PER_PAGE}]{
          _id,
          title,
          "mainImage": mainImage.asset->url,
          "imageWidth": mainImage.asset->metadata.dimensions.width,
          "imageHeight": mainImage.asset->metadata.dimensions.height,
          'alt': mainImage.alt,
          'caption': caption
        }`,
      });

      const processed = data.map(post => ({
        ...post,
        thumbnail: urlForImage(post.mainImage)
          .width(getThumbnailWidth())
          .height(Math.round((getThumbnailWidth() * post.imageHeight) / post.imageWidth))
          .format("webp")
          .quality(80)
          .url(),
        fullImage: urlForImage(post.mainImage)
          .width(1920)
          .height(Math.round((1920 * post.imageHeight) / post.imageWidth))
          .format("webp")
          .quality(90)
          .url()
      }));

      setPosts(prev => [...prev, ...processed]);
      setHasMore(data.length >= ITEMS_PER_PAGE);
    } catch (error) {
      console.error("Error loading posts:", error);
    } finally {
      setIsLoading(false);
    }
  }, [page, hasMore, isLoading, ITEMS_PER_PAGE]);

  useEffect(() => {
    fetchPosts();
  }, [page]);

  // Lightbox initialization
  useEffect(() => {
    const lightbox = new PhotoSwipeLightbox({
      gallery: '#my-gallery',
      children: 'a',
      pswpModule: () => import('photoswipe'),
      ariaLabels: {
        close: 'Cerrar ventana',
        zoom: 'Zoom',
        arrowLeft: 'Anterior',
        arrowRight: 'Siguiente',
        arrowUp: 'Cerrar',
        arrowDown: 'Cerrar'
      }
    });

    new PhotoSwipeDynamicCaption(lightbox, {
      type: 'auto',
      captionContent: (slide) => {
        const element = slide.data.element.parentElement;
        const title = element.querySelector('.pswp-caption-title')?.textContent;
        const caption = element.querySelector('.pswp-caption-text')?.textContent;
        
        return `
          ${title ? `<h2 class="text-xl font-bold mb-2">${title}</h2>` : ''}
          ${caption ? `<p class="text-base">${caption}</p>` : ''}
        `;
      }
    });

    lightbox.on('beforeOpen', () => {
      document.documentElement.style.overflow = 'hidden';
      document.documentElement.setAttribute('aria-hidden', 'true');
    });

    lightbox.on('close', () => {
      document.documentElement.style.overflow = '';
      document.documentElement.removeAttribute('aria-hidden');
    });

    lightbox.init();
    return () => lightbox.destroy();
  }, [posts]);

  const handleLoadMore = () => {
    if (!isLoading) {
      setPage(prev => prev + 1);
    }
  };

  return (
    <main className="p-4 flex flex-col gap-4">
      <ul
        className="mx-auto flex-1 gap-4 columns-2 md:columns-3 lg:columns-4 xl:columns-5 2xl:columns-6"
        id="my-gallery"
      >
        {posts.map((post) => (
          <CardPost
            key={post._id}
            {...post}
          />
        ))}
      </ul>

      {hasMore && (
        <div className="flex justify-center p-2">
          <button
            onClick={handleLoadMore}
            disabled={isLoading}
            className="text-white hover:text-fuchsia-500 border border-white rounded-md p-2 transition-opacity disabled:opacity-50 w-40"
          >
            {isLoading ? 'Loading...' : 'Show more'}
          </button>
        </div>
      )}
    </main>
  );
}

export default GalleryPrueba;