import React from 'react'
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../redux/actions/userActions';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { LinkContainer }  from 'react-router-bootstrap';

const Header = ({ userLogin, logout }) => {


    const logoutHandler = () => {
        logout()
    }
    const { userInfo } = userLogin;

  
    return (

        <header>
            <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand>ProShop</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <LinkContainer to='/cart'>
                            <Nav.Link><i className='fas fa-shopping-cart'></i> Cart</Nav.Link>
                        </LinkContainer>
                        {
                            userInfo ? (
                                <NavDropdown title={userInfo.user.name} id='username'>
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}>
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <LinkContainer to='/login'>
                                    <Nav.Link>
                                        <i className='fas fa-user'></i> Sign In
                                    </Nav.Link>
                                </LinkContainer>
                            )
                        }
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

const mapStateToProps = (state) => ({
    userLogin: state.userLogin
})

export default connect(mapStateToProps, { logout })(Header);