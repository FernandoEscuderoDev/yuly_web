import React from "react";
import { urlForImage } from "../sanity/lib/urlForImage";

function CardPostJsx({
  title,
  mainImage,
  imageWidth,
  imageHeight,
  alt,
  caption,
}) {
  return (
    <li className="md:hover:underline pswp-gallery__item max-w-full mb-4 group md:hover:z-30 rounded-lg break-inside-avoid">
      <a
        href={mainImage}
        data-pswp-width={1920}
        data-pswp-height={imageHeight}
        data-pswp-caption={alt || "Imagen sin texto Alternativo"}
      >
        <img
          className="max-w-full object-cover rounded-lg transform md:group-hover:scale-105 md:group-hover:shadow-[rgba(0,_0,_0,_0.10)_0px_0px_60px_-10px] md:group-hover:shadow-fuchsia-500 transition-all duration-300 ease-in-out backdrop-filter backdrop-blur-md bg-opacity-20 bg-white"
          src={mainImage}
          loading="lazy"
          decoding="async"
          alt={alt || "Imagen sin texto Alternativo"}
          height={imageHeight}
          width={imageWidth}
        />
      </a>
      <div className="pswp-caption-content text-balance">
        <h2 className="text-xl font-bold">{title}</h2>
        <p>{caption || "Imagen sin texto Alternativo"}</p>
      </div>
    </li>
  );
}

export default CardPostJsx;
