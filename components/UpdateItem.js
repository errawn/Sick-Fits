import React, { Component } from 'react'
import { Mutation, Query } from 'react-apollo'
import gql from 'graphql-tag'
import Router from 'next/router'

import Form from './styles/Form'
import formatMoney from '../lib/formatMoney'
import Error from './ErrorMessage'

const SINGLE_ITEM_QUERY = gql`
    query SINGLE_ITEM_QUERY($id: ID!) {
        item(where: { id: $id }) {
            id
            title
            description
            price
        }
    }
`

const UPDATE_ITEM_MUTATION = gql`
    mutation UPDATE_ITEM_MUTATION(
        $title: String!
        $description: String!
        $price: Int!
        $image: String
        $largeImage: String
    ) {
        updateItem( # createItem() is in backend/src/resolver/Mutation.js
            title: $title
            description: $description
            price: $price
        ) {
            id
        }
    }
`

class UpdateItem extends Component {
    state = {
    }

    handleChange = e => {
        const { name, type, value } = e.target
        const val = type === 'number' ? parseFloat(value) : value
        
        this.setState({ [name] : value })
    }

    render() {
        return (
        <Query query={SINGLE_ITEM_QUERY} variables={{ id: this.props.id }}>
        {({ loading, error, data }) => {
            console.log(data)
            if (loading) return <p>Loading...</p>
            return (
                <Mutation mutation={UPDATE_ITEM_MUTATION} variables={this.state}>
                {(createItem, { loading, error }) => (
                    <Form onSubmit={async e => {
                        e.preventDefault()
                        
                        if (this.state.image) { // mutate ONLY if image is uploaded already
                            // call the mutation
                            const res = await createItem()
                            // programatically redirect to the newly created item
                            Router.push({
                                pathname: '/item',
                                query: { id: res.data.createItem.id }
                            })
                        }
                    }}>
                        <Error error={error}/>
                        <fieldset disabled={loading} aria-busy={loading}>
                            <label htmlFor="title">
                                Title
                                <input 
                                    type="text" 
                                    id="title" 
                                    name="title" 
                                    placeholder="Title" 
                                    required
                                    // using defaultValue does not store the fetched data into state directly
                                    // but, after onChange is fired.
                                    defaultValue={data.item.title}
                                    onChange={this.handleChange}
                                />
                            </label>
                            <label htmlFor="price">
                                Price
                                <input 
                                    type="number" 
                                    id="price" 
                                    name="price" 
                                    required
                                    defaultValue={data.item.price}
                                    onChange={this.handleChange}
                                />
                            </label>
                            <label htmlFor="description">
                                Description
                                <textarea 
                                    id="description" 
                                    name="description" 
                                    required
                                    defaultValue={data.item.description}
                                    onChange={this.handleChange}
                                />
                            </label>
                            <button type="submit" disabled={loading || this.state.uploadFileTouched}>Submit</button>
                        </fieldset>
                    </Form>
                )}
                </Mutation>
            )
        }}
        </Query>
        )
    }
}

export default UpdateItem