// ** React Imports
import { useState, useEffect } from 'react'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Third Party Components
import { Lock, Edit, Trash2 } from 'react-feather'
import { Media, Row, Col, Button, Form, Input, Label, FormGroup, Table, CustomInput } from 'reactstrap'

const UserAccountTab = ({ selectedUser }) => {
  // ** States
  const [img, setImg] = useState(null)
  const [userData, setUserData] = useState(null)

  // ** Function to change user image
  const onChange = e => {
    const reader = new FileReader(),
      files = e.target.files
    reader.onload = function () {
      setImg(reader.result)
    }
    reader.readAsDataURL(files[0])
  }

  // ** Update user image on mount or change
  useEffect(() => {
    if (selectedUser !== null || (selectedUser !== null && userData !== null && selectedUser.id !== userData.id)) {
      setUserData(selectedUser)
      if (selectedUser.avatar.length) {
        return setImg(selectedUser.avatar)
      } else {
        return setImg(null)
      }
    }
  }, [selectedUser])

  // ** Renders User
  const renderUserAvatar = () => {
    if (img === null) {
      const stateNum = Math.floor(Math.random() * 6),
        states = ['light-success', 'light-danger', 'light-warning', 'light-info', 'light-primary', 'light-secondary'],
        color = states[stateNum]
      return (
        <Avatar
          initials
          color={color}
          className='rounded mr-2 my-25'
          content={selectedUser.fullName}
          contentStyles={{
            borderRadius: 0,
            fontSize: 'calc(36px)',
            width: '100%',
            height: '100%'
          }}
          style={{
            height: '90px',
            width: '90px'
          }}
        />
      )
    } else {
      return (
        <img
          className='user-avatar rounded mr-2 my-25 cursor-pointer'
          src={require('@src/assets/images/avatars/' + img).default}
          alt={selectedUser? selectedUser.fullName : 'user profile avatar'}
          height='90'
          width='90'
        />
      )
    }
  }

  if (userData === null || userData === undefined) {
    return null
  } else {
    return (
      <Row>
        <Col sm='12'>
          <Media className='mb-2'>
            {renderUserAvatar()}
            <Media className='mt-50' body>
              <h4>{selectedUser.fullName} </h4>
              <div className='d-flex flex-wrap mt-1 px-0'>
                <Button.Ripple id='change-img' tag={Label} className='mr-75 mb-0' color='primary'>
                  <span className='d-none d-sm-block'>Change</span>
                  <span className='d-block d-sm-none'>
                    <Edit size={14} />
                  </span>
                  <input type='file' hidden id='change-img' onChange={onChange} accept='image/*' />
                </Button.Ripple>
                <Button.Ripple color='secondary' outline>
                  <span className='d-none d-sm-block'>Remove</span>
                  <span className='d-block d-sm-none'>
                    <Trash2 size={14} />
                  </span>
                </Button.Ripple>
              </div>
            </Media>
          </Media>
        </Col>
        <Col sm='12'>
          <Form onSubmit={e => e.preventDefault()}>
            <Row>
              <Col md='4' sm='12'>
                <FormGroup>
                  <Label for='username'>Username</Label>
                  <Input type='text' id='username' placeholder='Username' defaultValue={userData.username} />
                </FormGroup>
              </Col>
              <Col md='4' sm='12'>
                <FormGroup>
                  <Label for='name'>Name</Label>
                  <Input type='text' id='name' placeholder='Name' defaultValue={userData.fullName} />
                </FormGroup>
              </Col>
              <Col md='4' sm='12'>
                <FormGroup>
                  <Label for='email'>Email</Label>
                  <Input type='text' id='email' placeholder='Email' defaultValue={userData.email} />
                </FormGroup>
              </Col>
              <Col md='4' sm='12'>
                <FormGroup>
                  <Label for='status'>Status</Label>
                  <Input type='select' name='status' id='status' defaultValue={userData.status}>
                    <option value='pending'>Pending</option>
                    <option value='active'>Active</option>
                    <option value='inactive'>Inactive</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col md='4' sm='12'>
                <FormGroup>
                  <Label for='role'>Role</Label>
                  <Input type='select' name='role' id='role' defaultValue={userData.role}>
                    <option value='admin'>Admin</option>
                    <option value='author'>Author</option>
                    <option value='editor'>Editor</option>
                    <option value='maintainer'>Maintainer</option>
                    <option value='subscriber'>Subscriber</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col md='4' sm='12'>
                <FormGroup>
                  <Label for='company'>Company</Label>
                  <Input
                    type='text'
                    id='company'
                    defaultValue={userData.company}
                    placeholder='WinDon Technologies Pvt Ltd'
                  />
                </FormGroup>
              </Col>

              <Col className='d-flex flex-sm-row flex-column mt-2' sm='12'>
                <Button.Ripple className='mb-1 mb-sm-0 mr-0 mr-sm-1' type='submit' color='primary'>
                  Save Changes
                </Button.Ripple>
                <Button.Ripple color='secondary' outline>
                  Reset
                </Button.Ripple>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    )
  }
}
export default UserAccountTab
