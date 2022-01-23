/** @jsx jsx */
import { jsx, Heading, Link as TLink } from "theme-ui"
import { Link, useStaticQuery, graphql } from "gatsby"
import { Flex } from "@theme-ui/components"
import Layout from "@lekoarts/gatsby-theme-minimal-blog/src/components/layout"
import SEO from "@lekoarts/gatsby-theme-minimal-blog/src/components/seo"

import "./store.css"

interface IProductsQuery {
	allMdx: {
		nodes: Array<{
			frontmatter: {
				slug: string
				title: string
				status: string
			}
			id: string
		}>
	}
}

export default function Store() {
	const queryResult: IProductsQuery = useStaticQuery(graphql`query Products {
	allMdx {
		nodes {
			frontmatter {
				slug
				title
				date(formatString: "DD.MM.YYYY")
			}
			id
		}
	}
}`)

	const products = queryResult.allMdx.nodes.filter(v => v.frontmatter.slug.startsWith("/store/")).map((v) => {
		return <Listing key={v.id} title={v.frontmatter.title} slug={v.frontmatter.slug} />
	})

	return (
		<Layout>
			<SEO title="Store" />
			<Flex sx={{ alignItems: `center`, justifyContent: `space-between`, flexFlow: `wrap` }}>
				<Heading as="h1" variant="styles.h1" sx={{ marginY: 2 }}>
					Store
				</Heading>
			</Flex>

			<Grid>
				{products}
			</Grid>
		</Layout>
	)
}

interface IListingProps {
	title: string
	slug: string
}

function Listing(props: IListingProps) {
	return <div style={{ "textAlign": "center", "margin": "0.5rem" }}>
		<TLink as={Link} to={props.slug} sx={{ fontSize: [1, 2, 3], color: `text` }}>{props.title}</TLink>
	</div>
}

function Grid(props: { children: React.ReactNode }) {
	return <div className="productGrid">
		{props.children}
	</div>
}
