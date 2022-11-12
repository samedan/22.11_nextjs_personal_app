import fs from 'fs';
import {join} from 'path'

// cwd = current WorkingDirectory = 'C:\\apps\\neXt_js\\22.11_filip_personal-app\\pset'
const getDir = (path: string) => join(process.cwd(), path)

// join(process.cwd(), "/content/blogs") =
// 'C:\\apps\\neXt_js\\22.11_filip_personal-app\\pset\\content\\blogs'

const getFileNames = (dir: string): string[] => {
    return fs.readdirSync(dir);
}

export {
    getFileNames,
    getDir
}