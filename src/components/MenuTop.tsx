import { Dropdown, Col, Row, Form, Button, Badge} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faBell } from '@fortawesome/free-solid-svg-icons'

const notificationCount = 1; 

const MenuTop = () => {
  return (
    <div className='column-dbos-center'>
              <Row>
        <Col>
        <Form className="d-flex">
        <Form.Control
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
        />
        <Button variant="outline-success"><FontAwesomeIcon icon={faMagnifyingGlass} /></Button>
        </Form>
        </Col>
        
        <Col>
        <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Spanish
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1"> English</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col>
          <Button variant="outline-secondary">
            <FontAwesomeIcon icon={faBell} />
            {notificationCount > 0 && (
              <Badge pill  className='custom-background rounded-chat-counter' >
                {notificationCount}
              </Badge>
            )}
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default MenuTop;
