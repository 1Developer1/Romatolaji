"use client";
import React from "react";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import Table from "react-bootstrap/Table";
import { Navbar, NavbarBrand, Input, Label, Row, Col, Form } from "reactstrap";
import axios from "axios";
import Link from "next/link";
import { Errorful, Successful } from "@/toolkit/toaster";
import { PaitientModel } from "@/models/DataModals/PatientList";
import { isEmptyArray } from "formik";
import { AppointmentList } from "@/models/DataModals/AppointmentList";
import ReactSelect from "react-select";

function page() {
  const [appointmentList, setappointmentlist] = useState<AppointmentList[]>([]);
  const [patientList, setPatientList] = useState<PaitientModel[]>([]);
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
          setappointmentlist(response.data);
        });
    },
  });
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
      .get(
        "http://138.68.101.228:8080/api/kouhealth/v1/appointment/byStatus?status=RESERVED",
        {}
      )
      .then((response) => {
        console.log(response.data);
        setappointmentlist(response.data);
      })
      .catch((error) => {
        // Hata işleme
        console.error("Hata:", error);
      });
  }, []);

  const selectedPatientFonk = async (values: any) => {
    await axios
      .get(
        `http://138.68.101.228:8080/api/kouhealth/v1/appointment/byPatientId?patientId=${values.id}`,
        {}
      )
      .then((response) => {
        console.log(response.data);
        if (response.status == 200) {
          Successful({ message: "Hastaya ait  randevu bulunmuştur" });
          setappointmentlist(response.data);
        }
      })
      .catch((error) => {
        // Hata işleme
        Errorful({ message: "Hastaya ait randevu  kaydı bulunamadı." });
        // console.error("Hata:", error);
      });
  };

  return (
    <div>
      <ToastContainer />
      <Row className="justify-content-center m-1">
        <Col sm={12} md={12} lg={12} xl={8}>
          <div className="container mt-3">
            <h2>Randevu Listesi</h2>
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
            <Table className="table table-hover" bordered hover responsive>
              <thead>
                <tr>
                  <th>Ad Soyad</th>
                  <th>Tarih</th>
                  <th>Saat Aralığı</th>
                  <th>Seçim</th>
                </tr>
              </thead>
              <tbody>
                {isEmptyArray(appointmentList)
                  ? ""
                  : appointmentList.map((item, index) => {
                      return (
                        <tr>
                          <td>{item.patientName}</td>
                          <td>{item.appointmentDate}</td>
                          <td>{item.appointmentHour}</td>
                          <td>
                            <input type="checkbox" />
                          </td>
                        </tr>
                      );
                    })}
              </tbody>
            </Table>
            <Link href={"/"} className="btn btn-danger " type="reset">
              İPTAL
            </Link>

            <button type="submit" className="btn btn-primary">
              DÜZENLE
            </button>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default page;
