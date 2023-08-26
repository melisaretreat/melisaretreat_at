import {graphql, Link, useStaticQuery} from "gatsby";
import React from "react";
import InnerHTML from "./InnerHTML";


interface BlogExcerpt {
    title: string
    path: string
    excerpt?: string
}

function toBlogExcerpt(entry: Queries.BlogEntry): BlogExcerpt {
    const mdx = entry.parent as Queries.MarkdownRemark;
    return {
        title: mdx.frontmatter!.title!,
        path: entry.sitePagePath,
        excerpt: mdx.excerpt || undefined,
    }
}

export default function BlogPage(): React.ReactNode {
    const data = useStaticQuery(graphql`query blogPosts {
    allBlogEntry {
        nodes {
            id
            sitePagePath
            internal {
                contentFilePath
            }
            parent {
                ... on MarkdownRemark{
                    excerpt(pruneLength: 350)
                    frontmatter{
                        title
                        date
                    }
                }
                __typename

            }
        }
    }
    markdownRemark(frontmatter: {title: {eq: "Blog"}}) {
        frontmatter {
            title
        }
        html
    }
    }`) as Queries.Query;
    const blogEntries = data.allBlogEntry.nodes.map(toBlogExcerpt);
    const content = data.markdownRemark!.html!;

    return <div>
        <InnerHTML as='article' className='prose prose-neutral'>{content}</InnerHTML>
        <main>
            {blogEntries.map((entry) => <div key={entry.path}>
                <h2 className='text-2xl/loose underline'><Link to={entry.path} replace={true}>{entry.title}</Link></h2>
                <article className='prose prose-neutral max-w-full'>{entry.excerpt}</article>
            </div>)}
        </main>
    </div>
}
