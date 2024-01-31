import { Dropdown, ListGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouseChimney,faDatabase, faLink, faTable, faSquarePlus, faClockRotateLeft, faToolbox, faBusinessTime, faGear, faUser, faCircleInfo, faSignOut,faChartLine} from '@fortawesome/free-solid-svg-icons'
import Logo from '../assets/Logo.png';

const MenuLatLeft = (props) => {
  return (
    <div className='LeftMenu'>
      <div className="color-text-menu text-left">
        {/*Logo*/}
        <div className="text-center">
          <img src={Logo} alt="DBOSlabLogo" className="generated-image"></img>
        </div>
        {/*menu*/}

        <div className="principal-menu">
          <span>MENU</span>
            <ListGroup  className="no-list-borders">
              <ListGroup.Item ><a href=""><FontAwesomeIcon icon={faHouseChimney} /> Home</a> </ListGroup.Item>
              <ListGroup.Item ><Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    <FontAwesomeIcon icon={faDatabase} /> Data Origin
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1"><FontAwesomeIcon icon={faSquarePlus} /> Add New Data Origin</Dropdown.Item>
                    <Dropdown.Item href="#/action-2"><FontAwesomeIcon icon={faClockRotateLeft} /> Data Origin History</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                
              </ListGroup.Item>

              <ListGroup.Item>
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    <FontAwesomeIcon icon={faLink} /> DBOSlab Connection
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1"><FontAwesomeIcon icon={faToolbox} /> Add New Worker</Dropdown.Item>
                    <Dropdown.Item href="#/action-2"><FontAwesomeIcon icon={faBusinessTime} /> Workers History</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </ListGroup.Item>
              <ListGroup.Item> <a href=""><FontAwesomeIcon icon={faTable} /> My Dashboards</a></ListGroup.Item> 
              <ListGroup.Item> <a href=""><FontAwesomeIcon icon={faChartLine} />Anomaly Detection</a></ListGroup.Item> 
            
          </ListGroup>
        </div>
          {/*OthersMenu*/}
        <div  className="others-menu"> 
          <span>OTHERS</span>
          <ListGroup  className="no-list-borders">
            <ListGroup.Item  className='hover-effect'><a href=""><FontAwesomeIcon icon={faGear} /> Settings</a></ListGroup.Item>
            <ListGroup.Item  className='hover-effect'><a href=""><FontAwesomeIcon icon={faUser} /> Account</a></ListGroup.Item>
            <ListGroup.Item  className='hover-effect'><a href=""><FontAwesomeIcon icon={faCircleInfo} /> Help</a></ListGroup.Item>
            <ListGroup.Item  className='hover-effect' onClick={props.signOut}><a href=""><FontAwesomeIcon icon={faSignOut} /> Sign Out</a></ListGroup.Item>
          </ListGroup>
        </div>
      </div>
    </div>
  );
};

export default MenuLatLeft;