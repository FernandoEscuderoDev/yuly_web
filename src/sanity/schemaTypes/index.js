import { authorType } from "./author";
import { blockContentType } from "./blockContent";
import { categoryType } from "./category";
import { postType } from "./post";
import { socialMedia } from "./socialMedia";

export const schema = {
  types: [authorType, blockContentType, categoryType, postType, socialMedia],
};