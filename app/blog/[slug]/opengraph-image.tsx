import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Image metadata
export let alt = "JCHU634 blog post";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Load blog post metadata to get title
  const currentPostFileName = slug.replace(/\.tsx$/, "");
  let blogTitle = "JCHU634 Blog";
  let blogDescription = "";

  try {
    const blogModule = await import(`@/blogposts/${currentPostFileName}`);
    blogTitle = blogModule.metadata?.title || "JCHU634 Blog";
    blogDescription = blogModule.metadata?.description || "";
  } catch (e) {
    console.error(`Error importing metadata for ${currentPostFileName}:`, e);
  }

  // Load font manually from node_modules or your /public/fonts directory
  const intelOneMono = await readFile(
    join(process.cwd(), "public/og-graph-fonts/IntelOneMono-Regular.ttf"),
  );
  const intelOneMonoBold = await readFile(
    join(process.cwd(), "public/og-graph-fonts/IntelOneMono-Regular.ttf"),
  );
  const robotoSlab = await readFile(
    join(process.cwd(), "public/og-graph-fonts/RobotoSlab-SemiBold.ttf"),
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          backgroundColor: "#0f172b",
        }}
      >
        <div tw="flex flex-col pl-8 text-white">
          <div style={{ fontSize: 80, fontFamily: "Roboto Slab" }}>
            JCHU634's Blog
          </div>
          <div style={{ fontSize: 60, fontFamily: "Intel One Mono Semi Bold" }}>
            {blogTitle}
          </div>
          <blockquote
            style={{
              borderLeft: "8px solid #64748b",
              marginTop: "20px",

              color: "#cbd5e1",
              marginLeft: "4px",
            }}
          >
            <div
              className="ml-10 pl-8"
              style={{
                fontSize: 40,
                fontFamily: "Intel One Mono",
                marginLeft: "16px",

                fontStyle: "italic",
              }}
            >
              {blogDescription}
            </div>
          </blockquote>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Intel One Mono",
          data: intelOneMono,
          style: "normal",
          weight: 400,
        },
        {
          name: "Intel One Mono Semi Bold",
          data: intelOneMonoBold,
          style: "normal",
          weight: 400,
        },
        {
          name: "Roboto Slab",
          data: robotoSlab,
          style: "normal",
          weight: 400,
        },
      ],
    },
  );
}
