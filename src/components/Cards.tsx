import { Card, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBriefcase,faCheckDouble,faMugSaucer,faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons'


const Cards = () => {
  return (
    <div style={{ marginTop: '10px', marginBottom: '30px' }}>

        
        <Row>
            <Col>    
                <Card className='my-card-gray'>
                    <Card.Body>
                <Row> 
                    <Card.Title className='card-title-dark'>Total Workers</Card.Title>
                </Row>
                <Row>   
                    <Col><Card.Text className='card-text-style' style={{color:'#FF9E18'}}>
                        28   <FontAwesomeIcon icon={faBriefcase} className='icon-style-fa nohover' style={{ marginLeft: '10px' }}/>
                    </Card.Text>
                    </Col>
                </Row>
                </Card.Body>
                </Card>
            </Col>
            <Col>    
                <Card className='my-card-orange '>
                    <Card.Body>
                <Row> 
                    <Card.Title className='card-title-light'>Active Workers</Card.Title>
                </Row>
                <Row>   
                    <Col><Card.Text className='card-text-style' style={{color:'#FFFF'}}>
                        28   <FontAwesomeIcon icon={faCheckDouble} className='icon-style-fa' style={{ marginLeft: '10px',color:'#FFFF' }}/>
                    </Card.Text>
                    </Col>
                </Row>
                </Card.Body>
                </Card>
            </Col>
            <Col>    
                <Card className='my-card-gray'>
                    <Card.Body>
                <Row> 
                    <Card.Title className='card-title-dark'>Inactive Workers</Card.Title>
                </Row>
                <Row>   
                    <Col><Card.Text className='card-text-style' style={{color:'#FF9E18'}}>
                        5   <FontAwesomeIcon icon={faMugSaucer} className='icon-style-fa nohover' style={{ marginLeft: '10px' }}/>
                    </Card.Text>
                    </Col>
                </Row>
                </Card.Body>
                </Card>
            </Col>
            <Col>    
                <Card className='my-card-orange '>
                    <Card.Body>
                <Row> 
                    <Card.Title className='card-title-light'>Workers risk</Card.Title>
                </Row>
                <Row>   
                    <Col><Card.Text className='card-text-style' style={{color:'#FFFF'}}>
                        3   <FontAwesomeIcon icon={faScrewdriverWrench} className='icon-style-fa' style={{ marginLeft: '10px',color:'#FFFF' }}/>
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