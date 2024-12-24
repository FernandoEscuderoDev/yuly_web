import { defineField, defineType } from "sanity";

export const cardBocetos = defineType({
  name: "sketchGallery",
  type: "document",
  title: "Galería de Bocetos",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Título",
      description: "El título del dibujos",
    }),
    defineField({
      name: "publishedAt",
      type: "datetime",
      title: "Fecha de Publicación",
      description: "La fecha y hora en que se publicó el dibujo",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "mainImage",
      type: "image",
      title: "Imagen Principal",
      description: "La imagen principal de la galería",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Texto Alternativo",
          description:
            "Texto descriptivo de la imagen para lectores de pantalla",
        },
      ],
    }),
    defineField({
      name: "caption",
      type: "text",
      title: "Leyenda",
      description: "Texto para la leyenda de la imagen, máximo 150 caracteres",
      validation: (Rule) =>
        Rule.max(150).warning("¡Excedes los 150 caracteres!"),
    }),
  ],
});
