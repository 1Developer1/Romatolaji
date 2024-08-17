"use client";
import * as Yup from "yup";
import React from "react";
import { useFormik } from "formik";
import { Navbar, NavbarBrand, Input, Label, Row, Col, Form } from "reactstrap";
import { useEffect, useState } from "react";
import { Successful, Errorful } from "@/toolkit/toaster";
import { ToastContainer } from "react-toastify";
import { PatientRecord } from "@/models/DataModals/PatientRecordModal";
import { DiagnosisList } from "@/models/DataModals/DiagnosisList";
import ReactSelect from "react-select";
import axios from "axios";
import Link from "next/link";

function page() {
  const diagnosis_record: DiagnosisList = {
    code: "",
    description: "",
  };
  const formik = useFormik({
    initialValues: diagnosis_record,
    // validationSchema: patient_record_Validation,
    onSubmit: async (values) => {
      axios
        .post(
          "http://138.68.101.228:8080/api/kouhealth/v1/diseases/add",
          {
            code: values.code,
            description: values.description,
          },
          {}
        )
        .then((response) => {
          // Başarılı yanıt işleme

          console.log(response);
          if (response.status == 201) {
            Successful({ message: "Hastalık Kaydınız Gerçekleşmiştir" });
          } else {
            Errorful({ message: "Hastalık kaydı gerçekleşmedi." });
          }
        })
        .catch((error) => {
          // Hata işleme
          Errorful({ message: "Hastalık kaydı gerçekleşmedi." });

          console.error("Hata:", error);
        });

      console.log(values);
    },
  });
  return (
    <main>
      <ToastContainer />
      <div>
        <Row className="justify-content-center m-1">
          {/* <div className="container"> */}
          <Col sm={12} md={12} lg={10} xl={8}>
            <h2>Hastalık Ekleme Formu</h2>
            <h6>Hastalık Bilgilerini Giriniz</h6>
            {/* <form onSubmit={formik.handleSubmit}>  */}
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                formik.handleSubmit();

                return false;
              }}
            >
              <div className="mt-3">
                <label htmlFor="code"> Hastalık Codu</label>
                <input
                  id="code"
                  name="code"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.code}
                  className="form-control"
                />
              </div>
              <div className="mt-3">
                <label htmlFor="description">Hastalık Açıklaması</label>
                <input
                  id="description"
                  name="description"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.description}
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
