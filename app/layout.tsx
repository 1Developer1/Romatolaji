"use client";
import { Inter } from "next/font/google";
import { Nav, NavDropdown, Navbar } from "react-bootstrap";
import { useState } from "react";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [expanded, setExpanded] = useState(false);

  const toggleNavbar = () => {
    setExpanded(!expanded);
  };

  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar
          expand="lg"
          bg="dark"
          data-bs-theme="dark"
          expanded={expanded}
          className="bg-body-tertiary"
        >
          <Container>
            <Navbar.Brand href="/">Romatoloji Sağlık Sistemi</Navbar.Brand>
            <Navbar.Toggle
              aria-controls="basic-navbar-nav"
              className="float-end ms-2"
              onClick={toggleNavbar}
            />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#home"></Nav.Link>
                <NavDropdown title="Hasta İşlemleri" id="basic-nav-dropdown">
                  <NavDropdown.Item>
                    <Link
                      href={`/Patient/RegistrationForm`}
                      className="btn btn-sm"
                    >
                      Hasta Kayıt Formu
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link href={`/Patient/List`} className="btn btn-sm">
                      Hasta Listele
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link
                      href={`/Patient/InformationEdit`}
                      className="btn btn-sm"
                    >
                      Bilgilerini Düzenle
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link href={`/Patient/SideEffect`} className="btn btn-sm">
                      Yan Etki
                    </Link>
                  </NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Reçete İşlemleri" id="basic-nav-dropdown">
                  <NavDropdown.Item>
                    <Link href={`/Prescriptions/Enter`} className="btn btn-sm">
                      Reçete Girişi
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link href={`/Prescriptions/List`} className="btn btn-sm">
                      Reçete Listeleme
                    </Link>
                  </NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Ekle" id="basic-nav-dropdown">
                  <NavDropdown.Item>
                    <Link href={`/Add/Medicine`} className="btn btn-sm">
                      İlaç Ekle
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link href={`/Add/Policlinic`} className="btn btn-sm">
                      Poliklinik Ekle
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link href={`/Add/Diseases`} className="btn btn-sm">
                      Hastalık Ekle
                    </Link>
                  </NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Randevu İşlemleri" id="basic-nav-dropdown">
                  <NavDropdown.Item>
                    <Link href={`/Appointment/List`} className="btn btn-sm">
                      Randevu Listele
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link href={`/Appointment/Create`} className="btn btn-sm">
                      Randevu Oluştur
                    </Link>
                  </NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Duyuru İşlemleri" id="basic-nav-dropdown">
                  <NavDropdown.Item>
                    <Link href={"/Announcement/Created"} className="btn btn-sm">
                      Duyuru Oluştur
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link href={"/Announcement/Display"} className="btn btn-sm">
                      Duyuru Görüntüle
                    </Link>
                  </NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Anket İşlemleri" id="basic-nav-dropdown">
                  <NavDropdown.Item>
                    <Link href={`/Survey/Create`} className="btn btn-sm">
                      Anket Oluştur
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link href={`/Survey/Display`} className="btn btn-sm">
                      Anketleri Listele
                    </Link>
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        {children}
      </body>
    </html>
  );
}
