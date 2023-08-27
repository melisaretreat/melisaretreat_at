import React from "react";
import {IconBrandFacebook} from "@tabler/icons-react";

export default function Footer(): React.ReactNode {
    return <footer className='w-full mb-4'>
        <hr className='border-t-2 border-t-neutral-content dark:border-t-neutral-content w-2/3 mx-auto my-5'/>
        <div className='text-center my-0 text-xs  block mx-auto bottom-0'>
            <a href='https://www.facebook.com/melisaretreat/'><IconBrandFacebook stroke='1' className='w-8 h-8 mx-auto my-5 py-0'/></a>
            <div className='my-5 flex flex-col'>
                <span>© 2020-2023 Isabela Binder</span>
                <span>Website & photos © 2020-2023 Rafael Krupinski</span>
                <span>Favicon Image by Freepik</span>
            </div>

            Impressum: <br/>
            Isabella Binder<br/>
            Wienerstraße 12/2<br/>
            2120 Wolkersdorf
        </div>
    </footer>
}