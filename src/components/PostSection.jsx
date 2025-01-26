import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay } from "swiper/modules";
import { loadQuery } from "../sanity/lib/load-query"; // Ajusta la ruta
import { urlForImage } from "../sanity/lib/urlForImage"; // Ajusta la ruta también

export default function PostSection() {
  const [postsDestacados, setPostsDestacados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const destacadosQuery = `
        *[_type == "post" && destacado == true] | order(publishedAt desc) {
          _id,
          title,
          "slug": slug.current,
          mainImage,
          "altText": mainImage.alt
        }
      `;

      try {
        const { data: posts } = await loadQuery({ query: destacadosQuery });
        setPostsDestacados(posts);
      } catch (err) {
        setError("Hubo un error al cargar los posts destacados.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <p className="text-center text-white text-2xl my-4">
        Cargando post destacados...
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-center text-white text-2xl my-4">
        Error al cargar los post destacados.
      </p>
    );
  }

  if (!postsDestacados || postsDestacados.length === 0) {
    return <p>No hay posts destacados disponibles.</p>;
  }

  console.log(postsDestacados.length);

  return (
    <div
      className="w-full mx-auto text-center text-white p-4 pb-2"
      style={{ maxWidth: "100vw" }}
    >
      <h2 className="text-3xl mb-4 font-semibold">Post Destacados</h2>
      <Swiper
        className="h-52"
        slidesPerView={1}
        spaceBetween={16}
        centeredSlides={true}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 4,
          },
        }}
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
      >
        {postsDestacados.map((post) => (
          <SwiperSlide
          key={post._id}
          className="relative bg-white shadow-lg rounded-xl overflow-hidden group hover:shadow-xl transition-all duration-300"
        >
          <a
            href={`/blog/${post.slug}`}
            className="block h-full"
          >
            {/* Contenedor de imagen con relación de aspecto */}
            <div className="relative aspect-video overflow-hidden">
              <img
                src={urlForImage(post.mainImage)
                  .width(1200)
                  .height(675) // 16:9 ratio (1200x675)
                  .fit('crop')
                  .crop('focalpoint')
                  .quality(80)
                  .auto('format')
                  .url()}
                alt={post.altText || post.title}
                className="w-full h-full object-cover absolute inset-0 transform transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>
        
            {/* Overlay de texto mejorado */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 flex flex-col justify-end">
              <h3 className="text-white text-lg md:text-xl font-bold capitalize leading-tight transition-colors duration-300 group-hover:text-fuchsia-400">
                {post.title}
              </h3>
              
              {/* Efecto hover */}
              <div className="absolute inset-0 rounded-xl transition-all duration-300 pointer-events-none" />
            </div>
          </a>
        </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
