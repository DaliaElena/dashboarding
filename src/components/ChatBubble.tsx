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
    <Row>
      <Col>
        <div className="profile-picture-chat">
          <Image className="rounded-image" src={profileimage} alt="Profile" />
        </div>
      </Col>
      <Col>
        <p>{username}</p>
        <br />
        <p>{message}</p>
      </Col>
      <Col>
        <FontAwesomeIcon icon={faAngleRight} />
      </Col>
      <Col>
        <p>{dateprofile}</p>
      </Col>
    </Row>
  );
};

export default ChatBubble;
