import { Image, Col, Row} from 'react-bootstrap';
import ChatBubble from './ChatBubble.tsx';
import Profilepicture from "../assets/closeup-retrato-profesor-feliz-caucasico-vasos.jpg";
import Profileimage from "../assets/retrato-hombre-reir.jpg";


const MenuLatRight= () => {
  return (

    <div className= 'col-chat-picture'>
        <Row>
          <Col>
          <div className = "profile-picture"> 
            <Image className = "rounded-image"  src={Profilepicture}  />
          </div>
          </Col>

          <Col>
          <div className = "top-name">
          <Row><a className='three-gray'>Anddy Richardson</a></Row>
           <Row><a className='four-gray' href="">ID: 7465793</a></Row>
          </div>
          </Col>
        </Row>
        <Row className = 'nj-gray-light'>
          <Col>
            <p>Messages</p>
          </Col>
          <Col>
            <p>3</p>
          </Col>
        </Row>

        <ChatBubble dateprofile="Dec, 3, 12:31 pm" profileimage={Profileimage} username="James Robinson" message="I got your email and ..." />
        <ChatBubble dateprofile="Jan, 2, 12:31 pm" profileimage={Profileimage} username="James Robinson" message="I need some maintenance" />
        <ChatBubble dateprofile="Jan, 2, 12:31 pm" profileimage={Profileimage} username="James Robinson" message="The data origin was change..." />
    
    </div>
  );
};

export default MenuLatRight;
