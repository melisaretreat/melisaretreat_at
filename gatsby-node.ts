import {CreateNodeArgs, CreatePageArgs, CreateSchemaCustomizationArgs, NodeInput} from "gatsby";


function slugify(tet: string): string {
    return tet.replace(/\s+/g, '-').toLowerCase();
}

function mkBlogEntryNode(args: CreateNodeArgs): void {
    const {getNode, node, createNodeId, reporter} = args;
    const {createNode, createParentChildLink} = args.actions;

    const fileNode = getNode(node.parent!)! as unknown as Queries.File;
    if (!fileNode.relativePath.startsWith('blog/'))
        return;

    const blogEntry: NodeInput = {
        id: createNodeId(fileNode.relativePath),
        sitePagePath: slugify(`${fileNode.name}`),
        parent: node.id,
        internal: {
            type: 'BlogEntry',
            contentDigest: node.internal.contentDigest,
            contentFilePath: fileNode.relativePath
        },
    }
    createNode(blogEntry);
    createParentChildLink({parent: node, child: blogEntry})
    reporter.success(`mkBlogEntryNode ${fileNode.relativePath} -> BlogEntry ${blogEntry.id}`)
}

function mkMenuEntry(args: CreateNodeArgs) {
    const {getNode, node, createNodeId, reporter} = <CreateNodeArgs & { node: Queries.MarkdownRemark }>args;
    const {createNode, createParentChildLink} = args.actions;

    const fileNode = getNode(node.parent!)! as unknown as Queries.File;

    node.frontmatter?.menu?.forEach(menuEntryInput => {
        const menuEntryInput_ = menuEntryInput!;
        const menuEntry: NodeInput = {
            id: createNodeId(fileNode.relativePath),
            sitePagePath: fileNode.name === 'index' ? '/' : `/${slugify(fileNode.name)}/`,
            parent: node.id,
            name: menuEntryInput_.name,
            weight: menuEntryInput_.weight,
            title: node.frontmatter?.title ?? '',
            internal: {
                type: 'MenuEntry',
                contentDigest: node.internal.contentDigest,
                contentFilePath: fileNode.relativePath
            },
        }
        createNode(menuEntry);
        createParentChildLink({parent: node, child: menuEntry})
        reporter.success(`mkMenuEntryNode ${fileNode.relativePath} -> MenuEntry ${menuEntry.id}`)
    })

    reporter.info(`mkMenuEntryNode ${fileNode.relativePath}`)
}

function onNodeSitePage(args: CreatePageArgs) {
    const {reporter} = args;
    const page = args.page as Queries.SitePage & { context: { id?: string } };
    reporter.info(`onNodeSitePage ${page.path}`)
}

export function onCreateNode(args: CreateNodeArgs) {
    switch (args.node.internal.type) {
        case 'Mdx':
            mkBlogEntryNode(args);
            mkMenuEntry(args);
            break;
        case 'MarkdownRemark':
            mkBlogEntryNode(args);
            mkMenuEntry(args);
            break;
    }
}

export function onCreatePage(args: CreatePageArgs) {
    onNodeSitePage(args);
}

export function createSchemaCustomization({actions, schema}: CreateSchemaCustomizationArgs) {
    actions.createTypes([
        schema.buildObjectType({
            name: "BlogEntry",
            fields: {
                sitePagePath: 'String!',
            },
            interfaces: ['Node']
        }),
        schema.buildObjectType({
            name: 'MenuEntry',
            fields: {
                name: 'String!',
                weight: 'Float!',
                sitePagePath: 'String!',
                title: 'String!',
            },
            interfaces: ['Node']
        }),
    ]);
}
