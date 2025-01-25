import React, { memo } from 'react';

const CardPostJsx = memo(({
  title,
  thumbnail,
  fullImage,
  imageWidth,
  imageHeight,
  alt,
  caption
}) => {
  const altText = alt || caption || title || "Imagen de la galería";
  const srCaption = title || caption ? `${title} ${caption}` : altText;

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
            src={thumbnail}
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