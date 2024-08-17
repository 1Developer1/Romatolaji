"use client";
import React from "react";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { PaitientModel } from "@/models/DataModals/PatientList";
import { Errorful, Successful } from "@/toolkit/toaster";
import { Navbar, NavbarBrand, Input, Label, Row, Col, Form } from "reactstrap";
import Table from "react-bootstrap/Table";
import { isEmptyArray } from "formik";
import axios from "axios";

function page() {
  const [patientList, setPatientList] = useState<PaitientModel[]>([]);
  useEffect(() => {
    axios
      .get("http://138.68.101.228:8080/api/kouhealth/v1/patient/all", {})
      .then((response) => {
        console.log(response.data);
        setPatientList(response.data);
      })
      .catch((error) => {
        // Hata işleme
        console.error("Hata:", error);
      });
  }, []);
  return (
    <div>
      <ToastContainer />
      <Row className="justify-content-center m-1">
        <Col sm={12} md={12} lg={12} xl={8}>
          {/* <div className="container">
        <div className="container mt-3"> */}

          <h2>Hasta Listesi</h2>
          <Table striped bordered hover responsive>
            {/* <Table className="table table-bordered table-striped"> */}
            <thead>
              <tr>
                <th>Ad Soyad</th>
                <th>Telefon</th>
                <th>Email</th>
                <th>Cinsiyet</th>
                <th>Kan Grubu</th>
                <th>TC</th>
                <th>Tanı</th>
                <th>Tanı Kod</th>
              </tr>
            </thead>
            <tbody>
              {/* mapping */}
              {patientList.length == 0
                ? " "
                : patientList.map((item, index) => {
                    return (
                      <tr>
                        <td>{item.firstName}</td>
                        <td>{item.mobilePhone}</td>
                        <td>{item.email}</td>
                        <td>{item.gender}</td>
                        <td>{item.blood}</td>
                        <td>{item.tc}</td>
                        <td>{item.diseasesName}</td>
                        <td>{item.diseasesCode}</td>
                      </tr>
                    );
                  })}
              {/* <tr>
                <td>PatientList</td>
                <td>05316201509</td>
                <td>fatihpir@example.com</td>
                <td>11</td>
                <td>Ailesel Akdeniz Ateşi</td>
              </tr>
              <tr>
                <td>Fatih Pir</td>
                <td>05316201509</td>
                <td>fatihpir@example.com</td>
                <td>11</td>
                <td>Ailesel Akdeniz Ateşi</td>
              </tr>
              <tr>
                <td>Fatih Pir</td>
                <td>05316201509</td>
                <td>fatihpir@example.com</td>
                <td>11</td>
                <td>Ailesel Akdeniz Ateşi</td>
              </tr>
              <tr>
                <td>Fatih Pir</td>
                <td>05316201509</td>
                <td>fatihpir@example.com</td>
                <td>11</td>
                <td>Ailesel Akdeniz Ateşi</td>
              </tr> */}
            </tbody>
          </Table>
        </Col>
      </Row>
      {/* </div>
      </div> */}
    </div>
  );
}

export default page;
