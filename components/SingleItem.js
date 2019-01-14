import React, { Component } from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import styled from 'styled-components'
import Head from 'next/head'

const SINGLE_ITEM_QUERY = gql`
    query SINGLE_ITEM_QUERY($id: ID!) {
        item(where: { id: $id }) {
            id
            title
            description
            price
            largeImage
        }
    }
`
const SingleItemStyles = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  box-shadow: ${props => props.theme.bs};
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  min-height: 800px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .details {
    margin: 3rem;
    font-size: 2rem;
  }
`

class SingleItem extends Component {
    render() {
        return (
            <Query
                query={SINGLE_ITEM_QUERY}
                variables={{
                    id: this.props.id
                }}
            >
            {({ error, loading, data: { item: { id, title, description, largeImage, price } } }) => {
                if (loading) return <p>Loading...</p>
                if (error) return <p>Error</p>
                return (
                    <SingleItemStyles>
                        <Head>
                            <title>Sick Fits | {title}</title>
                        </Head>
                        <img src={largeImage} alt={title} />
                        <div className="details">
                            <h1>Viewing {title}</h1>
                            <p>{description}</p>
                        </div>
                    </SingleItemStyles>
                )
            }}
            </Query>
        );
    }
}

export default SingleItem