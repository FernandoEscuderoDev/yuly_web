import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schema } from "./src/sanity/schemaTypes";
import { unsplashImageAsset } from "sanity-plugin-asset-source-unsplash";
import { media } from "sanity-plugin-media";
import deleteAction from "./src/sanity/actions/deleteAction";
import BulkDeleteTool from "./src/sanity/tools/BulkDeleteTool.jsx";

export default defineConfig({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET,

  plugins: [structureTool(), visionTool(), unsplashImageAsset(), media()],

  schema: schema,

  document: {
    actions: (prev, context) => {
      // Verificación segura de usuario y rol
      if (
        context.schemaType === "cardGallery" &&
        context?.currentUser?.roles?.some(
          (role) => role.name === "administrator"
        )
      ) {
        return [...prev, deleteAction];
      }
      return prev;
    },
  },

  tools: (prev, context) => {
    // Context añadido como parámetro
    // Validación en cascada con optional chaining
    const isAdmin = context?.currentUser?.roles?.some(
      (role) => role.name === "administrator"
    );

    return isAdmin
      ? [
          ...prev,
          {
            name: "bulk-delete",
            title: "Eliminar en lote",
            component: BulkDeleteTool,
          },
        ]
      : prev;
  },

  api: {
    cors: {
      origins: [
        process.env.NODE_ENV === "production"
          ? "https://pruebasyuly.netlify.app/"
          : "http://localhost:4321",
      ],
      credentials: process.env.NODE_ENV === "production",
    },
  },
});
