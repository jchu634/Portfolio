
import { getAllPostNames, getPostByName } from '@/lib/post'
import { notFound } from 'next/navigation'

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
  
  return (
    <div>
      <h1> {post.title.toString()} </h1>
      <p> {post.description.toString()} </p>
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