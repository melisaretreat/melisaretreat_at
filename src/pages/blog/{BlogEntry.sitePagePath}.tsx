import {graphql, PageProps} from "gatsby";
import React from "react";
import InnerHTML from "../../components/InnerHTML";

export default function (props: PageProps): React.ReactNode {
    const markdown = (props.data as Queries.Query).blogEntry!.parent as Queries.MarkdownRemark;
    return <article>
        <h2 className='text-center w-full'>{markdown.frontmatter!.title}</h2>
        <InnerHTML>{markdown.html!}</InnerHTML>
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
