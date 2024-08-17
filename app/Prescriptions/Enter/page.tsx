"use client";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import React from "react";
import Table from "react-bootstrap/Table";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Navbar, NavbarBrand, Input, Label, Row, Col, Form } from "reactstrap";
import { Successful, Errorful } from "@/toolkit/toaster";
import ReactSelect from "react-select";
import { DiagnosisPost } from "@/models/DataModals/DiagnosisPost";
import { PaitientModel } from "@/models/DataModals/PatientList";
import { MedicinePost } from "@/models/DataModals/MedicinePost";
import { Prescription } from "@/models/DataModals/Prescriptions";
import axios from "axios";
import Link from "next/link";
function page() {
  const [patientList, setPatientList] = useState<PaitientModel[]>([]);
  const [DiagnosisList, setDiagnosisList] = useState<DiagnosisPost[]>([]);
  const [MedicineNameList, setMedicineNameList] = useState<MedicinePost[]>([]);
  const [Period, setPeriod] = useState([
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
    { value: "6", label: "6" },
    { value: "7", label: "7" },
    { value: "8", label: "8" },
    { value: "9", label: "9" },
    { value: "10", label: "10" },
  ]);
  const [usedPeriod, setusedPeriod] = useState([
    { value: "Gün", label: "Gün" },
    { value: "Hafta", label: "Hafta" },
    { value: "Ay", label: "Ay" },
    { value: "Yıl", label: "Yıl" },
  ]);
  const [NewRecord, setNewRecord] = useState("d-none");
  const prescription_record: Prescription = {
    patientId: "",
    diseasesId: "",
    medicineId: "",
    medicineName: "",
    xday: "",
    xdose: "",
    period: "",
    xperiod: "",
    box: "",
    tablets: "",
    startDate: "",
    startHour: "",
    endDate: "",
    description: "",
    status: "",
  };

  const formik = useFormik({
    initialValues: prescription_record,
    onSubmit: (values) => {
      console.log(values);
      axios
        .post(
          "http://138.68.101.228:8080/api/kouhealth/v1/prescription/add",
          values,
          {}
        )
        .then((response) => {
          console.log(response);
          if (response.status == 201) {
            Successful({ message: "Reçete  Kaydınız Gerçekleşmiştir" });
          } else {
            Errorful({ message: "Reçete  kaydı gerçekleşmedi." });
          }
        });
    },

    //enableReinitialize: true,
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
      .get("http://138.68.101.228:8080/api/kouhealth/v1/diseases/all", {})
      .then((response) => {
        console.log(response.data);
        setDiagnosisList(response.data);
      });
  }, []);

  const MedicineListByDiseases = (diasesID: any) => {
    axios
      .get(
        `http://138.68.101.228:8080/api/kouhealth/v1/medicine/byDiseasesId?diseasesId=${diasesID}`,
        {}
      )
      .then((response) => {
        console.log(response.data);
        setMedicineNameList(response.data);
      });
  };

  return (
    <>
      <div>
        <ToastContainer />
        <div className="container">
          <h2>Hasta Reçete Giriş Formu</h2>
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
                      //   SelectedPatient(option);
                      formik.setFieldValue("patientId", option.id);
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

            <div className="mt-3">
              <Label className="form-label">
                Tanı <span className="text-danger">*</span>
              </Label>
              <ReactSelect
                blurInputOnSelect
                isSearchable={true}
                isDisabled={false}
                isMulti={false}
                options={DiagnosisList}
                name="diseasesId"
                id="diseasesId"
                instanceId="diseasesId"
                getOptionValue={(item) => item.id}
                getOptionLabel={(item) => item.description}
                onChange={(option) => {
                  if (option !== undefined && option !== null) {
                    MedicineListByDiseases(option.code);
                    formik.setFieldValue("diseasesId", option.id);
                  }
                }}
                placeholder={"Tanı"}
                noOptionsMessage={() => "No option"}
                styles={{
                  container: (baseStyles, state) => ({
                    ...baseStyles,
                    flex: "1",
                  }),
                }}
              />
            </div>
            <div className="mt-3">
              <Label className="form-label">
                İlaç Adı
                <span className="text-danger">*</span>
              </Label>
              <ReactSelect
                blurInputOnSelect
                isSearchable={true}
                isDisabled={false}
                isMulti={false}
                options={MedicineNameList}
                name="medicineId"
                id="medicineId"
                instanceId="medicineId"
                getOptionValue={(item) => item.id}
                getOptionLabel={(item) => item.name}
                onChange={(option) => {
                  if (option !== undefined && option !== null) {
                    formik.setFieldValue("medicineId", option.id);
                    formik.setFieldValue("medicineName", option.name);
                  }
                }}
                placeholder={"İlaç Adı"}
                noOptionsMessage={() => "No option"}
                styles={{
                  container: (baseStyles, state) => ({
                    ...baseStyles,
                    flex: "1",
                  }),
                }}
              />
            </div>
            <div className="mt-3">
              <Label className="form-label">
                Günde Kaç Kez <span className="text-danger">*</span>
              </Label>
              <ReactSelect
                blurInputOnSelect
                isSearchable={true}
                isDisabled={false}
                isMulti={false}
                options={Period}
                name="xday"
                id="xday"
                instanceId="xday"
                getOptionValue={(item) => item.value}
                getOptionLabel={(item) => item.label}
                onChange={(option) => {
                  if (option !== undefined && option !== null) {
                    // SelectedPatient(option);
                    formik.setFieldValue("xday", option.value);
                  }
                }}
                placeholder={"Günde Kaç Kez"}
                noOptionsMessage={() => "No option"}
                styles={{
                  container: (baseStyles, state) => ({
                    ...baseStyles,
                    flex: "1",
                  }),
                }}
              />
            </div>
            <div className="mt-3">
              <Label className="form-label">
                Bir Seferde Kaç Adet <span className="text-danger">*</span>
              </Label>
              <ReactSelect
                blurInputOnSelect
                isSearchable={true}
                isDisabled={false}
                isMulti={false}
                options={Period}
                name="xdose"
                id="xdose"
                instanceId="xdose"
                getOptionValue={(item) => item.value}
                getOptionLabel={(item) => item.label}
                onChange={(option) => {
                  if (option !== undefined && option !== null) {
                    formik.setFieldValue("xdose", option.value);
                  }
                }}
                placeholder={"Bir Seferde Kaç Adet"}
                noOptionsMessage={() => "No option"}
                styles={{
                  container: (baseStyles, state) => ({
                    ...baseStyles,
                    flex: "1",
                  }),
                }}
              />
            </div>
            <div className="mt-3">
              <Label className="form-label">
                Kullanım Periyodu
                <span className="text-danger">*</span>
              </Label>

              <ReactSelect
                blurInputOnSelect
                isSearchable={true}
                isDisabled={false}
                isMulti={false}
                options={usedPeriod}
                name="period"
                id="period"
                instanceId="period"
                getOptionValue={(item) => item.value}
                getOptionLabel={(item) => item.label}
                onChange={(option) => {
                  if (option !== undefined && option !== null) {
                    formik.setFieldValue("period", option.value);
                  }
                }}
                placeholder={"Kullanım Periyodu"}
                noOptionsMessage={() => "No option"}
                styles={{
                  container: (baseStyles, state) => ({
                    ...baseStyles,
                    flex: "1",
                  }),
                }}
              />
            </div>
            <div className="mt-3">
              <Label className="form-label">
                Kullanım Periyodu Zaman Aralığı
                <span className="text-danger">*</span>
              </Label>
              <ReactSelect
                blurInputOnSelect
                isSearchable={true}
                isDisabled={false}
                isMulti={false}
                options={Period}
                name="xperiod"
                id="xperiod"
                instanceId="xperiod"
                getOptionValue={(item) => item.value}
                getOptionLabel={(item) => item.label}
                onChange={(option) => {
                  if (option !== undefined && option !== null) {
                    // SelectedPatient(option);
                    console.log(option.value);
                    formik.setFieldValue("xperiod", option.value);
                  }
                }}
                placeholder={"  Kullanım Periyodu Zaman Aralığı"}
                noOptionsMessage={() => "No option"}
                styles={{
                  container: (baseStyles, state) => ({
                    ...baseStyles,
                    flex: "1",
                  }),
                }}
              />
            </div>
            <div className="mt-3">
              <Label className="form-label">
                Kutu
                <span className="text-danger">*</span>
              </Label>
              <input
                name="box"
                type="box"
                onChange={formik.handleChange}
                value={formik.values.box}
                className="form-control"
              />
            </div>
            <div className="mt-3">
              <Label className="form-label">
                Adet
                <span className="text-danger">*</span>
              </Label>
              <input
                id="tablets"
                name="tablets"
                type="tablets"
                onChange={formik.handleChange}
                value={formik.values.tablets}
                className="form-control"
              />
            </div>
            <div className="mt-3">
              <Label className="form-label">
                Başlangıç Tarihi
                <span className="text-danger">*</span>
              </Label>
              <input
                id="startDate"
                name="startDate"
                type="date"
                onChange={formik.handleChange}
                value={formik.values.startDate}
                className="form-control"
              />
            </div>
            <div className="mt-3">
              <Label className="form-label">
                Başlangıç Saati
                <span className="text-danger">*</span>
              </Label>

              <input
                id="startHour"
                name="startHour"
                type="time"
                onChange={formik.handleChange}
                value={formik.values.startHour}
                className="form-control"
              />
            </div>
            <div className="mt-3">
              <Label className="form-label">
                Bitiş Tarihi
                <span className="text-danger">*</span>
              </Label>
              <input
                id="endDate"
                name="endDate"
                type="date"
                onChange={formik.handleChange}
                value={formik.values.endDate}
                className="form-control"
              />
            </div>
            <Link href={"/"} className="btn btn-danger  ms-4 mt-4" type="reset">
              iptal
            </Link>
            <button className="btn btn-primary  ms-4 mt-4" type="submit">
              Kaydet
            </button>
          </Form>
        </div>
      </div>
    </>
  );
}

export default page;
