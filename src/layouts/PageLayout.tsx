import React from "react";
import AutoMenu from "../components/AutoMenu";
import {graphql, useStaticQuery} from "gatsby";
import Footer from "../components/Footer";

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
        }`)
    return <div className='bg-neutral-100'>
        <div className='prose prose-neutral flex flex-col max-w-5xl bg-white m-auto min-h-screen p-4'>
            <header className=' flex flex-col'>
                <h1 className='text-center'> {data.site.siteMetadata.title}</h1>
                <div className='navbar'><AutoMenu
                    name='main'
                    path={props.path}
                    className='navbar-center menu lg:menu-horizontal group space-x-2 prose-invert'
                    itemClass='bg-black text-white hover:text-white font-bold prose-invert'
                    children={({path, title, key}) => <li
                        key={key}
                        className={'bg-black text-white font-bold'}>
                        <a className={'prose-invert hover:text-white hover:bg-neutral-700 ' + (path === props.path ? ' underline' : ' no-underline')} href={path}>{title}</a>
                    </li>}
                />
                </div>
            </header>
            <main>{props.children}</main>
            <span className='border-t-2 border-t-black w-2/3 mx-auto'/>
            <footer className='text-center my-0 text-sm block mx-auto bottom-0'>
                <Footer/>
            </footer>
        </div>
    </div>;
}

export function Head() {
    return <>
        <html lang='de'/>
        <body className='min-h-screen'/>
    </>
}