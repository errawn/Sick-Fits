import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import Form from './styles/Form'
import Error from './ErrorMessage'
import { CURRENT_USER_QUERY } from './User'

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION($email: String!, $name: String!, $password: String!) {
    signup(email: $email, name: $name, password: $password) {
      id
      email
      name
    }
  }
`

class Signup extends Component {
  state = {
    email: '',
    name: '',
    password: '',
  }

  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    return (
      <Mutation
        mutation={SIGNUP_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(signup, { error, loading }) => {
          return (
            <div>
              <Error error={error} />
              <Form
                method="post"
                onSubmit={async e => {
                  e.preventDefault()
                  console.log('test')
                  const res = await signup()
                  console.log(res)
                  this.setState({ email: '', name: '', password: '' })
                }}
              >
               <fieldset disabled={loading} aria-busy={loading}>
                <h1>Signup for an account</h1>
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
                <label htmlFor="name">
                  Name
                  <input 
                    type="text" 
                    name="name" 
                    placeholder="Name" 
                    value={this.state.name}
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
              <button type="submit">Sign Up</button>
              </Form>
            </div>
          )
        }}
      </Mutation>
    );
  }
}

export default Signup
