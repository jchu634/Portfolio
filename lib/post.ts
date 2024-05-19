import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'blogposts');

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.mdx?$/, '');

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);
    
    // Combine the data with the id
    return {
      id,
      date:String,
      title:String,
      description:String,
      lastUpdate:String,
      ...matterResult.data,
    };
  });
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}
export function getAllPostNames(){
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.mdx?$/, '');
    return {id};
  });
  // Sort posts by date
  return allPostsData;
}

export function getPostByName(name:string){
  // Read markdown file as string
  let fullPath = path.join(postsDirectory, `${name}.mdx`);
  if (!fs.existsSync(fullPath)) {
    fullPath = path.join(postsDirectory, `${name}.md`);
    if (!fs.existsSync(fullPath)) {
      return null;
    }
  }
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);
  // Combine the data with the id
  return {
    name,
    date:String,
    title:String,
    description:String,
    lastUpdate:String,
    content:matterResult.content,
    ...matterResult.data,
  };
}