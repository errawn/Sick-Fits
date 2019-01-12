import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import Router from 'next/router'

import Form from './styles/Form'
import formatMoney from '../lib/formatMoney'
import Error from './ErrorMessage'

const CREATE_ITEM_MUTATION = gql`
    mutation CREATE_ITEM_MUTATION(
        $title: String!
        $description: String!
        $price: Int!
        $image: String
        $largeImage: String
    ) {
        createItem( # createItem() is in backend/src/resolver/Mutation.js
            title: $title
            description: $description
            price: $price
            image: $image
            largeImage: $largeImage
        ) {
            id
        }
    }
`

class CreateItem extends Component {
    state = {
        title: 'Samsung s9 ',
        description: 'Phone from Samsung',
        image: 'samsung-s9.jpg',
        largeImage: 'large-samsung-s9.jpg',
        price: 9999
    }

    handleChange = e => {
        const { name, type, value } = e.target
        const val = type === 'number' ? parseFloat(value) : value
        
        this.setState({ [name] : value })
    }

    render() {
        return (
        <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
        {(createItem, { loading, error }) => (
            <Form onSubmit={async e => {
                // stops the form from submitting
                e.preventDefault()
                // call the mutation
                const res = await createItem()
                // programatically redirect to the newly created item
                Router.push({
                    pathname: '/item',
                    query: { id: res.data.createItem.id }
                })
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
                            value={this.state.title}
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
                            value={this.state.price}
                            onChange={this.handleChange}
                        />
                    </label>
                    <label htmlFor="description">
                        Description
                        <textarea 
                            id="description" 
                            name="description" 
                            required
                            value={this.state.description}
                            onChange={this.handleChange}
                        />
                    </label>
                    <button type="submit">Submit</button>
                </fieldset>
            </Form>

        )}
        </Mutation>
        )
    }
}

export default CreateItem