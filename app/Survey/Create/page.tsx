"use client"; 

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button, ListGroup, Modal, Card } from 'react-bootstrap';


function CreateSurveyPage() {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([{ type: 'multiple-choice', text: '', options: ['', '', '', ''] }]);
  const [surveys, setSurveys] = useState([]);
  const [selectedSurvey, setSelectedSurvey] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newQuestionType, setNewQuestionType] = useState('multiple-choice');

  useEffect(() => {
    fetchSurveys();
  }, []);

  const fetchSurveys = async () => {
    try {
      const response = await axios.get('http://localhost:5000/surveys');
      setSurveys(response.data);
    } catch (error) {
      console.error('Anketler getirilirken hata oluştu:', error);
    }
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, { type: newQuestionType, text: '', options: newQuestionType === 'multiple-choice' ? ['', '', '', ''] : [] }]);
    setNewQuestionType('multiple-choice');
  };

  const handleQuestionChange = (index, value) => {
    const updatedQuestions = questions.map((question, i) => (i === index ? { ...question, text: value } : question));
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const updatedQuestions = questions.map((question, i) => {
      if (i === qIndex) {
        const updatedOptions = question.options.map((option, j) => (j === oIndex ? value : option));
        return { ...question, options: updatedOptions };
      }
      return question;
    });
    setQuestions(updatedQuestions);
  };

  const handleQuestionTypeChange = (index, type) => {
    const updatedQuestions = questions.map((question, i) => (i === index ? { ...question, type } : question));
    setQuestions(updatedQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/surveys', {
        title,
        questions,
        createdAt: new Date(),
      });
      setTitle('');
      setQuestions([{ type: 'multiple-choice', text: '', options: ['', '', '', ''] }]);
      alert('Anket oluşturuldu!');
      fetchSurveys();
    } catch (error) {
      console.error('Anket oluşturulurken hata oluştu:', error);
    }
  };

  const handleSurveyClick = (survey) => {
    setSelectedSurvey(survey);
    setShowModal(true);
  };

  const handleUpdateSurvey = async () => {
    try {
      await axios.put(`http://localhost:5000/surveys/${selectedSurvey.id}`, selectedSurvey);
      setShowModal(false);
      fetchSurveys();
      alert('Anket güncellendi!');
    } catch (error) {
      console.error('Anket güncellenirken hata oluştu:', error);
    }
  };

  const handleDeleteQuestion = (qIndex) => {
    const updatedQuestions = questions.filter((_, index) => index !== qIndex);
    setQuestions(updatedQuestions);
  };

  const handleModalDeleteQuestion = (qIndex) => {
    const updatedQuestions = selectedSurvey.questions.filter((_, index) => index !== qIndex);
    setSelectedSurvey({ ...selectedSurvey, questions: updatedQuestions });
  };

  const handleModalQuestionChange = (index, value) => {
    const updatedQuestions = selectedSurvey.questions.map((question, i) => (i === index ? { ...question, text: value } : question));
    setSelectedSurvey({ ...selectedSurvey, questions: updatedQuestions });
  };

  const handleModalOptionChange = (qIndex, oIndex, value) => {
    const updatedQuestions = selectedSurvey.questions.map((question, i) => {
      if (i === qIndex) {
        const updatedOptions = question.options.map((option, j) => (j === oIndex ? value : option));
        return { ...question, options: updatedOptions };
      }
      return question;
    });
    setSelectedSurvey({ ...selectedSurvey, questions: updatedQuestions });
  };

  const handleModalQuestionTypeChange = (index, type) => {
    const updatedQuestions = selectedSurvey.questions.map((question, i) => (i === index ? { ...question, type } : question));
    setSelectedSurvey({ ...selectedSurvey, questions: updatedQuestions });
  };

  const handleAddModalQuestion = () => {
    setSelectedSurvey({
      ...selectedSurvey,
      questions: [...selectedSurvey.questions, { type: 'multiple-choice', text: '', options: ['', '', '', ''] }],
    });
  };

  return (
    <Container as="main">
      <Row>
        <Col md={8}>
          <Card className="mb-4">
            <Card.Header>
              <h1 className="my-4">Yeni Anket Oluştur</h1>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="title" className="mb-3">
                  <Form.Label>Başlık</Form.Label>
                  <Form.Control
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </Form.Group>
                {questions.map((question, qIndex) => (
                  <Card className="mb-4" key={qIndex}>
                    <Card.Body>
                      <Form.Group controlId={`question-${qIndex}`} className="mb-3">
                        <Form.Label>Soru {qIndex + 1}</Form.Label>
                        <Form.Control
                          type="text"
                          value={question.text}
                          onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                          required
                        />
                      </Form.Group>
                      <Form.Group controlId={`type-${qIndex}`} className="mb-3">
                        <Form.Label>Soru Türü</Form.Label>
                        <Form.Control
                          as="select"
                          value={question.type}
                          onChange={(e) => handleQuestionTypeChange(qIndex, e.target.value)}
                        >
                          <option value="multiple-choice">Çoktan Seçmeli</option>
                          <option value="classic">Klasik</option>
                        </Form.Control>
                      </Form.Group>
                      {question.type === 'multiple-choice' && (
                        <fieldset>
                          {question.options.map((option, oIndex) => (
                            <Form.Group controlId={`option-${qIndex}-${oIndex}`} className="mb-3" key={oIndex}>
                              <Form.Label>Şık {String.fromCharCode(65 + oIndex)}</Form.Label>
                              <Form.Control
                                type="text"
                                value={option}
                                onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                                required
                              />
                            </Form.Group>
                          ))}
                        </fieldset>
                      )}
                      <div className="d-flex justify-content-end mt-3">
                        <Button 
                          variant="danger"
                          onClick={() => handleDeleteQuestion(qIndex)}
                        >
                          Soruyu Sil
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                ))}
                <Form.Group className="mb-3">
                  <Form.Label>Yeni Soru Türü</Form.Label>
                  <Form.Control
                    as="select"
                    value={newQuestionType}
                    onChange={(e) => setNewQuestionType(e.target.value)}
                  >
                    <option value="multiple-choice">Çoktan Seçmeli</option>
                    <option value="classic">Klasik</option>
                  </Form.Control>
                </Form.Group>
                <div className="d-flex justify-content-between">
                  <Button variant="secondary" onClick={handleAddQuestion}>
                    Yeni Soru Ekle
                  </Button>
                  <Button variant="primary" type="submit">
                    Anketi Oluştur
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} as="aside">
          <Card>
            <Card.Header>
              <h2 className="my-4">Mevcut Anketler</h2>
            </Card.Header>
            <Card.Body>
              <ListGroup>
                {surveys.map((survey) => (
                  <ListGroup.Item key={survey.id} action onClick={() => handleSurveyClick(survey)}>
                    {survey.title}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {selectedSurvey && (
        <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Anketi Güncelle</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="modalTitle" className="mb-3">
                <Form.Label>Başlık</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedSurvey.title}
                  onChange={(e) => setSelectedSurvey({ ...selectedSurvey, title: e.target.value })}
                  required
                />
              </Form.Group>
              {selectedSurvey.questions.map((question, qIndex) => (
                <Card className="mb-4" key={qIndex}>
                  <Card.Body>
                    <Form.Group controlId={`modal-question-${qIndex}`} className="mb-3">
                      <Form.Label>Soru {qIndex + 1}</Form.Label>
                      <Form.Control
                        type="text"
                        value={question.text}
                        onChange={(e) => handleModalQuestionChange(qIndex, e.target.value)}
                        required
                      />
                    </Form.Group>
                    <Form.Group controlId={`modal-type-${qIndex}`} className="mb-3">
                      <Form.Label>Soru Türü</Form.Label>
                      <Form.Control
                        as="select"
                        value={question.type}
                        onChange={(e) => handleModalQuestionTypeChange(qIndex, e.target.value)}
                      >
                        <option value="multiple-choice">Çoktan Seçmeli</option>
                        <option value="classic">Klasik</option>
                      </Form.Control>
                    </Form.Group>
                    {question.type === 'multiple-choice' && (
                      <fieldset>
                        {question.options.map((option, oIndex) => (
                          <Form.Group controlId={`modal-option-${qIndex}-${oIndex}`} className="mb-3" key={oIndex}>
                            <Form.Label>Şık {String.fromCharCode(65 + oIndex)}</Form.Label>
                            <Form.Control
                              type="text"
                              value={option}
                              onChange={(e) => handleModalOptionChange(qIndex, oIndex, e.target.value)}
                              required
                            />
                          </Form.Group>
                        ))}
                      </fieldset>
                    )}
                    <div className="d-flex justify-content-end mt-3">
                      <Button 
                        variant="danger"
                        onClick={() => handleModalDeleteQuestion(qIndex)}
                      >
                        Soruyu Sil
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              ))}
              <div className="d-flex justify-content-end mt-3">
                <Button 
                  variant="secondary" 
                  onClick={handleAddModalQuestion}
                >
                  Yeni Soru Ekle
                </Button>
              </div>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Kapat
            </Button>
            <Button variant="primary" onClick={handleUpdateSurvey}>
              Güncelle
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
}

export default CreateSurveyPage;
