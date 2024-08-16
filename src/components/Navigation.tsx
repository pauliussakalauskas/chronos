import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

export function Navigation() {
  return (
    <Navbar bg="dark" expand="lg">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/" className="text-white">
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/settings" className="text-white">
            Settings
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
