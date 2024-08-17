"use client";
import React from "react";
import { FC } from "react";
import { ToastContainer } from "react-toastify";
import { useState, useEffect } from "react";
import axios from "axios";
import ReactSelect from "react-select";
import { useFormik } from "formik";
import { Navbar, NavbarBrand, Input, Label, Row, Col, Form } from "reactstrap";
import { PatientRecord } from "@/models/DataModals/PatientRecordModal";
interface pageProps {
  params: { id: number };
}

const page: FC<pageProps> = ({ params }) => {
  console.log(params);
  const [patientList, setPatientList] = useState<PatientRecord[]>([]);
  const patient_record: PatientRecord = {
    Name: "",
    Surname: "",
    TC: "",
    PhoneNumber: "",
    Email: "",
    Gender: "",
    BirtdayDate: "",
    Diagnosis: "",
    BloodGroup: "",
    diseasesCode: "",
    diseasesName: "",
  };
  useEffect(() => {
    axios
      .get(
        `http://35.184.106.151:8080/api/kouhealth/v1/patient/byId?id=${params.id}`,
        {}
      )
      .then((response) => {
        console.log(response.data);
        setPatientList(response.data);
      })
      .catch((error) => {
        // Hata işleme
        console.error("Hata:", error);
      });
  }, []);
  const formik = useFormik({
    initialValues: patient_record,
    // validationSchema: patient_record_Validation,
    onSubmit: async (values) => {
      //   axios
      //     .post(
      //       "http://35.184.106.151:8080/api/kouhealth/v1/patient/add",
      //       {
      //         firstName: values.Name,
      //         lastName: values.Surname,
      //         tc: values.TC,
      //         passportNumber: "",
      //         gender: values.Gender,
      //         email: values.Email,
      //         mobilePhone: values.PhoneNumber,
      //         birthday: values.BirtdayDate,
      //         blood: values.BloodGroup,
      //         status: null,
      //       },
      //       {}
      //     )
      //     .then((response) => {
      //       // Başarılı yanıt işleme
      //       console.log(response);
      //       if (response.status == 201) {
      //         Successful({ message: "Hasta Kaydınız Gerçekleşmiştir" });
      //       } else {
      //         Errorful({ message: "Hasta kaydı gerçekleşmedi." });
      //       }
      //     })
      //     .catch((error) => {
      //       // Hata işleme
      //       Errorful({ message: "Hasta kaydı gerçekleşmedi." });
      //       console.error("Hata:", error);
      //     });
      //   console.log(values);
    },
  });
  return (
    <div>
      <ToastContainer />
      <h1 className=""> {params.id} </h1>
      <div>
        <Row className="justify-content-center m-1">
          {/* <div className="container"> */}
          <Col sm={12} md={12} lg={10} xl={8}>
            <h2>Hasta Kayıt Formu</h2>
            <h6>Hasta Bilgilerinizi Giriniz</h6>
            {/* <form onSubmit={formik.handleSubmit}>  */}
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                formik.handleSubmit();

                return false;
              }}
            >
              <div className="mt-3">
                <label htmlFor="Name">Ad</label>
                <input
                  id="Name"
                  name="Name"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.Name}
                  className="form-control"
                />
              </div>
              <div className="mt-3">
                <label htmlFor="Surname">Soyad</label>
                <input
                  id="Surname"
                  name="Surname"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.Surname}
                  className="form-control"
                />
              </div>
              <div className="mt-3">
                <label htmlFor="TC">TC/Pasaport No</label>
                <input
                  id="TC"
                  name="TC"
                  type="number"
                  onChange={formik.handleChange}
                  value={formik.values.TC}
                  className="form-control"
                />
              </div>
              <div className="mt-3">
                <label htmlFor="PhoneNumber"> Telefon No</label>
                <input
                  id="PhoneNumber"
                  name="PhoneNumber"
                  type="number"
                  onChange={formik.handleChange}
                  value={formik.values.PhoneNumber}
                  className="form-control"
                />
              </div>
              <div className="mt-3">
                <label htmlFor="Email"> Email </label>
                <input
                  id="Email"
                  name="Email"
                  type="Email"
                  onChange={formik.handleChange}
                  value={formik.values.Email}
                  className="form-control"
                />
              </div>
              <div className="mt-3">
                {/* <label htmlFor="Gender">Cinsiyet</label>
              <input
                id="Gender"
                name="Gender"
                type="Gender"
                onChange={formik.handleChange}
                value={formik.values.Gender}
                className="form-control"
              /> */}
                {/* <div className="mt-3">
                  <Label className="form-label">
                    Cinsiyet Seçiniz
                    <span className="text-danger">*</span>
                  </Label>

                  <ReactSelect
                    blurInputOnSelect
                    isSearchable={true}
                    isDisabled={false}
                    isMulti={false}
                    options={Gender}
                    name="Gender"
                    id="Gender"
                    instanceId="Gender"
                    getOptionValue={(item) => item.value}
                    getOptionLabel={(item) => item.label}
                    onChange={(option) => {
                      if (option !== undefined && option !== null) {
                        formik.setFieldValue("Gender", option);
                      }
                    }}
                    placeholder={"cinsiyet seçiniz"}
                    noOptionsMessage={() => "No option"}
                    styles={{
                      container: (baseStyles, state) => ({
                        ...baseStyles,
                        flex: "1",
                      }),
                    }}
                  />
                </div> */}
              </div>
              <div className="mt-3">
                <label htmlFor="BirtdayDate">Dogum Tarihi</label>
                <input
                  id="BirtdayDate"
                  name="BirtdayDate"
                  type="date"
                  onChange={formik.handleChange}
                  value={formik.values.BirtdayDate}
                  className="form-control"
                />
              </div>
              <div className="mt-3">
                <label htmlFor="Diagnosis">Tanı</label>
                <Label className="form-label">
                  Cinsiyet Seçiniz
                  <span className="text-danger">*</span>
                </Label>

                {/* <ReactSelect
                  blurInputOnSelect
                  isSearchable={true}
                  isDisabled={false}
                  isMulti={false}
                  options={diagnosisList}
                  name="Diagnosis"
                  id="Diagnosis"
                  instanceId="Diagnosis"
                  getOptionValue={(item) => item.code}
                  getOptionLabel={(item) => item.description}
                  onChange={(option) => {
                    if (option !== undefined && option !== null) {
                      formik.setFieldValue("Diagnosis", option);
                    }
                  }}
                  placeholder={"tanı seçiniz"}
                  noOptionsMessage={() => "No option"}
                  styles={{
                    container: (baseStyles, state) => ({
                      ...baseStyles,
                      flex: "1",
                    }),
                  }}
                /> */}
              </div>
              {/* <div className="mt-3">
              <label htmlFor="BloodGroup">Kan Grubu</label>
              <input
                id="BloodGroup"
                name="BloodGroup"
                type="BloodGroup"
                onChange={formik.handleChange}
                value={formik.values.BloodGroup}
                className="form-control"
              />
            </div> */}
              <div className="mt-3 mt-3">
                <Label className="form-label">
                  Kan Grubu
                  <span className="text-danger">*</span>
                </Label>

                {/* <ReactSelect
                  blurInputOnSelect
                  isSearchable={true}
                  isDisabled={false}
                  isMulti={false}
                  options={bloodGroup}
                  name="bloodGroup"
                  id="bloodGroup"
                  instanceId="bloodGroup"
                  getOptionValue={(item) => item.value}
                  getOptionLabel={(item) => item.label}
                  onChange={(option) => {
                    if (option !== undefined && option !== null) {
                      formik.setFieldValue("Diagnosis", option);
                    }
                  }}
                  placeholder={"kan grubu seçiniz"}
                  noOptionsMessage={() => "No option"}
                  styles={{
                    container: (baseStyles, state) => ({
                      ...baseStyles,
                      flex: "1",
                    }),
                  }}
                /> */}
              </div>
              <div className="mt-3">
                <label htmlFor="password">Hasta Şifresi</label>
                <input
                  id="password"
                  name="password"
                  // onChange={formik.handleChange}
                  // value={formik.values.BirtdayDate}
                  className="form-control"
                />
              </div>
              {/* <button className="btn btn-danger float-start mt-4" type="submit">
                İptal
              </button> */}
              <button className="btn btn-primary ms-4 mt-4" type="submit">
                Kaydet
              </button>
            </Form>
            {/* </form> */}
          </Col>
          {/* </div> */}
        </Row>
      </div>
    </div>
  );
};

export default page;
