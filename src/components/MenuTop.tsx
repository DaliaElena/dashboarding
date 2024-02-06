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
          style={{ width: '450px' }} 
        />
        <Button variant="link"><FontAwesomeIcon icon={faMagnifyingGlass} /></Button>
        </Form>
        </Col>
        
        <Col>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic" style={{ marginTop: '5px' }}>
              Spanish
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1"> English</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col>
          <Button variant="light" style={{ borderColor: '#A7A9AC', borderWidth: '1px', borderStyle: 'solid' }}>
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
