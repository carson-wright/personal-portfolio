import * as React from "react"
import { Heading } from "theme-ui"
import { Flex } from "@theme-ui/components"
import { useStaticQuery, graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Layout from "@lekoarts/gatsby-theme-minimal-blog/src/components/layout"
import Listing from "@lekoarts/gatsby-theme-minimal-blog/src/components/listing"
import SEO from "@lekoarts/gatsby-theme-minimal-blog/src/components/seo"

interface ProjectProps {
	posts: {
		slug: string
		title: string
		date: string
		excerpt: string
		description: string
		timeToRead?: number
		tags: {
			name: string
			slug: string
		}[]
	}[]
	pageContext: {
		isCreatedByStatefulCreatePages: boolean
		slug: string
		name: string
		[key: string]: any
	}
}

interface IProjectQuery {
	allMdx: {
		nodes: Array<{
			frontmatter: {
				slug: string
			}
			id: string
			body: any
		}>
	}
}

/**
 * Project is a functional React component placed in tag.tsx
 * to shadow the original Tag template page provided by the template this
 * project is based on.
 *
 * @param projectProps The posts associated with the project and the context surrounding the page's creation.
 * @returns A renderable React component.
 */
export default function Project({ posts, pageContext }: ProjectProps) {
	const queryResult: IProjectQuery = useStaticQuery(graphql`query ProjectsPage {
		allMdx {
		  nodes {
			frontmatter {
			  slug
			}
			body
		  }
		}
	  }`)

	const filtered = queryResult.allMdx.nodes.filter((value) => (value.frontmatter.slug === `/projects/${pageContext.slug}`))

	return (
		<Layout>
			<SEO title={`Project: ${pageContext.name}`} />
			<Flex sx={{ alignItems: `center`, justifyContent: `space-between`, flexFlow: `wrap` }}>
				<Heading as="h1" variant="styles.h1" sx={{ marginY: 2 }}>
					{pageContext.name}
				</Heading>
			</Flex>

			{/* Only show the mdx body if we successfully found it. */}
			{filtered.length === 0 ? null : <MDXRenderer>{filtered[0].body}</MDXRenderer>}

			<hr />

			<Listing posts={posts} sx={{ mt: [4, 5] }} />
		</Layout>
	)
}
