"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Form, Modal } from 'react-bootstrap';

interface Announcement {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  createdBy: string;
  validFrom: string;
  validUntil: string;
}

function ShowAnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);
  const [showModal, setShowModal] = useState(false);
  const announcementsPerPage = 5;

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get('http://localhost:5000/announcements');
        // Sort announcements by createdAt date in descending order
        const sortedAnnouncements = response.data.sort((a: Announcement, b: Announcement) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setAnnouncements(sortedAnnouncements);
      } catch (error) {
        console.error('Duyurular çekilirken hata oluştu:', error);
      }
    };

    fetchAnnouncements();
  }, []);

  const filteredAnnouncements = announcements.filter(announcement =>
    announcement.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate the current announcements to display
  const indexOfLastAnnouncement = currentPage * announcementsPerPage;
  const indexOfFirstAnnouncement = indexOfLastAnnouncement - announcementsPerPage;
  const currentAnnouncements = filteredAnnouncements.slice(indexOfFirstAnnouncement, indexOfLastAnnouncement);

  const nextPage = () => {
    if (currentPage < Math.ceil(filteredAnnouncements.length / announcementsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleCardClick = (announcement: Announcement) => {
    setSelectedAnnouncement(announcement);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedAnnouncement(null);
  };

  const announcementsPerYear = announcements.reduce((acc: { [year: string]: number }, announcement) => {
    const year = new Date(announcement.createdAt).getFullYear().toString();
    acc[year] = (acc[year] || 0) + 1;
    return acc;
  }, {});

  return (
    <Container className="my-4">
      <header>
        <h1>Duyurular</h1>
        <hr />
      </header>
      <Row>
        <Col md={9}>
          <section>
            {currentAnnouncements.map((announcement) => (
              <article key={announcement.id} className="mb-3">
                <Card 
                  style={{ cursor: 'pointer', border: '1px solid #ddd' }} 
                  onClick={() => handleCardClick(announcement)}
                >
                  <Card.Body>
                    <div className="d-flex justify-content-between mb-2">
                      <span className="datesub d-inline-block text-sm text-muted">
                        <img src="https://img.icons8.com/ios/50/calendar--v1.png" alt="calendar--v1" width="25" height="25" className="me-2" />
                        {new Date(announcement.validFrom).toLocaleDateString()} / {new Date(announcement.validUntil).toLocaleDateString()}
                      </span>
                      <span className="reads d-inline-block text-sm text-muted">
                        <img width="20" height="20" src="https://img.icons8.com/ios/50/medical-doctor.png" alt="medical-doctor" className="me-1"/>
                        {announcement.createdBy}
                      </span>
                    </div>
                    <Card.Title>{announcement.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      Oluşturulma Tarihi: {new Date(announcement.createdAt).toLocaleDateString()}
                    </Card.Subtitle>
                  </Card.Body>
                </Card>
              </article>
            ))}
            <div className="text-center mt-4">
              <Button
                variant="secondary"
                onClick={prevPage}
                disabled={currentPage === 1}
                style={{ fontSize: '14px', marginRight: '10px' }}
              >
                Önceki
              </Button>
              <Button
                variant="primary"
                onClick={nextPage}
                disabled={currentPage === Math.ceil(filteredAnnouncements.length / announcementsPerPage)}
                style={{ fontSize: '14px' }}
              >
                Sonraki
                <svg className="MuiSvgIcon-root" focusable="false" aria-hidden="true" viewBox="0 0 24 24">
                  <path d="M6.23 20.23 8 22l10-10L8 2 6.23 3.77 14.46 12z"></path>
                </svg>
              </Button>
            </div>
          </section>
        </Col>
        <Col md={3}>
          <aside>
            <Form className="mb-4">
              <Form.Group controlId="search">
                <Form.Control
                  type="text"
                  placeholder="Duyuru başlığına göre ara..."
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </Form.Group>
            </Form>
          </aside>
        </Col>
      </Row>

      {/* Modal for displaying announcement details */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedAnnouncement?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>İçerik:</strong></p>
          <div>{selectedAnnouncement?.content}</div>
          <p><strong>Oluşturan:</strong> {selectedAnnouncement?.createdBy}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Kapat
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default ShowAnnouncementsPage;
