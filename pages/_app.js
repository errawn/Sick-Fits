import App, { Container } from 'next/app'
import { ApolloProvider } from 'react-apollo'
import withData from '../lib/withData'

import Layout from '../components/Layout'

class MyApp extends App {
    render() {
        const { Component, apollo } = this.props
        
        return (
            <Container>
                <ApolloProvider client={apollo}>
                    <Layout>
                        <h1>Im on every page</h1>
                        <Component />
                    </Layout>
                </ApolloProvider>
            </Container>
        )
    }
}

export default withData(MyApp) // withData HOC make the appolo-client accessible to this.props