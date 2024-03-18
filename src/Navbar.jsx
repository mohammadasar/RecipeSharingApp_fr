import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Home from './Homepage';

function Navbars() {
  return (
    <>
      
      <Navbar bg="success" data-bs-theme="dark" >
        <Container className='d-flex align-items-center justify-content-between'>
          <div className="w-50">  
          <Navbar.Brand href="#home" className="fs-3">RecipeSharing</Navbar.Brand>
          </div>
          <div className="w-50">
          <Nav className="me-auto  d-flex align-items-center justify-content-between fs-5">
            <Nav.Link href="/" >Home</Nav.Link>
            <Nav.Link href="/SignUp">SingUp</Nav.Link>
            <Nav.Link href="/Login">Login</Nav.Link>
            <Nav.Link href="/userform">Post</Nav.Link>
          </Nav>
          </div>
        </Container>
      </Navbar>
      <Home></Home>
    </>
  );
}

export default Navbars;