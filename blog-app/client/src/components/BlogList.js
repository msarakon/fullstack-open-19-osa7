import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { List, Image } from 'semantic-ui-react'
import BlogRow from './BlogRow'

const BlogList = ({ blogs }) => {
  const imgs = ['helen', 'christian', 'daniel', 'stevie', 'elliot']
  const randomImg = () => imgs[Math.floor(Math.random() * imgs.length)]

  return (
    <List selection verticalAlign='middle' size='large'>
      {
        blogs.map(blog => 
          <List.Item key={blog.id}>
            <Image avatar src={'https://react.semantic-ui.com/images/avatar/small/' + randomImg() + '.jpg'} />
            <List.Content>
              <List.Header>
                <BlogRow blog={blog} />
              </List.Header>
            </List.Content>
          </List.Item>
        )
      }
    </List>
  )
}

const mapStateToProps = (state) => {
  return { blogs: state.blogs }
}

BlogList.propTypes = {
  blogs: PropTypes.array.isRequired
}

export default connect(mapStateToProps)(BlogList)