import { APP_HEADER } from "configs"
import Document, { DocumentContext, Head, Html, Main, NextScript } from "next/document"

class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx)

        return { ...initialProps }
    }

    render() {
        return (
            <Html lang={APP_HEADER.LOCALE}>
                <Head>
                    <title>Custom Your Face</title>

                    <meta charSet={"utf-8"} />

                    <meta content={"unsafe-url"} name={"referrer"} />

                    <meta content={"360"} httpEquiv={"refresh"} />

                    <meta
                        content={
                            "width=device-width, initial-scale=1, max-scale=1, user-scalable=0, shrink-to-fit=no"
                        }
                        name={"viewport"}
                    />

                    <meta content={"width=device-width"} name={"viewport"} />

                    <meta content={"E-commerce with NextJS"} name={"description"} />

                    <meta content="width=device-width, initial-scale=1" name="viewport" />

                    <link
                        href="/static/favicons/apple-touch-icon.png"
                        rel="apple-touch-icon"
                        sizes="180x180"
                    />

                    <link
                        href="/static/favicons/favicon-32x32.png"
                        rel="icon"
                        sizes="32x32"
                        type="image/png"
                    />

                    <link
                        href="/static/favicons/favicon-16x16.png"
                        rel="icon"
                        sizes="16x16"
                        type="image/png"
                    />

                    {/* <link rel="manifest" href="/manifest.webmanifest" /> */}

                    <link color="#ffffff" href="/safari-pinned-tab.svg" rel="mask-icon" />

                    <meta content="#ffffff" name="msapplication-TileColor" />

                    <meta content="#ffffff" name="theme-color" />
                </Head>

                <body>
                    <Main />

                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument
