/** @jsx jsx */
import { jsx, Heading, Box, Flex } from "theme-ui"
// @ts-ignore
import kebabCase from "lodash.kebabcase"
import { Link } from "gatsby"
import Layout from "@lekoarts/gatsby-theme-minimal-blog/src/components/layout"
import useMinimalBlogConfig from "../hooks/use-minimal-blog-config"
import SEO from "@lekoarts/gatsby-theme-minimal-blog/src/components/seo"
import replaceSlashes from "@lekoarts/gatsby-theme-minimal-blog/src/utils/replaceSlashes"

interface PostsProps {
	list: {
		fieldValue: string
		totalCount: number
	}[]
}

/**
 * Projects is a functional React component placed in tags.tsx
 * to shadow the original Tags page provided by the template this
 * project is based on.
 *
 * @param postsProps The list of project tags
 * @returns A renderable React component.
 */
export default function Projects({ list }: PostsProps) {
	const { tagsPath, basePath } = useMinimalBlogConfig()

	return (
		<Layout>
			<SEO title="Projects" />
			<Heading as="h1" variant="styles.h1">Projects</Heading>

			<Box mt={[4, 5]}>
				{list.map((listItem) => (
					<div>
						<Flex key={listItem.fieldValue} mt={3} mb={0.5} sx={{ alignItems: `center` }}>
							<Link
								sx={(t) => ({ ...t.styles?.a, variant: `links.listItem`, mr: 2 })}
								to={replaceSlashes(`/${basePath}/${tagsPath}/${kebabCase(listItem.fieldValue)}`)}
							>
								{listItem.fieldValue}
							</Link>
						</Flex>
						{<p sx={{ color: `secondary`, mt: 0.5, a: { color: `secondary` }, fontSize: [1, 1, 2] }}>
							No description provided.
						</p>}
					</div>
				))}
			</Box>
		</Layout>
	)
}
