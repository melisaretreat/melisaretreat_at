import {graphql, PageProps, useStaticQuery} from "gatsby";
import React from "react";
import InnerHTML from "../components/InnerHTML";

export default function IndexPage(props: PageProps): React.ReactNode {
    return <InnerHTML>{(props.data as Queries.markdownRemarkQuery).markdownRemark!.html!}</InnerHTML>;
}
export const pageQuery = graphql`query markdownRemark {
    markdownRemark(frontmatter: {title: {eq: "Start"}}) {
        frontmatter {
            title
        }
        html
    }
}`;
