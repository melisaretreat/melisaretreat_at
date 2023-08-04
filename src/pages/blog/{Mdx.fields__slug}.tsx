import React from "react";
import {graphql} from "gatsby";

export default function Layout({children}:{children:React.ReactNode}) {
  return <>
      <main>{children}</main>
  </>;
}

export const pageQuery = graphql`
    query BlogPostsQuery{
        mdx{
            frontmatter{
                title
                
            }
            body
        }
    }
`