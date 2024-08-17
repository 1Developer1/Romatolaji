"use client";
import * as Yup from "yup";
import React from "react";
import { useFormik } from "formik";
import { Navbar, NavbarBrand, Input, Label, Row, Col, Form } from "reactstrap";
import { useEffect, useState } from "react";
import { Successful, Errorful } from "@/toolkit/toaster";
import { Policlinic } from "@/models/DataModals/Policlinic";
import { ToastContainer } from "react-toastify";
import ReactSelect from "react-select";
import axios from "axios";
import Link from "next/link";
function page() {
  const policlinic_record: Policlinic = {
    policlinicCode: "",
    policlinicName: "",
    description: "",
  };
  const formik = useFormik({
    initialValues: policlinic_record,
    // validationSchema: patient_record_Validation,
    onSubmit: async (values) => {
      console.log(values);
      axios
        .post(
          "http://138.68.101.228:8080/api/kouhealth/v1/policlinic/add",
          {
            policlinicCode: values.policlinicCode,
            policlinicName: values.policlinicName,
            description: values.description,
          },
          {}
        )
        .then((response) => {
          // Başarılı yanıt işleme

          console.log(response);
          if (response.status == 201) {
            Successful({ message: "Polikinlik Kaydınız Gerçekleşmiştir" });
          } else {
            Errorful({ message: "Polikinlik kaydı gerçekleşmedi." });
          }
        })
        .catch((error) => {
          // Hata işleme
          Errorful({ message: "Polikinlik kaydı gerçekleşmedi." });

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
            <h2>Polikinlik Ekleme Formu</h2>
            <h6>Polikinlik Bilgilerini Giriniz</h6>
            {/* <form onSubmit={formik.handleSubmit}>  */}
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                formik.handleSubmit();

                return false;
              }}
            >
              <div className="mt-3">
                <label htmlFor="policlinicCode">Polikinlik Code </label>
                <input
                  id="policlinicCode"
                  name="policlinicCode"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.policlinicCode}
                  className="form-control"
                />
              </div>
              <div className="mt-3">
                <label htmlFor="policlinicName">Polikinlik Adı</label>
                <input
                  id="policlinicName"
                  name="policlinicName"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.policlinicName}
                  className="form-control"
                />
              </div>
              <div className="mt-3">
                <label htmlFor="description"> Açıklaması</label>
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
