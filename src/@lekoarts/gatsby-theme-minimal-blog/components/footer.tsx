/** @jsx jsx */
import { jsx, Link } from "theme-ui"
import useSiteMetadata from "../hooks/use-site-metadata"

const Footer = () => {
  const { siteTitle } = useSiteMetadata()

  return (
    <footer
      sx={{
        boxSizing: `border-box`,
        display: `flex`,
        justifyContent: `space-between`,
        mt: [6],
        color: `secondary`,
        a: {
          variant: `links.secondary`,
        },
        flexDirection: [`column`, `column`, `row`],
        variant: `dividers.top`,
      }}
    >
      <div>
        &copy; {new Date().getFullYear()} {siteTitle} LLC. All rights reserved.
      </div>
      <div>
        <Link
          aria-label="Link to the site status page"
          href="https://status.carsonwright.me"
          sx={{marginRight:"15px"}}
        >
          Status
        </Link>
        <Link
          aria-label="Link to the site admin page"
          href="https://admin.carsonwright.me"
          sx={{marginRight:"15px"}}
        >
          Admin
        </Link>
        <Link aria-label="Link to the site analytics" href="https://analytics.carsonwright.me">
          Analytics
        </Link>
      </div>
    </footer>
  )
}

export default Footer
