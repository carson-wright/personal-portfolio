/** @jsx jsx */
import { jsx, Heading } from "theme-ui"
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

	console.log(queryResult)

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

			{/* <div sx={{ p: { fontSize: [1, 2, 3] } }} >
				<p>Project updates are released every Sunday @5:00 PM Pacific Time</p>
			</div> */}

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
		<Link to={props.slug}><h2>{props.title}</h2></Link>
		<h4>{props.date}</h4>
	</div>
}
