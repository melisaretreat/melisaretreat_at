import {graphql, PageProps} from "gatsby";
import React from "react";
import InnerHTML from "../../components/InnerHTML";
import Head from "../../components/head";

export default function (props: PageProps): React.ReactNode {
    const markdown = (props.data as Queries.Query).blogEntry!.parent as Queries.MarkdownRemark;
    return <article>
        <h2 className='text-center w-full text-2xl/loose underline'>{markdown.frontmatter!.title}</h2>
        <InnerHTML className='prose prose-neutral min-w-full'>{markdown.html!}</InnerHTML>
    </article>;
}

export const pageQuery = graphql`query blogEntry($id: String!) {
    blogEntry(id: {eq: $id}) {
        parent {
            ... on MarkdownRemark {
                html
                frontmatter {
                    title
                    date
                }
            }
        }
    }
}`;

export {Head};
