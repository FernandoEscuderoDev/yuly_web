import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from '@sanity/vision';
import { schema } from "./src/sanity/schemaTypes";
import { unsplashImageAsset } from "sanity-plugin-asset-source-unsplash";
import { media } from 'sanity-plugin-media';
import deleteAction from './src/sanity/actions/deleteAction';
import BulkDeleteTool from './src/sanity/tools/BulkDeleteTool.jsx';

export default defineConfig({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET,
  plugins: [structureTool(), visionTool(), unsplashImageAsset(), media()],
  schema,
  document: {
    actions: (prev, context) => {
      if (context.schemaType === 'cardGallery') {
        return [...prev, deleteAction];
      }
      return prev;
    },
  },
  tools: (prev) => {
    return [...prev, { name: 'bulk-delete', title: 'Eliminar en lote', component: BulkDeleteTool }];
  },
});