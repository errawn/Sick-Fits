import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import Link from 'next/link'

import PaginationStyles from './styles/PaginationStyles'
import { perPage } from '../config'

// this query counts how many items in db
const PAGINATION_QUERY = gql`
    query PAGINATION_QUERY {
        itemsConnection {
            aggregate {
                count
            }
        }
    }
`

const Pagination = props => (
    <Query query={PAGINATION_QUERY}>
    {({ data, loading, error }) => {
        if (loading) return <p>Loading...</p>
        const count = data.itemsConnection.aggregate.count
        const pages = Math.ceil(count / perPage)
        const page = props.page
        return (
            <PaginationStyles>
                <Link 
                    prefetch
                    href={{
                        pathname: 'items',
                        query: { page: page - 1 }
                    }}
                >
                    <a aria-disabled={page <= 1}>Prev</a>
                </Link>
                <p>Page {page} of {pages}. Total: {count}</p>
                <Link 
                    prefetch
                    href={{
                        pathname: 'items',
                        query: { page: page + 1 }
                    }}
                >
                    <a aria-disabled={page >= pages}>Next</a>
                </Link>
            </PaginationStyles>
        )
    }}
    </Query>
)

export default Pagination