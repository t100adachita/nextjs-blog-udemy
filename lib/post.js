import path from "path";
import fs from "fs";
import matterSSS from "gray-matter";
// import matterSSS from "matter";
import { remark } from "remark";
import html from "remark-html";

// console.log("path======================", path.join(process.cwd(), "posts"));

const postsDirectory = path.join(process.cwd(), "posts");
// console.log("===---------------------------------------------");
// console.log(postsDirectory);

// mdファイルのデータを取り出す
export function getPostsData() {
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map((fileName) => {
        const id = fileName.replace(/\.md$/, "");  //ファイル名(id)

        // console.log("id====", id);
        
        //マークダウンファイルを文字列として読み取る
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        
        // console.log("fullPath=======", fullPath);
        // console.log("fileContents===", fileContents);
        
        const matterResult = matterSSS(fileContents);
        
        // console.log("matterResult===", matterResult);

        //idとデータを返す
        return {
            id, 
            ...matterResult.data,
        }
    });
    return allPostsData;
}

//getStaticPathでreturnで使うpathを取得する
export function getAllPostIds() {
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames.map((fileName) => {
        return {
            params: {
                id: fileName.replace(/\.md$/, ""),
            }
        }
    });
    /*
        [
            {
                parames: {
                    id:"ssg-ssr"
                }
            },
            {
                parames: {
                    id:"next-react"
                }
            }
        ]
    */
}

// idに基づいてブログ投稿データを返す
export async function getPostData(id) {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContent = fs.readFileSync(fullPath, "utf8");
    
    const matterResult = matterSSS(fileContent);
    // matterResult.content //文字列

    const blogContent = await remark()
    .use(html).
    process(matterResult.content);

    const blogContentHTML = blogContent.toString();

    console.log("===================", blogContent);

    return {
        id,
        blogContentHTML,
        ...matterResult.data,
    };
}