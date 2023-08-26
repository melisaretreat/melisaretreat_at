import "./src/styles/global.css"
import {PluginOptions, ShouldUpdateScrollArgs, WrapPageElementBrowserArgs} from "gatsby";
import PageLayout from "./src/components/PageLayout";
import React from 'react';

export function wrapPageElement(
    args: WrapPageElementBrowserArgs,
    options: PluginOptions
) {
    // props provide same data to Layout as Page element will get
    // including location, data, etc - you don't need to pass it
    return <PageLayout {...args.props}>{args.element}</PageLayout>
}

export const shouldUpdateScroll = ({ routerProps: { location } }:ShouldUpdateScrollArgs) => {
  // Return false to disable scroll restoration
  return false;
};