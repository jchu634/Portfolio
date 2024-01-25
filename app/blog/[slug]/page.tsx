
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
      <article className="prose prose-xl prose-stone dark:prose-invert">
        <h1> {post.title.toString()} </h1>
        <h4> Published: {post.date.toString()}</h4>
        <blockquote> {post.description.toString()} </blockquote>
      </article>
      <article className="prose prose-xl prose-rosestone dark:prose-invert" dangerouslySetInnerHTML={{ __html: sanitisedHTML }} />
    </div>
  )
}