import React, { memo } from 'react';
import { urlForImage } from '../sanity/lib/urlForImage';

const CardPost = memo(({
  title,
  mainImage,
  imageWidth,
  imageHeight,
  alt,
  caption,
  isPriority // Nueva prop para imágenes críticas
}) => {
  const altText = alt || caption || title || "Imagen de la galería";
  const srCaption = title || caption ? `${title} ${caption}` : altText;
  
  // Tamaños responsivos basados en columnas
  const generateSrcSet = () => {
    const breakpoints = {
      '2xl': 600,
      xl: 500,
      lg: 400,
      md: 300,
      default: 200
    };
    
    return Object.values(breakpoints)
      .map(width => {
        const height = Math.round((width * imageHeight) / imageWidth);
        return `${urlForImage(mainImage)
          .width(width)
          .height(height)
          .format('webp')
          .quality(75)} ${width}w`;
      })
      .join(', ');
  };

  // URL base para pre-carga
  const baseImage = urlForImage(mainImage)
    .width(400)
    .format('webp')
    .quality(80)
    .url();

  return (
    <li className="relative mb-4 break-inside-avoid group">
      <a
        href={urlForImage(mainImage).width(1920).quality(90).url()}
        data-pswp-width={imageWidth}
        data-pswp-height={imageHeight}
        className="block overflow-hidden rounded-lg transition-shadow duration-300 hover:shadow-lg"
        role="button"
        aria-label={`Ver detalle de: ${srCaption}`}
        tabIndex="0"
      >
        <div className="overflow-hidden rounded-lg">
          <img
            src={baseImage}
            srcSet={generateSrcSet()}
            sizes="(max-width: 640px) 50vw,
                   (max-width: 768px) 33vw,
                   (max-width: 1024px) 25vw,
                   20vw"
            alt={altText}
            loading={isPriority ? "eager" : "lazy"}
            decoding={isPriority ? "sync" : "async"}
            className="w-full h-auto object-cover transition-transform duration-300 transform group-hover:scale-105"
            style={{
              aspectRatio: `${imageWidth}/${imageHeight}`,
              backgroundColor: '#0f172a'
            }}
            aria-describedby={`desc-${title}`}
          />
        </div>
        
        {/* Contenido oculto para el lightbox */}
        <div className="sr-only" aria-hidden="true">
          <div className="pswp-caption-title">{title}</div>
          <div className="pswp-caption-text">{caption}</div>
        </div>

        {/* Descripción accesible */}
        <div id={`desc-${title}`} className="sr-only">
          {srCaption}
        </div>
      </a>
    </li>
  );
});

export default CardPost;