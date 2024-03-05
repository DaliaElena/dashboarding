import { Card, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBriefcase, faCheckDouble, faMugSaucer, faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons'
import useAPIGET from '../hooks/getAPI.tsx';
import { API_URL_WORKERS_CARDS } from '../config.tsx';


const Cards = () => {
    const dataWorkers = useAPIGET(API_URL_WORKERS_CARDS);  
    if (!dataWorkers) {
      return <div>Loading...</div>;
    }


    return (
        <div style={{ marginTop: '10px', marginBottom: '30px' }}>
            <Row>
                <Col xs={3}>
                    <Card className='my-card-gray'>
                        <Card.Body>
                            <Row>
                                <Card.Title className='card-title-dark'>Total Workers</Card.Title>
                            </Row>
                            <Row>
                                <Col>
                                    <Card.Text className='card-text-style' style={{ color: '#FF9E18' }}>
                                        {dataWorkers.total} <FontAwesomeIcon icon={faBriefcase} className='icon-style-fa nohover' />
                                    </Card.Text>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={3}>
                    <Card className='my-card-orange '>
                        <Card.Body>
                            <Row>
                                <Card.Title className='card-title-light'>Active Workers</Card.Title>
                            </Row>
                            <Row>
                                <Col>
                                    <Card.Text className='card-text-style' style={{ color: '#FFFF' }}>
                                        {dataWorkers.active} <FontAwesomeIcon icon={faCheckDouble} className='icon-style-fa' style={{ color: '#FFFF' }} />
                                    </Card.Text>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={3}>
                    <Card className='my-card-gray'>
                        <Card.Body>
                            <Row>
                                <Card.Title className='card-title-dark'>Inactive Workers</Card.Title>
                            </Row>
                            <Row>
                                <Col>
                                    <Card.Text className='card-text-style' style={{ color: '#FF9E18' }}>
                                        {dataWorkers.inactive} <FontAwesomeIcon icon={faMugSaucer} className='icon-style-fa nohover' />
                                    </Card.Text>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={3}>
                    <Card className='my-card-orange '>
                        <Card.Body>
                            <Row>
                                <Card.Title className='card-title-light'>Workers at Risk</Card.Title>
                            </Row>
                            <Row>
                                <Col>
                                    <Card.Text className='card-text-style' style={{ color: '#FFFF' }}>
                                        {dataWorkers.risk} <FontAwesomeIcon icon={faScrewdriverWrench} className='icon-style-fa' style={{ color: '#FFFF' }} />
                                    </Card.Text>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default Cards;
