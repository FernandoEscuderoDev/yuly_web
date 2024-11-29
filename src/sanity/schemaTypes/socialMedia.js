import { defineField, defineType } from "sanity";

export const socialMedia = defineType({
  name: "SocialLink",
  type: "document",
  fields: [
    defineField({
      name: "links",
      type: "array",
      title: "Social Links",
      of: [
        {
          type: "object",
          title:'Redes',
          fields: [
            {
              name: "redtitulo",
              type: "string",
              title: "Red",
            },
            {
              name: "redhref",
              type: "string",
              title: "link",
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      links: "links",
    },
    prepare({ links }) {
      return {
        title: "Links Redes",
        subtitle: links
          ? `${links.length} link(s)`
          : "Sin links",
      };
    },
  },
});
