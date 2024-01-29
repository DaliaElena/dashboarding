import { Image, Col, Row} from 'react-bootstrap';
import ChatBubble from './ChatBubble.tsx';

const MenuLatRight= () => {
  return (

    <div className= 'col-chat-picture'>
        <Row>
          <Col>
          <div className = "profile-picture"> 
            <Image className = "rounded-image"  src="src/assets/closeup-retrato-profesor-feliz-caucasico-vasos.jpg"  />
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

        <ChatBubble dateprofile="Dec, 3, 12:31 pm" profileimage="src/assets/retrato-hombre-reir.jpg" username="James Robinson" message="I need some maintenance" />
        <ChatBubble dateprofile="Jan, 2, 12:31 pm" profileimage="src/assets/retrato-hombre-reir.jpg" username="James Robinson" message="I need some maintenance" />
        <ChatBubble dateprofile="Jan, 2, 12:31 pm" profileimage="src/assets/retrato-hombre-reir.jpg" username="James Robinson" message="I need some maintenance" />
        <ChatBubble dateprofile="Jan, 2, 12:31 pm" profileimage="src/assets/retrato-hombre-reir.jpg" username="James Robinson" message="I need some maintenance" />
    
    </div>
  );
};

export default MenuLatRight;
