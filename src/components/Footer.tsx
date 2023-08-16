import React from "react";
import {IconBrandFacebook} from "@tabler/icons-react";

export default function Footer(): React.ReactNode {
    return <>
        <a href='https://www.facebook.com/melisaretreat/'><IconBrandFacebook stroke='1' className='w-8 h-8 mx-auto my-5 py-0'/></a>
        © 2020-2023 Isabela Binder<br/>
        Impressum: <br/>
        Isabella Binder<br/>
        Wienerstraße 12/2<br/>
        2120 Wolkersdorf
    </>
}