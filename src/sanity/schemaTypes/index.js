import { blockContentType } from "./blockContent";
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
    postType,
    aboutMe,
    socialMedia,
  ],
};
