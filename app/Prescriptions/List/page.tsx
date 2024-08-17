"use client";
import React from "react";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { PaitientModel } from "@/models/DataModals/PatientList";
import { Errorful, Successful } from "@/toolkit/toaster";
import { useFormik } from "formik";
import { Navbar, NavbarBrand, Input, Label, Row, Col, Form } from "reactstrap";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { PrescriptionList } from "@/models/DataModals/PrescriptionList";
import ReactSelect from "react-select";
import { PatientRecord } from "@/models/DataModals/PatientRecordModal";
function page() {
  const [prescriptionsList, setPrescriptionsList] = useState<
    PrescriptionList[]
  >([]);
  const [patientList, setPatientList] = useState<PaitientModel[]>([]);
  const [selectpatient, setselectedpatient] = useState("");
  const formik = useFormik({
    initialValues: {
      patientId: "",
    },
    onSubmit: (values) => {
      console.log(values);
      axios
        .get(
          `http://138.68.101.228:8080/api/kouhealth/v1/patient/byId?id=${values.patientId}`,
          {}
        )
        .then((response) => {
          console.log(response);
          setPrescriptionsList(response.data);
        });
    },
  });
  const selectedPatientFonk = async (values: any) => {
    await axios
      .get(
        `http://138.68.101.228:8080/api/kouhealth/v1/prescription/byPatientId?patientId=${values.id}`,
        {}
      )
      .then((response) => {
        console.log(response.data);
        if (response.status == 200) {
          Successful({ message: "Hastaya ait  reçete bulunmuştur" });
          setPrescriptionsList(response.data);
        }
      })
      .catch((error) => {
        // Hata işleme
        Errorful({ message: "Hastaya ait reçete  kaydı bulunamadı." });
        // console.error("Hata:", error);
      });
  };
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
    axios
      .get("http://138.68.101.228:8080/api/kouhealth/v1/prescription/all", {})
      .then((response) => {
        console.log(response.data);
        setPrescriptionsList(response.data);
      });
  }, []);
  return (
    <div>
      <ToastContainer />
      <Row className="justify-content-center m-1">
        <Col sm={12} md={12} lg={12} xl={8}>
          {/* <div className="container">
        <div className="container mt-3"> */}
          <div className="container mt-3">
            {/* <h2>Reçete Bilgisi</h2>
            <p>Reçete Bilgisi</p> */}
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                formik.handleSubmit();

                return false;
              }}
            >
              <div className="mt-3 mb-2">
                <Label className="form-label">
                  Hasta Seciniz <span className="text-danger">*</span>
                </Label>
                {
                  <ReactSelect
                    blurInputOnSelect
                    isSearchable={true}
                    isDisabled={false}
                    isMulti={false}
                    options={patientList}
                    name="patientId"
                    id="patientId"
                    instanceId="patientId"
                    getOptionValue={(item) => item.id}
                    getOptionLabel={(item) =>
                      item.firstName + " " + item.lastName
                    }
                    onChange={(option) => {
                      if (option !== undefined && option !== null) {
                        selectedPatientFonk(option);
                        // formik.setFieldValue("patientId", option.id);
                      }
                    }}
                    placeholder={"Hasta Seciniz"}
                    noOptionsMessage={() => "No option"}
                    styles={{
                      container: (baseStyles, state) => ({
                        ...baseStyles,
                        flex: "1",
                      }),
                    }}
                  />
                }
              </div>
            </Form>

            {/* <div className="mt-3">
              <Label className="form-label">
                Hasta Seciniz <span className="text-danger">*</span>
              </Label>
              {
                <ReactSelect
                  blurInputOnSelect
                  isSearchable={true}
                  isDisabled={false}
                  isMulti={false}
                  options={patientList}
                  name="patientId"
                  id="patientId"
                  instanceId="patientId"
                  getOptionValue={(item) => item.id}
                  getOptionLabel={(item) =>
                    item.firstName + " " + item.lastName
                  }
                  onChange={(option) => {
                    if (option !== undefined && option !== null) {
                      setselectedpatient(option.id);
                      formik.setFieldValue("medicineId", option.id);
                    }
                  }}
                  placeholder={"Hasta Seciniz"}
                  noOptionsMessage={() => "No option"}
                  styles={{
                    container: (baseStyles, state) => ({
                      ...baseStyles,
                      flex: "1",
                    }),
                  }}
                />
              }
            </div> */}

            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Hasta Adı</th>
                  <th>Tanı</th>
                  <th>İlaç Adı</th>
                  <th>Günde Kaç Kez</th>
                  <th>Bir Seferde Kaç Adet</th>
                  <th>Kullanım Periyodu</th>
                  <th>Kullanım Periyodu Zaman Aralığ</th>
                  <th> Kaç Kutu</th>
                  <th>Kutudaki Tablet Sayısı</th>
                  <th>Başlangıç Tarihi</th>
                  <th>Başlangıç Saati</th>
                  <th>Bitiş Tarihi</th>
                </tr>
              </thead>
              <tbody>
                {prescriptionsList.length == 0
                  ? " "
                  : prescriptionsList.map((item, index) => {
                      return (
                        <tr>
                          <td>{item.patientName}</td>
                          <td>{item.diseasesName}</td>
                          <td>{item.medicineName}</td>
                          <td>{item.xday}</td>
                          <td>{item.xdose}</td>
                          <td>{item.period}</td>
                          <td>{item.xperiod}</td>
                          <td>{item.box}</td>
                          <td>{item.tablets}</td>
                          <td>{item.startDate}</td>
                          <td>{item.startHour}</td>
                          <td>{item.endDate}</td>
                        </tr>
                      );
                    })}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
      {/* </div>
      </div> */}
    </div>
  );
}

export default page;
