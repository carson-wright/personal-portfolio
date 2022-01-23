import * as React from "react"
import { Heading } from "theme-ui"
import { Flex } from "@theme-ui/components"
import Layout from "@lekoarts/gatsby-theme-minimal-blog/src/components/layout"
import SEO from "@lekoarts/gatsby-theme-minimal-blog/src/components/seo"
import { graphql, useStaticQuery } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"

interface IProductPageProps {
	pageContext: {
		id: string
	}
	data: IProductPageQuery
}

interface IProductPageQuery {
	allMdx: {
		nodes: Array<{
			frontmatter: {
				title: string
			}
			id: string
			body: any
		}>
	}
}

export default function ProductPage(props: IProductPageProps, data: any) {
	return <Layout>
		<SEO title={props.data.allMdx.nodes[0].frontmatter.title} />
		<Flex sx={{ alignItems: `center`, justifyContent: `space-between`, flexFlow: `wrap` }}>
			<Heading as="h1" variant="styles.h1" sx={{ marginY: 2 }}>
				{props.data.allMdx.nodes[0].frontmatter.title}
			</Heading>
		</Flex>

		<MDXRenderer>
			{props.data.allMdx.nodes[0].body}
		</MDXRenderer>

	</Layout>
}

export const query = graphql`
query ProductPageContent($id: String) {
	allMdx(filter: {id: {eq: $id}}) {
		nodes {
			body
			frontmatter {
				title
			}
		}
	}
}
`
