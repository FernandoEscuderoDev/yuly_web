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
    return <p className="text-center text-white text-2xl my-4">Cargando post destacados...</p>;
  }

  if (error) {
    return <p className="text-center text-white text-2xl my-4">Error al cargar los post destacados.</p>;
  }

  if (!postsDestacados || postsDestacados.length === 0) {
    return <p>No hay posts destacados disponibles.</p>;
  }

  return (
    <div className="w-full mx-auto text-center text-white p-4" style={{ maxWidth: "100vw" }}>
      <h2 className="text-3xl mb-4 font-semibold">Destacados</h2>
      <Swiper
        className="h-52"
        slidesPerView={1}
        spaceBetween={10}
        centeredSlides={true}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
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
          <SwiperSlide key={post._id} className="relative bg-white text-white shadow-lg rounded-lg overflow-hidden">
            <img
              src={urlForImage(post.mainImage).width(800).height(900).quality(20).format("webp").url()}
              alt={post.altText || `Imagen del post ${post.title}`}
              className="w-full h-full object-top object-cover rounded-lg"
            />
            <div className="p-4 absolute bottom-0 left-0 w-full bg-fuchsia-900 bg-opacity-75">
              <h3 className="text-lg font-semibold capitalize">{post.title}</h3>
              <a href={`/post/${post.slug}`} className="text-blue-500 hover:underline">
                Leer más
              </a>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
