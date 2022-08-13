import "styles/base.css"
import "styles/global.css"
import "styles/reset.css"
import "styles/variables.css"
import "styles/typography.css"

import type { AppProps } from 'next/app'
import Layout from "layout"

function MyApp({ Component, pageProps }: AppProps) {
    const { ...props } = pageProps

    return (
        <Layout>
            <Component {...props} />
        </Layout>
    )
}

export default MyApp
