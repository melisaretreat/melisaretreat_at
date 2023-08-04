import {CreateNodeArgs, CreateSchemaCustomizationArgs} from "gatsby";

export function onCreateNode({node, actions, reporter}: CreateNodeArgs) {
    if (node.internal.type === `Mdx`) {
        actions.createNodeField({
            node,
            name: `slug`,
            value: `slug-value`
        })
    }
}

export function createSchemaCustomization({actions, schema}:CreateSchemaCustomizationArgs) {
    actions.createTypes([
        schema.buildObjectType({
            name: "MdxFields",
            fields: {
                slug: 'String!'
            },
        }),
    ])
}