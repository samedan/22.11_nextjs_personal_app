import { join } from "path";
import { Blog } from "../interfaces/Blog";
import { getAllItems, getDir, getFileNames, getItemInPath } from "./md";

const BLOG_DIR = getDir("/content/blogs");
// join(process.cwd(), "/content/blogs") =
// 'C:\\apps\\neXt_js\\22.11_filip_personal-app\\pset\\content\\blogs'

const getBlogFileNames = () => {
  return getFileNames(BLOG_DIR);
};

const getBlog = (fileName: string): Blog => {
  const blog = getItemInPath(join(BLOG_DIR, fileName)) as Blog;
  return blog;
};

const getBlogs = (): Blog[] => {
  const names = getBlogFileNames();
  return getAllItems(names, getBlog) as Blog[];
};

export { getBlogFileNames, getBlog, getBlogs };
