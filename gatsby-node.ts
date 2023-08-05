import {CreateNodeArgs, CreatePageArgs, CreateSchemaCustomizationArgs} from "gatsby";
import SitePage = Queries.SitePage;
import {randomUUID} from "crypto";
import {getNode} from "gatsby/dist/datastore";

let nodeIndex = 0;

function onNodeMsx({node, actions, reporter}: CreateNodeArgs) {
    reporter.log(`onNodeMsx ${JSON.stringify(node, null, 2)}`)

    /*
        actions.createNodeField({
            node,
            name: `slug`,
            value: `slug-${nodeIndex++}`
        })
    */
}

function onNodeSitePage(args: CreatePageArgs) {
    const page = args.page as SitePage & { context: { id?: string } };
    args.reporter.log(`onNodeSitePage ${JSON.stringify(page, null, 2)}`)
    if (page.path.startsWith('/blog/') && page.context.id) {
        const nodeId = page.context.id;


        const node = getNode(nodeId)!;
        let blogEntry = {
            id: randomUUID(),
            internal: {
                type: 'BlogEntry',
                contentDigest: node.internal.contentDigest!,
            },
            parent: nodeId,
            sitePagePath: page.path,
        };
        args.reporter.log(`createNode ${JSON.stringify(blogEntry, null, 2)}`)
        args.actions.createNode(blogEntry);
        args.actions.createParentChildLink({parent: node, child: blogEntry});
    }
}

export function onCreateNode(args: CreateNodeArgs) {
    switch (args.node.internal.type) {
        case 'Mdx':
            onNodeMsx(args);
            break
    }
}

export function onCreatePage(args: CreatePageArgs) {
    onNodeSitePage(args);

}

export function createSchemaCustomization({actions, schema}: CreateSchemaCustomizationArgs) {
    actions.createTypes([
        schema.buildObjectType({
            name: "MdxFields",
            fields: {
                slug: 'String!'
            },
        }),
        schema.buildObjectType({
            name: "BlogEntry",
            fields: {
                sitePagePath: 'String!',
            },
            interfaces: ['Node']
        }),
        schema.buildObjectType({
            name: 'MenuInfo',
            fields: {
                name: 'String!',
                weight: 'Float!',
            },
        }),
        schema.buildObjectType({
            name: 'MdxFrontmatter',
            fields: {
                menu: '[MenuInfo!]',
            }
        }),
    ]);
}
