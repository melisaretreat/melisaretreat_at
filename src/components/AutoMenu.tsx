import React from "react";
import {graphql, useStaticQuery} from "gatsby";

interface MenuEntry {
    title: string
    path: string
    weight: number
}

function filePathToUrl(filePath: string): string {
    const part = filePath.substring(0, filePath.length - 4);
    return part === 'index' ? '/' : `/${part}`;
}

function translate(mdx: Partial<Queries.Mdx>, menu: string): MenuEntry | null {
    const menuInfo = mdx.frontmatter!.menu!.filter(info => info.name === menu)[0];
    if (!menuInfo) return null;
    return {
        title: mdx.frontmatter!.title!,
        weight: menuInfo.weight,
        path: filePathToUrl((mdx.parent! as Queries.File).relativePath),
    }
}

export default function AutoMenu({name}: { name: string }): React.ReactNode {
    const menuItemsResults: Queries.menuItemsQuery = useStaticQuery(graphql`query menuItems {
        allMdx (filter:{frontmatter:{menu:{elemMatch:{ name:{ne: null}}}}}){
            nodes {
                id
                frontmatter {
                    title
                    menu {
                        name
                        weight
                    }
                }
                parent {
                    ... on File {
                        relativePath
                    }
                }
            }
        }
    }`);
    const menuItems = menuItemsResults.allMdx.nodes as Queries.Mdx[];
    const menuEntries = menuItems.map((item: Queries.Mdx) => translate(item, name)).filter((item: MenuEntry | null) => !!item) as MenuEntry[];
    menuEntries.sort((a, b) => a.weight - b.weight)
    return <ol>
        {menuEntries.map(
            (item: MenuEntry) => <li key={item.path}>
                <a href={item.path}>{item.title}</a>
            </li>
        )}

    </ol>
}