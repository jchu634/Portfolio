import { redirect, notFound } from 'next/navigation';

const redirects: { [key: string]: string } = {
  'ncert1': 'https://learn.nvidia.com/certificates?id=31686a8c7abd43eab2ba9cb3ac5e84c4',
  'ncert2': 'https://learn.nvidia.com/certificates?id=b1q-EbzHTJKDx6tTAl4EDw',
};

function sanitizeString(str:String){
    str = str.replace(/[^a-z0-9áéíóúñü \.,_-]/gim,"");
    return str.trim();
}

export default function Page({ params }: { params: { slug: string } }) {
    const sanitizedSlug = sanitizeString(params.slug);
    if (redirects[params.slug]) {
      redirect(redirects[params.slug]);
    } else {
        return notFound();
    }
}