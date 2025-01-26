import React, { memo } from 'react';
import { urlForImage } from '../sanity/lib/urlForImage';

const CardPostJsx = memo(({
  title,
  mainImage,
  imageWidth,
  imageHeight,
  alt,
  caption
}) => {
  const altText = alt || caption || title || "Imagen de la galería";
  const srCaption = title || caption ? `${title} ${caption}` : altText;
  
  // Generar diferentes tamaños para srcset
  const generateSrcSet = (imageUrl) => {
    const widths = [200, 300, 400, 500, 600, 800, 1000, 1200, 1400, 1600, 1920];
    return widths
      .map(width => {
        const height = Math.round((width * imageHeight) / imageWidth);
        return `${urlForImage(imageUrl)
          .width(width)
          .height(height)
          .format('webp')
          .quality(80)} ${width}w`;
      })
      .join(', ');
  };

  // URL para la imagen full size
  const fullImage = urlForImage(mainImage)
    .width(1920)
    .format('webp')
    .quality(90)
    .url();

  return (
    <li className="relative mb-4 break-inside-avoid group">
      <a
        href={fullImage}
        data-pswp-width={imageWidth}
        data-pswp-height={imageHeight}
        className="block overflow-hidden rounded-lg transition-shadow duration-300 hover:shadow-lg"
        role="button"
        aria-label={`Ver detalle de: ${srCaption}`}
        tabIndex="0"
      >
        <div className="overflow-hidden rounded-lg">
          <img
            src={urlForImage(mainImage)
              .width(400)
              .format('webp')
              .quality(80)
              .url()}
            srcSet={generateSrcSet(mainImage)}
            sizes="(max-width: 768px) 100vw,
                   (max-width: 1024px) 50vw,
                   (max-width: 1280px) 33vw,
                   25vw"
            alt={altText}
            loading="lazy"
            decoding="async"
            className="w-full h-auto object-cover transition-transform duration-300 transform group-hover:scale-105"
            style={{
              aspectRatio: `${imageWidth}/${imageHeight}`,
              backgroundColor: '#f5f5f5'
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

export default CardPostJsx;