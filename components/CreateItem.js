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
        image: null,
        largeImage: null,
        price: 9999,
        uploadFileTouched: false
    }

    handleChange = e => {
        const { name, type, value } = e.target
        const val = type === 'number' ? parseFloat(value) : value
        
        this.setState({ [name] : value })
    }

    uploadFile = async e => {
        this.setState({uploadFileTouched: true})
        console.log('Uploading File...')

        const files = e.target.files // get files from input type file
        const data = new FormData() // initialize new FormData
        data.append('file', files[0]) // attach the file from input type file to FormData
        data.append('upload_preset', 'sickfits') // cloudinary upload_preset
        // upload to cloudinary server
        const res = await fetch('https://api.cloudinary.com/v1_1/errawnlalata/image/upload/', {
            method: 'POST',
            body: data
        })
        // parsed json. Used for setting the image state
        const file = await res.json()
        console.log(file)
        // setting the image state
        this.setState({
            image: file.secure_url,
            largeImage: file.eager[0].secure_url,
            uploadFileTouched: false
        })
    }

    render() {
        return (
        <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
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
                    <label htmlFor="file">
                        Image
                        <input 
                            type="file" 
                            id="file" 
                            name="file" 
                            required
                            placeholder="Upload an Image"
                            onChange={this.uploadFile}
                        />
                    </label>
                    {this.state.uploadFileTouched && <p>Image is still uploading...</p>}
                    <button type="submit" disabled={loading || this.state.uploadFileTouched}>Submit</button>
                </fieldset>
            </Form>

        )}
        </Mutation>
        )
    }
}

export default CreateItem