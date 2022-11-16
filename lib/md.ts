import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import { MarkdownItem } from "./../interfaces/Markdown";
import { Blog } from "../interfaces/Blog";

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

export { getDir, getFileNames, getItemInPath, getAllItems };
