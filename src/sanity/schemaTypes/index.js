import { blockContentType } from "./blockContent";
import { categoryType } from "./categoryType";
import { postType } from "./post";
import { socialMedia } from "./socialMedia";
import { aboutMe } from "./about";
import { cardGallery } from "./cardGallery";
import { cardBocetos } from "./cardBocetos";

export const schema = {
  types: [
    blockContentType,
    cardGallery,
    cardBocetos,
    categoryType,
    postType,
    aboutMe,
    socialMedia,
  ],
};
