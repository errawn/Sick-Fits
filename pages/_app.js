import App, { Container } from 'next/app'
import { ApolloProvider } from 'react-apollo'
import withData from '../lib/withData'

import Layout from '../components/Layout'

class MyApp extends App {
    // Handle Pagination
    static async getInitialProps({ Component, ctx }) {
        let pageProps = {}
        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx)
        }
        // this exposes query to the user
        pageProps.query = ctx.query
        return { pageProps }
    }

    render() {
        const { Component, apollo, pageProps } = this.props
        
        return (
            <Container>
                <ApolloProvider client={apollo}>
                    <Layout>
                        <Component />
                    </Layout>
                </ApolloProvider>
            </Container>
        )
    }
}

export default withData(MyApp) // withData HOC make the appolo-client accessible to this.props