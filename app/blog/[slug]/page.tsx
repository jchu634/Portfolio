
import { getAllPostNames, getPostByName } from '@/lib/post'
import { notFound } from 'next/navigation'
import { JSDOM } from 'jsdom';
import createDOMPurify from 'dompurify';


export function generateStaticParams() {
  return getAllPostNames();
}

export default function Page({params}: {params: {slug: string}}) {
  const { slug } = params;
  const post = getPostByName(slug);
  if (!post){
    return notFound();
  }
  console.log(slug)
  
  const window = new JSDOM('').window;
  const purify = createDOMPurify(window);
  const sanitisedHTML = purify.sanitize(post.content);
  
  return (
    <div>
      <h1 className="text-5xl font-bold text-blue-900 dark:text-slate-200"> {post.title.toString()} </h1>
      <p className="text-1xl font-bold text-blue-900 dark:text-slate-200"> Published: {post.date.toString()}</p>
      <p > {post.description.toString()} </p><br></br>
      <div dangerouslySetInnerHTML={{ __html: sanitisedHTML }} />

      
    </div>
  )
}
// export async function generateStaticParams() {
//   const posts = await (getSortedPostsData)\;

 
//   return posts.map((post) => ({
//     slug: post.slug,
//   }))
// }
// export default function Page({ params }: { params: { slug: string } }) {
//   return <div>My Post: {params.slug}</div>
// }