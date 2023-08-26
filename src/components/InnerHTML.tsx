import React from "react";

type PolymorphicAsProp<E extends React.ElementType> = {
    as?: E;
};

type PolymorphicProps<E extends React.ElementType> = React.PropsWithChildren<
    React.ComponentPropsWithoutRef<E>
    & PolymorphicAsProp<E>
>;

const defaultElement = "div";

type InnerHTMLProps<E extends React.ElementType = typeof defaultElement> = PolymorphicProps<E> & {
    children: string | string[];
    className?: string;
};

export default function InnerHTML<E extends React.ElementType = typeof defaultElement>(props: InnerHTMLProps<E>) {
    const {
        as,
        children,
        ...restProps
    } = props;
    const Component = as ?? defaultElement;

    return (
        <Component {...restProps} dangerouslySetInnerHTML={{__html: children}}/>
    );
}