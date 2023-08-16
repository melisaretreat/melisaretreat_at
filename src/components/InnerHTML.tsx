import React from "react";

export default function InnerHTML({children}: { children: string|string[] }): React.ReactNode {
    return (
        <div className='text-justify' dangerouslySetInnerHTML={{__html: children}}/>
    )
}
