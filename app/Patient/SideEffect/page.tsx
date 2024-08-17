"use client";
import React from "react";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { PaitientModel } from "@/models/DataModals/PatientList";
import { Errorful, Successful } from "@/toolkit/toaster";
import { Label, Row, Col, Form } from "reactstrap";
import Table from "react-bootstrap/Table";
import ReactSelect from "react-select";
import { SideEffectList } from "@/models/DataModals/SideEffectList";
import { useFormik } from "formik";
import axios from "axios";

function page() {
  const [sideEffectList, setSideEffectList] = useState<SideEffectList[]>([]);
  const [patientList, setPatientList] = useState<PaitientModel[]>([]);

  const formik = useFormik({
    initialValues: {
      patientId: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const SelectedPatient = async (values: any) => {
    // let a = 0;
    await axios
      .get(
        `http://138.68.101.228:8080/api/kouhealth/v1/sideEffectNotification/byPatientId?patientId=${values.id}`,
        {}
      )
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          Successful({ message: "Hastaya ait yanetkiler bulunmuştur" });
          setSideEffectList(response.data);
        }
        if (response.status == 204) {
          Errorful({ message: "kayıt yok" });
          setSideEffectList(response.data);
        }
      })
      .catch((error) => {
        // Hata işleme
        Errorful({ message: "Hastaya ait yanetki  kaydı bulunamadı." });
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
      .get(
        "http://138.68.101.228:8080/api/kouhealth/v1/sideEffectNotification/all",
        {}
      )
      .then((response) => {
        console.log(response.data);
        setSideEffectList(response.data);
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
          <h2>Hasta Yanetki Listesi</h2>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              formik.handleSubmit();

              return false;
            }}
          >
            <div className="mt-3">
              <Label className="form-label">
                Hasta Seciniz <span className="text-danger">*</span>
              </Label>

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
                getOptionLabel={(item) => item.firstName + " " + item.lastName}
                onChange={(option) => {
                  if (option !== undefined && option !== null) {
                    SelectedPatient(option);
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
            </div>
          </Form>

          <Table striped bordered hover responsive>
            {/* <Table className="table table-bordered table-striped"> */}
            <thead>
              <tr>
                <th>Ad Soyad</th>
                <th>Yan Etki</th>
                <th>Hassasiyet</th>
                {/* <th>Cinsiyet</th>
                <th>Kan Grubu</th>
                <th>TC</th> */}
              </tr>
            </thead>
            <tbody>
              {sideEffectList.length == 0
                ? ""
                : sideEffectList.map((item, index) => {
                    return (
                      <tr>
                        <td>{item.patientName}</td>
                        <td>{item.sideEffectName}</td>
                        <td>{item.intensity}</td>
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
