import { Card, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faCheckDouble, faMugSaucer, faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';
import { API_URL_WORKERS_CARDS } from '../config.tsx';

import { useEffect, useState } from 'react';

interface WorkerData {
    total: number;
    active: number;
    risk: number;
    inactive: number;
}

const useAPIGET = (url: string) => {
    const [apiData, setApiData] = useState<WorkerData | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setApiData(data);
            } catch (error) {
                console.error('Error fetching chart data:', error);
            }
        };

        fetchData();

    }, [url]); 

    return apiData;
};

const Cards = () => {
    const dataWorkers = useAPIGET(API_URL_WORKERS_CARDS);
    
    if (!dataWorkers) {
        return <div>Loading...</div>;
    }
    
    const total = dataWorkers.total || 0;
    const active = dataWorkers.active || 0;
    const risk = dataWorkers.risk || 0;
    const inactive = dataWorkers.inactive || 0;

    return (
        <div style={{ marginTop: '10px', marginBottom: '30px' }}>
            <Row>
                <Col xs={3}>
                    <Card className='my-card-gray'>
                        <Card.Body>
                            <Row>
                                <Card.Title className='card-title-light'>Total Workers</Card.Title>
                            </Row>
                            <Row>
                                <Col>
                                    <Card.Text className='card-text-style' style={{ color: '#FFFFFF', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>
                                        {total}
                                        <FontAwesomeIcon icon={faBriefcase} className='icon-style-fa nohover'/>
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
                                    <Card.Text className='card-text-style' style={{color: '#FFFFFF', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>
                                        {active}
                                        <FontAwesomeIcon icon={faCheckDouble} className='icon-style-fa' style={{ color: '#FFFF' }} />
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
                                <Card.Title className='card-title-light'>Inactive Workers</Card.Title>
                            </Row>
                            <Row>
                                <Col>
                                    <Card.Text className='card-text-style' style={{ color: '#FFFFFF', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>
                                        {inactive}
                                         <FontAwesomeIcon icon={faMugSaucer} className='icon-style-fa nohover' />
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
                                        {risk}
                                        <FontAwesomeIcon icon={faScrewdriverWrench} className='icon-style-fa' style={{ color: '#FFFF' }} />
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
