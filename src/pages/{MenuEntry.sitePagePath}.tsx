import {graphql, PageProps} from "gatsby";
import React from "react";
import InnerHTML from "../components/InnerHTML";
import BlogPage from "../components/blog";
import Head from "../components/head";

export default function (props: PageProps): React.ReactNode {
    if((props.data as Queries.Query).menuEntry!.sitePagePath==='/blog/')
        return <BlogPage/>

    const markdown = (props.data as Queries.Query).menuEntry!.parent as Queries.MarkdownRemark;
    return <InnerHTML as='article' className='prose prose-neutral min-w-full'>{markdown.html!}</InnerHTML>;
}

export const pageQuery = graphql`query menuEntry($id: String!){
    menuEntry(id: {eq: $id}) {
        sitePagePath
        name
        weight
        parent {
            ... on MarkdownRemark{
                html
                frontmatter {
                    title
                }
            }
        }
    }
}`;

export {Head};
