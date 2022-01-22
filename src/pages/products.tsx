/** @jsx jsx */
import { jsx, Heading, Link as TLink } from "theme-ui"
import { Link, useStaticQuery, graphql } from "gatsby"
import { Flex } from "@theme-ui/components"
import Layout from "@lekoarts/gatsby-theme-minimal-blog/src/components/layout"
import SEO from "@lekoarts/gatsby-theme-minimal-blog/src/components/seo"

interface IProductsQuery {
	allMdx: {
		nodes: Array<{
			frontmatter: {
				slug: string
				title: string
				date: string
			}
			id: string
		}>
	}
}

export default function Products() {
	const queryResult: IProductsQuery = useStaticQuery(graphql`query Products {
	allMdx(sort: {fields: frontmatter___date, order: DESC}, filter: {frontmatter: {date: {ne: null}}}) {
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

	const products = queryResult.allMdx.nodes.filter(v => v.frontmatter.slug.startsWith("/products/")).map((v) => {
		return <Listing key={v.id} title={v.frontmatter.title} date={v.frontmatter.date} slug={v.frontmatter.slug} />
	})

	return (
		<Layout>
			<SEO title="Products" />
			<Flex sx={{ alignItems: `center`, justifyContent: `space-between`, flexFlow: `wrap` }}>
				<Heading as="h1" variant="styles.h1" sx={{ marginY: 2 }}>
					Products
				</Heading>
			</Flex>

			{products}
		</Layout>
	)
}

interface IListingProps {
	title: string
	date: string
	slug: string
}

function Listing(props: IListingProps) {
	return <div>
		<TLink as={Link} to={props.slug} sx={{ fontSize: [1, 2, 3], color: `text` }}>{props.title}</TLink>

		<p sx={{ color: `secondary`, mt: 1, a: { color: `secondary` }, fontSize: [1, 1, 2] }}>
			<time>{props.date}</time>
		</p>
	</div>
}
