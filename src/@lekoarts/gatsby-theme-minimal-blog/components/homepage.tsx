/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"
import Layout from "@lekoarts/gatsby-theme-minimal-blog/src/components/layout"
import Title from "@lekoarts/gatsby-theme-minimal-blog/src/components/title"
import Listing from "@lekoarts/gatsby-theme-minimal-blog/src/components/listing"
import List from "@lekoarts/gatsby-theme-minimal-blog/src/components/list"
import useMinimalBlogConfig from "../hooks/use-minimal-blog-config"
import useSiteMetadata from "../hooks/use-site-metadata"
import replaceSlashes from "@lekoarts/gatsby-theme-minimal-blog/src/utils/replaceSlashes"
import { visuallyHidden } from "@lekoarts/gatsby-theme-minimal-blog/src/styles/utils"
// @ts-ignore
import Hero from "../texts/hero"
// @ts-ignore
import Bottom from "../texts/bottom"
// @ts-ignore
import Feature from "../texts/feature"
// @ts-ignore
import Other from "../texts/other"

type PostsProps = {
  posts: {
    slug: string
    title: string
    date: string
    excerpt: string
    description: string
    timeToRead?: number
    tags?: {
      name: string
      slug: string
    }[]
  }[]
  [key: string]: any
}

const Homepage = ({ posts }: PostsProps) => {
  const { basePath, blogPath } = useMinimalBlogConfig()
  const { siteTitle } = useSiteMetadata()

  return (
    <Layout>
      <h1 sx={visuallyHidden}>{siteTitle}</h1>
      <section sx={{ mb: [5, 6, 7], p: { fontSize: [1, 2, 3], mt: 2 }, variant: `section_hero` }}>
        <Hero />
      </section>

      <Title text="Featured Project">
        <Link to={replaceSlashes(`/${basePath}/projects`)}>View All Projects</Link>
      </Title>
      <section sx={{ mb: [5, 6, 7], p: { fontSize: [1, 2, 3], mt: 2 }}}>
      <Feature />
      </ section>
      <Title text="Latest Updates 📣">
        <Link to={replaceSlashes(`/${basePath}/${blogPath}`)}>Read all updates</Link>
      </Title>
      <Listing posts={posts} showTags={false} />
      <List sx={{ variant: `section_bottom` }}>
        <Bottom />
      </List>
    </Layout>
    <noscript>
    <img src="https://example.com/ingress/5d4b63af-16b9-4b75-884f-b081a22c0807/pixel.gif">
    </noscript>
    <script defer src="https://example.com/ingress/5d4b63af-16b9-4b75-884f-b081a22c0807/script.js"></script>
  )
}

export default Homepage
