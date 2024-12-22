import { defineField, defineType } from "sanity";

export const aboutMe = defineType({
  name: "aboutMe",
  type: "document",
  title: "Sobre mí",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Título",
      description: "El título de la sección 'Sobre mí'.",
    }),
    defineField({
      name: "image",
      type: "image",
      title: "Imagen",
      description: "Una imagen representativa para la sección 'Sobre mí'.",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Texto alternativo",
          description: "Texto alternativo para la imagen.",
        },
      ],
    }),
    defineField({
      name: "content",
      type: "array",
      title: "Contenido",
      description: "El contenido principal de la sección 'Sobre mí'.",
      of: [{ type: "block" }],
    }),
  ],
});
