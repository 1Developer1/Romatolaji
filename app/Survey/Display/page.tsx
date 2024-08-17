"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, ListGroup, Modal, Form, Button, Card } from 'react-bootstrap';

interface Survey {
  id: string;
  title: string;
  questions: {
    text: string;
    type: string;
    options: string[];
  }[];
  createdAt: string;
}

function ShowSurveysPage() {
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [selectedSurvey, setSelectedSurvey] = useState<Survey | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const response = await axios.get('http://localhost:5000/surveys');
        setSurveys(response.data);
      } catch (error) {
        console.error('Anketler çekilirken hata oluştu:', error);
      }
    };

    fetchSurveys();
  }, []);

  const handleSurveyClick = (survey: Survey) => {
    setSelectedSurvey(survey);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedSurvey(null);
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={8}>
          <h1 className="my-4">Anketler</h1>
          <ListGroup>
            {surveys.map((survey) => (
              <ListGroup.Item key={survey.id} action onClick={() => handleSurveyClick(survey)}>
                <h5>{survey.title}</h5>
                <small>{new Date(survey.createdAt).toLocaleDateString()}</small>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>

      {selectedSurvey && (
        <Modal show={showModal} onHide={handleCloseModal} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>{selectedSurvey.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedSurvey.questions.map((question, qIndex) => (
              <Card className="mb-4" key={qIndex}>
                <Card.Body>
                  <Form.Group controlId={`question-${qIndex}`} className="mb-3">
                    <Form.Label>{`Soru ${qIndex + 1}: ${question.text}`}</Form.Label>
                    {question.type === 'multiple-choice' && (
                      <fieldset>
                        {question.options.map((option, oIndex) => (
                          <Form.Check
                            key={oIndex}
                            type="radio"
                            id={`option-${qIndex}-${oIndex}`}
                            label={option}
                            name={`question-${qIndex}`}
                            value={option}
                            className="mb-2"
                          />
                        ))}
                      </fieldset>
                    )}
                    {question.type === 'classic' && (
                      <Form.Control as="textarea" rows={3} readOnly value="Bu soru klasik bir soru. Cevap vermek için bir form ya da başka bir yer olmalıdır." />
                    )}
                  </Form.Group>
                </Card.Body>
              </Card>
            ))}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Kapat
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
}

export default ShowSurveysPage;
