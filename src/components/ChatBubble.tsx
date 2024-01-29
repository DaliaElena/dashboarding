import React from 'react';
import { Col, Row, Image } from 'react-bootstrap';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface ChatBubbleProps {
  username: string;
  message: string;
  profileimage: string;
  dateprofile: string;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ username, message, profileimage, dateprofile }) => {
  return (
    <>
    <Row>
        <div className='container-bubbles'>
        <Col>
            <div className="profile-picture-chat">
                <Image className="rounded-image" src={profileimage} alt="Profile" />
            </div>
        </Col>
        <Col>
            <div className="text-bubbles ">
                <p className="bubbles-dateprofile">{dateprofile}</p>
            </div>
        </Col>
        </div>
    </Row>
    <Row>
        <div className="container-bubbles">
                <Col className='text-al-left'>
                    <p className='bubbles-username'>{username}</p>
                    <p className='bubbles-message'>{message}</p>
                </Col>
                <Col>
                    <div className="text-bubbles">
                       <p className='bubbles-icon'><FontAwesomeIcon icon={faAngleRight} /></p> 
                    </div>
                </Col>
        </div>
    </Row>
    </>

  );
};

export default ChatBubble;
