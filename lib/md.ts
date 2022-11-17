import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import { MarkdownItem, SearchContent } from "@interfaces/Markdown";
import { remark } from "remark";
import html from "remark-html";
import remarkGfm from "remark-gfm";
import { Blog } from "./../interfaces/Blog";

// cwd = current WorkingDirectory = 'C:\\apps\\neXt_js\\22.11_filip_personal-app\\pset'
const getDir = (path: string) => join(process.cwd(), path);

const getFileNames = (dir: string): string[] => {
  return fs.readdirSync(dir);
};

const getItemInPath = (filePath: string): MarkdownItem => {
  const fileContent = fs.readFileSync(filePath, "utf8");
  // data = metaBeginning of file, content = rest
  const { data, content } = matter(fileContent);
  return { ...data, content } as MarkdownItem;
};

const getAllItems = (
  fileNames: string[],
  get: (name: string) => MarkdownItem
) => {
  const items = fileNames.map((name) => get(name));
  return items;
};

const markdownToHtml = async (markdown: string) => {
  const result = await remark().use(html).use(remarkGfm).process(markdown);
  return result.toString();
};

const saveSearchData = (blogs: Blog[]) => {
  const searchFile = getDir("/content/search/index.json");
  const searchItemList: SearchContent[] = [];

  blogs.forEach((blog) => {
    const searchItem = {} as SearchContent;
    searchItem.slug = blog.slug;
    searchItem.title = blog.title;
    searchItem.description = blog.description;
    searchItem.category = "blogs";
    searchItemList.push(searchItem);
  });

  fs.writeFileSync(
    searchFile,
    JSON.stringify(
      searchItemList,
      null, //replacer function
      2 // spacer, formats the searchResults.json file
    )
  );
};

export {
  getDir,
  getFileNames,
  getItemInPath,
  getAllItems,
  markdownToHtml,
  saveSearchData,
};
