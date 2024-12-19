
import { blockContentType } from "./blockContent";
import { categoryType } from "./categoryType";
import { postType } from "./post";
import { socialMedia } from "./socialMedia";
import { aboutMe } from "./about"

export const schema = {
  types: [blockContentType,categoryType, postType, aboutMe, socialMedia],
};