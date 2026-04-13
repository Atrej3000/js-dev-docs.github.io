import type { HTMLAttributes, ReactNode } from "react";

import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

import { slugifyHeadingId } from "@/src/modules/content/frontmatter";
import type { LessonRenderPayload } from "@/src/types/content";

type LessonBodyProps = {
  payload: LessonRenderPayload;
};

function extractText(children: ReactNode): string {
  if (typeof children === "string" || typeof children === "number") {
    return String(children);
  }

  if (Array.isArray(children)) {
    return children.map(extractText).join("");
  }

  if (children && typeof children === "object" && "props" in children) {
    return extractText((children as { props?: { children?: ReactNode } }).props?.children);
  }

  return "";
}

function buildHeading(level: "h2" | "h3" | "h4") {
  return function Heading({
    children,
    ...props
  }: HTMLAttributes<HTMLHeadingElement>) {
    const HeadingTag = level;
    const derivedId = props.id ?? slugifyHeadingId(extractText(children));

    return (
      <HeadingTag id={derivedId} {...props}>
        {children}
      </HeadingTag>
    );
  };
}

const mdxComponents = {
  h2: buildHeading("h2"),
  h3: buildHeading("h3"),
  h4: buildHeading("h4"),
};

export async function LessonBody({ payload }: LessonBodyProps) {
  if (payload.format === "html") {
    return (
      <article
        data-lesson-article
        className="content-card lesson-html rounded-[2rem] p-6 lg:p-8"
        dangerouslySetInnerHTML={{ __html: payload.html }}
      />
    );
  }

  return (
    <article data-lesson-article className="content-card lesson-html rounded-[2rem] p-6 lg:p-8">
      <MDXRemote
        source={payload.source}
        components={mdxComponents}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
          },
        }}
      />
    </article>
  );
}
