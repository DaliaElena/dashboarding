import { FC } from 'react';
import { Dropdown, ListGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseChimney, faDatabase, faLink, faTable, faSquarePlus, faClockRotateLeft, faToolbox, faBusinessTime, faGear, faUser, faCircleInfo, faSignOut, faChartLine } from '@fortawesome/free-solid-svg-icons';
import Logo from '../assets/Logo.png';
import { JUPYTER_INSTANCE } from '../config.tsx';


interface MenuLatLeftProps {
  signOut?: (() => void) | undefined;
}

const MenuLatLeft: FC<MenuLatLeftProps> = (props) => {
  return (
    <div className='LeftMenu column-dbos-left'>
      <div className="color-text-menu text-left">
        {/*Logo*/}
        <div className="text-center-menu">
          <img src={Logo} alt="DBOSlabLogo" className="generated-image"></img>
        </div>
        {/*menu*/}
        <div className="principal-menu">
          <span>MENU</span>
            <ListGroup  className="no-list-borders">
              <ListGroup.Item ><a href="/dashboarding/"><FontAwesomeIcon icon={faHouseChimney} /> Home</a> </ListGroup.Item>
              <ListGroup.Item ><Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    <FontAwesomeIcon icon={faDatabase} /> Data Origin
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="/dashboarding/AddNewDataOrigin"><FontAwesomeIcon icon={faSquarePlus} /> Add New Data Origin</Dropdown.Item>
                    <Dropdown.Item href="/dashboarding/DataOriginHistory"><FontAwesomeIcon icon={faClockRotateLeft} /> Data Origin History</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </ListGroup.Item>
              <ListGroup.Item>
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    <FontAwesomeIcon icon={faLink} /> DBOSlab Connection
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href={JUPYTER_INSTANCE}><FontAwesomeIcon icon={faToolbox} /> Add New Worker</Dropdown.Item>
                    <Dropdown.Item href="/dashboarding/WorkersHistory"><FontAwesomeIcon icon={faBusinessTime} /> Workers History</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </ListGroup.Item>
              <ListGroup.Item> <a href="/dashboarding/PipelinesHistory"><FontAwesomeIcon icon={faChartLine} />My Pipelines</a></ListGroup.Item> 
              <ListGroup.Item> <a href="/dashboarding/MyDashboards"><FontAwesomeIcon icon={faTable} /> My Dashboards</a></ListGroup.Item> 
              <ListGroup.Item> <a href="/dashboarding/AnomalyDetection"><FontAwesomeIcon icon={faChartLine} />Anomaly Detection</a></ListGroup.Item> 
          </ListGroup>
        </div>
          {/*OthersMenu*/}
        <div  className="others-menu"> 
          <span>OTHERS</span>
          <ListGroup  className="no-list-borders">
            <ListGroup.Item  className='hover-effect'><a href="/dashboarding/Settings"><FontAwesomeIcon icon={faGear} /> Settings</a></ListGroup.Item>
            <ListGroup.Item  className='hover-effect'><a href="/dashboarding/Account"><FontAwesomeIcon icon={faUser} /> Account</a></ListGroup.Item>
            <ListGroup.Item  className='hover-effect'><a href="/dashboarding/Help"><FontAwesomeIcon icon={faCircleInfo} /> Help</a></ListGroup.Item>
            <ListGroup.Item className='hover-effect' onClick={props.signOut}><a href="/dashboarding"><FontAwesomeIcon icon={faSignOut} /> Sign Out</a></ListGroup.Item>
          </ListGroup>
        </div>
      </div>
    </div>
  );
};

export default MenuLatLeft;