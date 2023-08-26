import React from "react";
import {graphql, Link, useStaticQuery} from "gatsby";
import AutoMenu from "./AutoMenu";
import Footer from "./Footer";
import {IconMenu2} from '@tabler/icons-react';
import Head from './head';

export {Head};

export interface PageLayoutProps {
    children: React.ReactElement<any, string | React.JSXElementConstructor<any>>
    path: string
}

export default function PageLayout(props: PageLayoutProps): React.ReactNode {
    const data = useStaticQuery(graphql`
        query site{
            site {
                siteMetadata{
                    title
                }
            }
        }`);

    return <div className='flex flex-col max-w-5xl bg-neutral-50 dark:bg-neutral m-auto min-h-screen p-4 relative'>
        <header className='navbar flex flex-row sm:flex-col w-full p-0 min-h-0'>
            <div className="flex-1 flex justify-center p-0 navbar-center">
                <h1 className='text-4xl'>{data.site.siteMetadata.title}</h1>
            </div>
            <AutoMenu
                name='main'
                path={props.path}
                className='navbar-center menu menu-lg menu-horizontal hidden sm:flex'
                children={({path, title, key}) => <li
                    key={key}
                    className='px-3 py-1 my-1 font-bold'>
                    <Link className={(path === props.path ? ' underline' : ' no-underline')} to={path}>{title}</Link>
                </li>}
            />
            <div className="dropdown dropdown-end sm:hidden sm:aria-hidden:">
                <label tabIndex={0} className="btn btn-ghost p-0"><IconMenu2/></label>
                <AutoMenu
                    tabIndex={0}
                    className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-36"
                    name='main'
                    path={props.path}
                    children={({path, title, key}) => <li
                        key={key}
                        className='font-bold'>
                        <Link className={(path === props.path ? ' underline' : ' no-underline')} to={path}>{title}</Link>
                    </li>}
                />
            </div>
        </header>
        <main className='w-full flex-1'>{props.children}</main>
        <Footer/>
    </div>;
}

