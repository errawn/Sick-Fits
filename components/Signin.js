import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import Form from './styles/Form'
import Error from './ErrorMessage'
import { CURRENT_USER_QUERY } from './User'

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
      email
      name
    }
  }
`

class Signin extends Component {
  state = {
    email: '',
    password: '',
  }

  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    return (
      <Mutation 
        mutation={SIGNIN_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(signin, { error, loading }) => {
          return (
            <div>
              <Error error={error} />
              <Form
                method="post"
                onSubmit={async e => {
                  e.preventDefault()
                  console.log('test')
                  const res = await signin()
                  console.log(res)
                  this.setState({ email: '', password: '' })
                }}
              >
               <fieldset disabled={loading} aria-busy={loading}>
                <h1>Let's get started!</h1>
                <label htmlFor="email">
                  Email
                  <input
                    type="text" 
                    name="email" 
                    placeholder="Email"
                    value={this.state.email}
                    onChange={this.saveToState}
                  />
                </label>
                <label htmlFor="password">
                  Password
                  <input
                    type="text"
                    name="password"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.saveToState}
                  />
                </label>
              </fieldset>
              <button type="submit">Sign In</button>
              </Form>
            </div>
          )
        }}
      </Mutation>
    )
  }
}

export default Signin
