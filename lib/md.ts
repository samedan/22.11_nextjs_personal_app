import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import {
  ContentItemName,
  MarkdownContent,
  MarkdownItem,
  SearchContent,
} from "@interfaces/Markdown";
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
  const items = fileNames
    .map((name) => get(name))
    .sort((item1, item2) => (item1.date > item2.date ? -1 : 1));
  return items;
};

const markdownToHtml = async (markdown: string) => {
  const result = await remark().use(html).use(remarkGfm).process(markdown);
  return result.toString();
};

const saveSearchData = (content: MarkdownContent) => {
  const searchFile = getDir("/content/search/index.json");
  const searchItemList: SearchContent[] = [];
  Object.keys(content) // transforms {}s into []s
    // const content = {
    //    blogs: [{b1}, {b2}, ...],
    //    portfolios: [{p1}, {p2}, ...]
    // }
    // Object.keys(content) => ['blogs', 'portfolios']
    .forEach((dataSource) => {
      const contentName = dataSource as ContentItemName; // "blogs" or "portfolios" keys
      content[contentName].forEach((data) => {
        const searchItem = {} as SearchContent;
        searchItem.slug = data.slug;
        searchItem.title = data.title;
        searchItem.description = data.description;
        searchItem.category = contentName;
        searchItemList.push(searchItem);
      });
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
