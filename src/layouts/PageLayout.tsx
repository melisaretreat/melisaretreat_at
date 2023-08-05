import React from "react";
import AutoMenu from "../components/AutoMenu";

export default function PageLayout(props: { children: React.ReactNode | React.ReactNode[] }): React.ReactNode {
    return <>
        <header><AutoMenu name={'main'}/></header>
        <main>{props.children}</main>
    </>;
}
