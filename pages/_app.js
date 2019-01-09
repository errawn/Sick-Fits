import App, { Container } from 'next/app'

import Layout from '../components/Layout'

class MyApp extends App {
    render() {
        const { Component } = this.props
        
        return (
            <Container>
                <Layout>
                    <h1>Im on every page</h1>
                    <Component />
                </Layout>
            </Container>
        )
    }
}

export default MyApp