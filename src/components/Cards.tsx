import { Card, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faCheckDouble, faMugSaucer, faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';
import useAPIGET from '../hooks/getAPI.tsx';
import { API_URL_WORKERS_CARDS } from '../config.tsx';

// Define a type for your data
interface WorkersData {
    total: number;
    active: number;
    inactive: number;
    risk: number;
}

const Cards = () => {
    // Fetch data from API
    const dataWorkers = useAPIGET(API_URL_WORKERS_CARDS) as WorkersData[]; // Make sure useAPIGET returns WorkersData[] or handle appropriately
    if (!dataWorkers) {
      return <div>Loading...</div>;
    }

    // Check if dataWorkers array is empty
    if (dataWorkers.length === 0) {
        return <div>No data available</div>;
    }

    // Assuming you only want to display the first data element
    const { total, active, inactive, risk } = dataWorkers[0];

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
                                        {total} <FontAwesomeIcon icon={faBriefcase} className='icon-style-fa nohover' />
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
                                        {active} <FontAwesomeIcon icon={faCheckDouble} className='icon-style-fa' style={{ color: '#FFFF' }} />
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
                                        {inactive} <FontAwesomeIcon icon={faMugSaucer} className='icon-style-fa nohover' />
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
                                        {risk} <FontAwesomeIcon icon={faScrewdriverWrench} className='icon-style-fa' style={{ color: '#FFFF' }} />
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
