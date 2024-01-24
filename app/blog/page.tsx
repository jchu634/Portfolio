import { getSortedPostsData, getAllPostNames } from '@/lib/post';
import { Separator } from '@/components/ui/separator'
import Link from 'next/link';

export default function Page(){
    const allPostsData = getSortedPostsData();
    console.log(getAllPostNames());
    return (
        <div>
            <h1 className="text-3xl font-bold text-blue-900 dark:text-slate-200">Blog</h1><br></br>
            <ul>
                { allPostsData.map(({ id, date, title, description }) => (
                    <Link
                    href={`/blog/${id}`}>
                        <div className="mb-4" >
                            <li key={id} className="mb-4">
                                {/* <p>{id}</p> */}
                                <h2 className="text-2xl font-bold">{title.toString()}</h2>
                                <p className="text-base">{description.toString()}</p>
                                <p className="text-base">Published: {date.toString()}</p>
                            </li>
                            <Separator></Separator>
                        </div>
                    </Link>
                
                
                ))}
                
            </ul>
            
        </div>
    )
}