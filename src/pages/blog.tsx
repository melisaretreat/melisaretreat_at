import {graphql, Link, PageProps} from "gatsby";
import React from "react";
import InnerHTML from "../components/InnerHTML";


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

export default function BlogPage(props: PageProps): React.ReactNode {
    const data = props.data as Queries.Query;
    const blogEntries = data.allBlogEntry.nodes.map(toBlogExcerpt);
    const content = data.markdownRemark!.html!;

    return <div>
        <article>
            <InnerHTML>{content}</InnerHTML>
        </article>
        {blogEntries.map((entry, index) => <article key={index}>
            <h1><Link to={entry.path}>{entry.title}</Link></h1>
            <p>{entry.excerpt}</p>
        </article>)}
    </div>
}

export const pageQuery = graphql`query blogPosts {
    allBlogEntry {
        nodes {
            sitePagePath
            internal {
                contentFilePath
            }
            parent {
                ... on MarkdownRemark{
                    excerpt
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
}`;
