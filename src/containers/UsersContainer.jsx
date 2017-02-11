import React from 'react'
import { connect } from 'react-redux'
import * as userActions from '../actions/users'
import * as uiActions from '../actions/ui'
import * as messageActions from '../actions/message'
import Users from '../components/User/Users'
import * as api from '../api'

class UsersContainer extends React.Component {
  componentDidMount() {
    this.fetch({ query: 'javascript' })
  }

  fetchNextPage = () => {
    this.fetch({ nextUrl: this.props.nextUrl })
  }

  fetch = params => {
    this.props.fetchingUsers(true)
    api.fetchUsers(params).then(({ users, nextUrl }) => {
      this.props.fetchingUsers(false)
      this.props.receiveUsers(users, nextUrl)
    }).catch(() => {
      this.props.fetchingUsers(false)
    })
  }

  sendMessageTo = user => {
    this.props.setMessageTo(user)
    this.props.setIsSideMenuOpen(true)
  }

  render() {
    return <Users
      fetchNextPage={ this.fetchNextPage }
      users={ this.props.users }
      sendMessageTo={ this.sendMessageTo }
      isFetching={ this.props.isFetching }
    />
  }
}

UsersContainer.propTypes = {
  fetchUsers: React.PropTypes.func,
  users: React.PropTypes.array,
  isFetching: React.PropTypes.bool,
  nextUrl: React.PropTypes.string,
  setIsSideMenuOpen: React.PropTypes.func,
  setMessageTo: React.PropTypes.func
}

const mapStateToProps = state => ({
  users: state.users.items,
  nextUrl: state.users.nextUrl,
  isFetching: state.users.isFetching
})

const mapDispatchToProps = ({
  fetchUsers: userActions.fetchUsers,
  setIsSideMenuOpen: uiActions.setIsSideMenuOpen,
  setMessageTo: messageActions.setMessageTo,
  fetchingUsers: userActions.fetchingUsers,
  receiveUsers: userActions.receiveUsers
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersContainer)
