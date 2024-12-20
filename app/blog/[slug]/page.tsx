import { getAllPostNames, getPostByName } from "@/lib/post";
import { notFound } from "next/navigation";
import { JSDOM } from "jsdom";
import createDOMPurify from "dompurify";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import Image from "next/image";
import { highlight } from "sugar-high";
import React, { ReactNode, ReactElement, ComponentType } from "react";

interface TableProps {
  data: {
    headers: string[];
    rows: string[][];
  };
}

function Table({ data }: TableProps) {
  let headers = data.headers.map((header, index) => (
    <th key={index}>{header}</th>
  ));
  let rows = data.rows.map((row, index) => (
    <tr key={index}>
      {row.map((cell, cellIndex) => (
        <td key={cellIndex}>{cell}</td>
      ))}
    </tr>
  ));

  return (
    <table>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

interface LinkProps {
  href: string;
  children: ReactNode;
}

function CustomLink({ href, children, ...props }: LinkProps) {
  if (href.startsWith("/")) {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    );
  }

  if (href.startsWith("#")) {
    return <a {...props}>{children}</a>;
  }

  return (
    <a target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
}

interface ImageProps {
  alt: string;
  src: string;
  width: number;
  height: number;
}

function RoundedImage({ alt, ...props }: ImageProps) {
  return <Image alt={alt} className="rounded-lg" {...props} />;
}

interface CodeProps {
  children: string;
}

function Code({ children, ...props }: CodeProps) {
  let codeHTML = highlight(children);
  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
}

function slugify(str: string) {
  return str
    .toString()
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word characters except for -
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -
}

function createHeading(level: number) {
  const Heading = ({ children }: { children: ReactNode }): ReactElement => {
    let slug = slugify(children as string);
    return React.createElement(
      `h${level}`,
      { id: slug },
      [
        React.createElement("a", {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: "anchor",
        }),
      ],
      children,
    );
  };

  Heading.displayName = `Heading${level}`;

  return Heading;
}

let components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  Image: RoundedImage,
  a: CustomLink,
  code: Code,
  Table,
};

function generateStaticParams() {
  return getAllPostNames();
}

interface CustomMDXProps {
  source: string;
  components?: { [key: string]: ComponentType<any> };
}

function CustomMDX({ source, components = {} }: CustomMDXProps) {
  return <MDXRemote source={source} components={{ ...components }} />;
}

export default function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const post = getPostByName(slug);
  if (!post) {
    return notFound();
  }

  const window = new JSDOM("").window;
  const purify = createDOMPurify(window);
  const sanitisedHTML = purify.sanitize(post.content);

  return (
    <div>
      <article className="prose prose-sm prose-stone dark:prose-invert sm:prose-base lg:prose-lg xl:prose-xl 2xl:prose-2xl">
        <h1> {post.title.toString()} </h1>
        <h4>
          {" "}
          First Published: {post.date.toString()}, Last Updated:{" "}
          {post.lastUpdate.toString()}
        </h4>
        <blockquote> {post.description.toString()}</blockquote>
        <text>{"\n"}</text>
      </article>
      <article className="prose prose-sm prose-rosestone max-w-full dark:prose-invert sm:prose-base lg:prose-lg xl:prose-xl">
        <CustomMDX source={sanitisedHTML} />
      </article>
    </div>
  );
}
