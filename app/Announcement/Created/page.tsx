"use client";

import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Card, CardGroup } from 'react-bootstrap';
import axios from 'axios';

function AnnouncementPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [createdBy, setCreatedBy] = useState('');
  const [validFrom, setValidFrom] = useState('');
  const [validUntil, setValidUntil] = useState('');
  const [announcements, setAnnouncements] = useState([]);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const announcementsPerPage = 5;

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get('http://localhost:5000/announcements');
        setAnnouncements(response.data);
      } catch (error) {
        console.error('Duyurular çekilirken hata oluştu:', error);
      }
    };

    fetchAnnouncements();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/announcements', {
        title,
        content,
        createdBy,
        createdAt: new Date(),
        validFrom,
        validUntil,
      });
      console.log('Duyuru Oluşturuldu:', response.data);
      setTitle('');
      setContent('');
      setCreatedBy('');
      setValidFrom('');
      setValidUntil('');
      setAnnouncements([...announcements, response.data]); // Update the list of announcements
    } catch (error) {
      console.error('Duyuru oluşturulurken hata oluştu:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/announcements/${id}`);
      setAnnouncements(announcements.filter(a => a.id !== id));
      setSelectedAnnouncement(null);
    } catch (error) {
      console.error('Duyuru silinirken hata oluştu:', error);
    }
  };

  const handleEdit = async () => {
    if (selectedAnnouncement) {
      try {
        await axios.put(`http://localhost:5000/announcements/${selectedAnnouncement.id}`, selectedAnnouncement);
        setAnnouncements(announcements.map(a => a.id === selectedAnnouncement.id ? selectedAnnouncement : a));
        setSelectedAnnouncement(null);
      } catch (error) {
        console.error('Duyuru düzenlenirken hata oluştu:', error);
      }
    }
  };

  const handlePageChange = (direction) => {
    setCurrentPage(currentPage + direction);
  };

  const indexOfLastAnnouncement = currentPage * announcementsPerPage;
  const indexOfFirstAnnouncement = indexOfLastAnnouncement - announcementsPerPage;

  const filteredAnnouncements = announcements.filter(announcement => 
    announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    announcement.createdBy.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentAnnouncements = filteredAnnouncements.slice(indexOfFirstAnnouncement, indexOfLastAnnouncement);

  return (
    <Container className="my-4">
      <header>
        <h1 className="text-center">Duyurular Yönetimi</h1>
      </header>
      <section>
        <Row>
          <Col md={6}>
            <Card className="p-3 mb-4">
              <h2 className="text-center">Duyuru Oluştur</h2>
              <hr />
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
                <Form.Group controlId="content" className="mb-3">
                  <Form.Label>İçerik</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="createdBy" className="mb-3">
                  <Form.Label>Yapan Kişi</Form.Label>
                  <Form.Control
                    type="text"
                    value={createdBy}
                    onChange={(e) => setCreatedBy(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="validFrom" className="mb-3">
                  <Form.Label>Başlangıç Tarihi</Form.Label>
                  <Form.Control
                    type="date"
                    value={validFrom}
                    onChange={(e) => setValidFrom(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="validUntil" className="mb-3">
                  <Form.Label>Bitiş Tarihi</Form.Label>
                  <Form.Control
                    type="date"
                    value={validUntil}
                    onChange={(e) => setValidUntil(e.target.value)}
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100">
                  Duyuru Oluştur
                </Button>
              </Form>
              {selectedAnnouncement && (
                <div className="mt-4">
                  <h2 className="text-center">Düzenle</h2>
                  <hr />
                  <Form onSubmit={handleEdit}>
                    <Form.Group controlId="editTitle" className="mb-3">
                      <Form.Label>Başlık</Form.Label>
                      <Form.Control
                        type="text"
                        value={selectedAnnouncement.title}
                        onChange={(e) => setSelectedAnnouncement({ ...selectedAnnouncement, title: e.target.value })}
                        required
                      />
                    </Form.Group>
                    <Form.Group controlId="editContent" className="mb-3">
                      <Form.Label>İçerik</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        value={selectedAnnouncement.content}
                        onChange={(e) => setSelectedAnnouncement({ ...selectedAnnouncement, content: e.target.value })}
                        required
                      />
                    </Form.Group>
                    <Form.Group controlId="editCreatedBy" className="mb-3">
                      <Form.Label>Yapan Kişi</Form.Label>
                      <Form.Control
                        type="text"
                        value={selectedAnnouncement.createdBy}
                        onChange={(e) => setSelectedAnnouncement({ ...selectedAnnouncement, createdBy: e.target.value })}
                        required
                      />
                    </Form.Group>
                    <Form.Group controlId="editValidFrom" className="mb-3">
                      <Form.Label>Başlangıç Tarihi</Form.Label>
                      <Form.Control
                        type="date"
                        value={selectedAnnouncement.validFrom}
                        onChange={(e) => setSelectedAnnouncement({ ...selectedAnnouncement, validFrom: e.target.value })}
                        required
                      />
                    </Form.Group>
                    <Form.Group controlId="editValidUntil" className="mb-3">
                      <Form.Label>Bitiş Tarihi</Form.Label>
                      <Form.Control
                        type="date"
                        value={selectedAnnouncement.validUntil}
                        onChange={(e) => setSelectedAnnouncement({ ...selectedAnnouncement, validUntil: e.target.value })}
                        required
                      />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="w-100">
                      Güncelle
                    </Button>
                    <Button variant="danger" className="w-100 mt-2" onClick={() => handleDelete(selectedAnnouncement.id)}>
                      Sil
                    </Button>
                  </Form>
                </div>
              )}
            </Card>
          </Col>
          <Col md={6}>
            <Card className="p-3 mb-4">
              <article>
                <h2 className="text-center">Duyurular</h2>
                <hr />
                <Form.Group controlId="search" className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Başlığa veya Yapan Kişiye göre ara"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </Form.Group>
                {currentAnnouncements.length === 0 ? (
                  <p>Herhangi bir duyuru bulunmamaktadır.</p>
                ) : (
                  <>
                    {currentAnnouncements.map((announcement) => (
                      <Card key={announcement.id} className="mb-3" onClick={() => setSelectedAnnouncement(announcement)}>
                        <Card.Body>
                          <div className="d-flex justify-content-between mb-2">
                            <span className="text-muted">
                              <img src="https://img.icons8.com/ios/50/calendar--v1.png" alt="calendar--v1" width="25" height="25" className="me-2" />
                              {new Date(announcement.validFrom).toLocaleDateString()} - {new Date(announcement.validUntil).toLocaleDateString()}
                            </span>
                            <span className="text-muted">
                              <img width="20" height="20" src="https://img.icons8.com/ios/50/medical-doctor.png" alt="medical-doctor" className="me-1"/>
                              {announcement.createdBy}
                            </span>
                          </div>
                          <Card.Title>{announcement.title}</Card.Title>
                          <Card.Text>
                            {announcement.content}
                          </Card.Text>
                          <Card.Subtitle className="text-muted">
                            Oluşturulma Tarihi: {new Date(announcement.createdAt).toLocaleDateString()}
                          </Card.Subtitle>
                        </Card.Body>
                      </Card>
                    ))}
                    <div className="text-center mt-4">
                      <Button
                        variant="primary"
                        onClick={() => handlePageChange(-1)}
                        disabled={currentPage === 1}
                      >
                        Önceki
                      </Button>
                      <Button
                        variant="primary"
                        onClick={() => handlePageChange(1)}
                        disabled={indexOfLastAnnouncement >= filteredAnnouncements.length}
                        className="ms-2"
                      >
                        Sonraki
                      </Button>
                    </div>
                  </>
                )}
              </article>
            </Card>
          </Col>
        </Row>
      </section>
    </Container>
  );
}

export default AnnouncementPage;
