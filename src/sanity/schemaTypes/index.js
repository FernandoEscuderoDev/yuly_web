
import { blockContentType } from "./blockContent";
import { categoryType } from "./categoryType";
import { postType } from "./post";
import { socialMedia } from "./socialMedia";
import { aboutMe } from "./about"
import { cardGallery } from "./cardGallery";

export const schema = {
  types: [blockContentType,categoryType,cardGallery, postType, aboutMe, socialMedia],
};