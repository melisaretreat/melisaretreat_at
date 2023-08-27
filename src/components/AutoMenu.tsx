import React from "react";
import {graphql, useStaticQuery} from "gatsby";

interface MenuItem {
    title: string
    path: string
    key: React.Key
}

export interface AutoMenuProps extends React.ComponentPropsWithoutRef<React.ElementType> {
    name: string
    path: string
    children: (item: MenuItem) => React.ReactNode
}

export default function AutoMenu(props: AutoMenuProps): React.ReactNode {
    const {name, className, children} = props
    const data = useStaticQuery(graphql`query menuItems {
        allMenuEntry(sort:{weight:ASC}) {
            nodes {
                id
                sitePagePath
                name
                weight
                title
            }
        }
    }`);
    const menuItems = data.allMenuEntry.nodes as Queries.MenuEntry[];
    const menuEntries = menuItems.filter((item: Queries.MenuEntry) => item.name === name);
    menuEntries.sort((a, b) => a.weight - b.weight);
    return <ul {...props}>
        {menuEntries.map((item, key) => children({title: item.title, path: item.sitePagePath, key}))}
    </ul>
}
