import { defineField, defineType } from "sanity";

export const postType = defineType({
  name: "post",
  type: "document",
  title: "Artículos",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Título",
      description: "El título del artículo",
    }),
    defineField({
      name: "categories",
      type: "array",
      title: "Categorías",
      description: "Las categorías a las que pertenece el artículo",
      of: [
        {
          type: "reference",
          to: [{ type: "category" }], // Referencia al esquema de categorías
        },
      ],
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "Slug",
      description: "El slug del artículo, generado a partir del título",
      options: {
        source: "title",
        maxLength: 96,
      },
    }),
    defineField({
      name: "mainImage",
      type: "image",
      title: "Imagen Principal",
      description: "La imagen principal del artículo",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Texto Alternativo",
          description: "Texto alternativo para la imagen principal",
        },
      ],
    }),
    defineField({
      name: "publishedAt",
      type: "datetime",
      title: "Fecha de Publicación",
      description: "La fecha y hora en que se publicó el artículo",
      initialValue: () => new Date().toISOString(),
    }),
    {
      name: "destacado",
      type: "boolean",
      title: "Destacado",
      description: "Marcar como destacado para mostrar en el carrousel.",
    },
    defineField({
      name: "body",
      type: "blockContent",
      title: "Cuerpo",
      description: "El contenido principal del artículo",
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "mainImage",
      destacado: "destacado",
    },
    prepare({ title, media, destacado }) {
      return {
        title: title,
        media: media,
        subtitle: destacado ? "Destacado" : "No destacado",
      };
    },
  },
});
