import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { ALL_ITEMS_QUERY } from './Items';

const DELETE_ITEM_MUTATION = gql`
    mutation DELETE_ITEM_MUTATION($id: ID!) {
        deleteItem(id: $id) {
            id
        }
    }
`

class DeleteItem extends Component {
    // 2 options after deleting items:
    // 1. refetch the items via query (will create an http call over server)
    // 2. manually update the cache to remove the deleted item

    update = (cache, payload) => { // payload is the data came back from the item that got deleted
        // manually update the cache on the client
        // read the cache for the items
        const data = cache.readQuery({ query: ALL_ITEMS_QUERY })
        console.log(data, payload)
        // filter the deleted item out of the page
        data.items = data.items.filter(item => item.id !== payload.data.deleteItem.id)
        // put the items back
        cache.writeQuery({ query: ALL_ITEMS_QUERY, data })
    }

    render() {
        return (
            <Mutation
                mutation={DELETE_ITEM_MUTATION}
                variables={{ id: this.props.id }}
                update={this.update}
            >
                {(deleteItem, { error }) => (
                    <button onClick={() => {
                        if (confirm('Are you sure you want to delete this item?'))
                            deleteItem()
                    }}>{this.props.children}</button>
                )}
            </Mutation>
        )
    }
}

export default DeleteItem