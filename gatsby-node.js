const path = require(`path`);

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const productPageTemplate = path.resolve(`src/templates/product-page.tsx`);

  const result = await graphql(`
    query ProductPages {
      allMdx {
        nodes {
          frontmatter {
            slug
          }
          id
        }
      }
    }
  `);

  result.data.allMdx.nodes.forEach((node) => {
    // Filter out non-store mdx files
    if (!node.frontmatter.slug.startsWith("/store/")) return;

    createPage({
      path: `${node.frontmatter.slug}`,
      component: productPageTemplate,
      context: {
        id: node.id,
      },
    });
  });
};
