import { defineField, defineType } from "sanity";

export const socialMedia = defineType({
  name: "SocialLink",
  type: "document",
  fields: [
    defineField({
      name: "links",
      title: "Redes",
      type: "array",
      title: "Social Links",
      of: [
        {
          type: "object",
          title: "Redes",
          fields: [
            {
              name: "redtitulo",
              type: "string",
              title: "Red",
              validation: (Rule) =>
                Rule.required()
                  .min(2)
                  .max(50)
                  .warning("El título debe tener entre 2 y 50 caracteres"),
            },
            {
              name: "redhref",
              type: "url",
              title: "Link",
              validation: (Rule) =>
                Rule.required()
                  .uri({ scheme: ["http", "https"] })
                  .warning("Debe ser una URL válida"),
            },
          ],
        },
      ],
    }),
  ],

  preview: {
    select: {
      title: "links.0.redtitulo",
      subtitle: "links.0.redhref",
    },
    prepare(selection) {
      const { title, subtitle } = selection;
      return {
        title: title || "Sin título",
        subtitle: subtitle || "Sin enlace",
      };
    },
  },
});
