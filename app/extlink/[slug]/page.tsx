import { redirect, notFound } from "next/navigation";

const redirects: { [key: string]: string } = {
  ncert1:
    "https://learn.nvidia.com/certificates?id=31686a8c7abd43eab2ba9cb3ac5e84c4",
  ncert2: "https://learn.nvidia.com/certificates?id=b1q-EbzHTJKDx6tTAl4EDw",
  ncert3: "https://learn.nvidia.com/certificates?id=XXFvD6R6SH21dlO1gCxg4Q",
  ucert:
    "https://www.myequals.net/sharelink/636507e6-d4d8-499d-a98e-1f01490cb092/846d6a10-5f8d-4857-86da-e69abd4ee594",
};

function sanitizeString(str: string) {
  str = str.replace(/[^a-z0-9áéíóúñü \.,_-]/gim, "");
  return str.trim();
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const sanitizedSlug = sanitizeString(slug);
  if (redirects[sanitizedSlug]) {
    redirect(redirects[sanitizedSlug]);
  } else {
    return notFound();
  }
}
