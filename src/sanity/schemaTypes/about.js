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
      name: "content",
      type: "array",
      title: "Contenido",
      description: "El contenido principal de la sección 'Sobre mí'.",
      of: [{ type: "block" }],
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
      name: "socialLinks",
      type: "array",
      title: "Enlaces a redes sociales",
      description: "Lista de enlaces a tus perfiles en redes sociales.",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "platform",
              type: "string",
              title: "Plataforma",
              description: "Nombre de la plataforma de redes sociales (por ejemplo, Facebook, Twitter).",
            },
            {
              name: "url",
              type: "url",
              title: "URL",
              description: "El enlace a tu perfil en la plataforma de redes sociales.",
            },
          ],
        },
      ],
    }),
  ],
});