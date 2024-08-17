"use client";
import * as Yup from "yup";
import React from "react";
import { useFormik } from "formik";
import { Navbar, NavbarBrand, Input, Label, Row, Col, Form } from "reactstrap";
import { useEffect, useState } from "react";
import { Successful, Errorful } from "@/toolkit/toaster";
import { ToastContainer } from "react-toastify";
import { Medicine } from "@/models/DataModals/Medicine";
import ReactSelect from "react-select";
import { DiagnosisPost } from "@/models/DataModals/DiagnosisPost";
import axios from "axios";
import Link from "next/link";

function page() {
  const [diagnosisList, setDiagnosisList] = useState<DiagnosisPost[]>([]);
  const medicine_record: Medicine = {
    diseasesId: "",
    name: "",
    description: "",
    tablets: "",
  };

  useEffect(() => {
    axios
      .get("http://138.68.101.228:8080/api/kouhealth/v1/diseases/all", {})
      .then((response) => {
        console.log(response);
        setDiagnosisList(response.data);
      });
  }, []);

  const formik = useFormik({
    initialValues: medicine_record,
    // validationSchema: patient_record_Validation,
    onSubmit: async (values) => {
      console.log(values);
      axios
        .post(
          "http://138.68.101.228:8080/api/kouhealth/v1/medicine/add",
          {
            diseasesId: values.diseasesId,
            name: values.name,
            description: values.description,
            tablets: values.tablets,
          },
          {}
        )
        .then((response) => {
          // Başarılı yanıt işleme

          console.log(response);
          if (response.status == 201) {
            Successful({ message: "İlaç Kaydınız Gerçekleşmiştir" });
          } else {
            Errorful({ message: "İlaç kaydı gerçekleşmedi." });
          }
        })
        .catch((error) => {
          // Hata işleme
          Errorful({ message: "İlaç kaydı gerçekleşmedi." });

          console.error("Hata:", error);
        });
    },
  });
  return (
    <main>
      <ToastContainer />
      <div>
        <Row className="justify-content-center m-1">
          {/* <div className="container"> */}
          <Col sm={12} md={12} lg={10} xl={8}>
            <h2>İlaç Ekleme Formu</h2>
            <h6>İlaç Bilgilerini Giriniz</h6>
            {/* <form onSubmit={formik.handleSubmit}>  */}
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                formik.handleSubmit();

                return false;
              }}
            >
              <div className="mt-3">
                <Label className="form-label">Tanı</Label>

                <ReactSelect
                  blurInputOnSelect
                  isSearchable={true}
                  isDisabled={false}
                  isMulti={false}
                  options={diagnosisList}
                  name="diseasesId"
                  id="diseasesId"
                  instanceId="diseasesId"
                  getOptionValue={(item) => item.code}
                  getOptionLabel={(item) => item.code + " " + item.description}
                  onChange={(option) => {
                    if (option !== undefined && option !== null) {
                      formik.setFieldValue("diseasesId", option.code);
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
                />
              </div>
              {/* <div className="mt-3">
                <label htmlFor="diseasesId">İlaç İd</label>
                <input
                  id="diseasesId"
                  name="diseasesId"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.diseasesId}
                  className="form-control"
                />
              </div> */}
              <div className="mt-3">
                <label htmlFor="name">İlaç Adı</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  className="form-control"
                />
              </div>
              <div className="mt-3">
                <label htmlFor="description"> İlaç Açıklaması</label>
                <input
                  id="description"
                  name="description"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.description}
                  className="form-control"
                />
              </div>
              <div className="mt-3">
                <label htmlFor="tablets"> Tablet Sayısı</label>
                <input
                  id="tablets"
                  name="tablets"
                  type="number"
                  onChange={formik.handleChange}
                  value={formik.values.tablets}
                  className="form-control"
                />
              </div>
              <Link
                href={"/"}
                className="btn btn-danger  ms-4 mt-4"
                type="reset"
              >
                İPTAL
              </Link>
              <button className="btn btn-primary ms-4 mt-4" type="submit">
                Kaydet
              </button>
            </Form>
            {/* </form> */}
          </Col>
          {/* </div> */}
        </Row>
      </div>
    </main>
  );
}

export default page;
