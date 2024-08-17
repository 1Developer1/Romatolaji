"use client";
import React from "react";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Navbar, NavbarBrand, Input, Label, Row, Col, Form } from "reactstrap";
import { PaitientModel } from "@/models/DataModals/PatientList";
import { PoliclinicPost } from "@/models/DataModals/PoliclinicPost";
import { ToastContainer } from "react-toastify";
import { Successful, Errorful } from "@/toolkit/toaster";
import axios from "axios";
import Link from "next/link";
import ReactSelect from "react-select";
import { Appointment } from "@/models/DataModals/Appointment";
import { AppointmentDetails } from "@/models/DataModals/AppointmentDetails";
function page() {
  const [PatientNameList, setPatientNameList] = useState([]);
  const [patientList, setPatientList] = useState<PaitientModel[]>([]);
  const [DiagnosisList, setDiagnosisList] = useState([]);
  const [PoliclinicNameList, setPoliclinicNameList] = useState<
    PoliclinicPost[]
  >([]);
  const [AppointmentList, setAppointmentList] = useState<AppointmentDetails[]>(
    []
  );
  const [AppointmentList2, setAppointmentList2] = useState<Appointment[]>([]);
  const [DoctorNameList, setDoctorNameList] = useState([]);
  const [Period, setPeriod] = useState([
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
  ]);

  // const patient_record: PatientRecord = {
  //   Name: "",
  //   Surname: "",
  //   TC: "",
  //   PhoneNumber: "",
  //   Email: "",
  //   Gender: "",
  //   BirtdayDate: "",
  //   Diagnosis: "",
  //   BloodGroup: "",
  // };

  const appointment_record: Appointment = {
    patientId: "",
    policlinicId: "",
    appointmentDate: "",
    appointmentHour: "",
    appointmentMinute: "",
    status: "",
    userResponse: "",
    doctorResponse: "",
  };
  const formik = useFormik({
    initialValues: appointment_record,
    onSubmit: (values) => {
      console.log(values);
      axios
        .put(
          `  /setPatientId?patientId=${values.patientId}&id=${values.appointmentHour}`,
          {}
        )
        .then((response) => {
          console.log(response);

          if (response.data == true) {
            Successful({ message: " Randevu Kaydınız Gerçekleşmiştir" });
          } else {
            Errorful({ message: "Randevu kaydı gerçekleşmedi." });
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
      .get("http://138.68.101.228:8080/api/kouhealth/v1/policlinic/all", {})
      .then((response) => {
        console.log(response.data);
        setPoliclinicNameList(response.data);
      })
      .catch((error) => {
        console.error("Hata:", error);
      });

    axios
      .get(
        "http://138.68.101.228:8080/api/kouhealth/v1/appointment/openDateList",
        {}
      )
      .then((response) => {
        console.log(response.data);
        setAppointmentList(response.data);
      });
  }, []);

  const AppointmentHour = (value: any) => {
    axios
      .get(
        `http://138.68.101.228:8080/api/kouhealth/v1/appointment/byPoliclinicIdAppointmentDate?policlinicId=1&status=OPEN&appointmentDate=${value}`,
        {}
      )
      .then((response) => {
        console.log(response.data);
        setAppointmentList2(response.data);
      })
      .catch((error) => {
        console.error("Hata:", error);
      });
  };

  return (
    <div>
      <ToastContainer />
      <div className="container mt-3">
        <h2>Randevu Kayıt Formu</h2>
        <p>Randevu bilgilerini giriniz</p>
        <form onSubmit={formik.handleSubmit}>
          <div className="mt-3">
            <Label className="form-label">
              Hasta seçiniz <span className="text-danger">*</span>
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
          </div>
          <div className="mt-3">
            <Label className="form-label">
              Poliklinik seçiniz
              <span className="text-danger">*</span>
            </Label>
            <ReactSelect
              blurInputOnSelect
              isSearchable={true}
              isDisabled={false}
              isMulti={false}
              options={PoliclinicNameList}
              name="policlinicId"
              id="policlinicId"
              instanceId="policlinicId"
              getOptionValue={(item) => item.id}
              getOptionLabel={(item) => item.policlinicName}
              onChange={(option) => {
                if (option !== undefined && option !== null) {
                  // SelectedPatient(option);
                  formik.setFieldValue("policlinicId", option.id);
                }
              }}
              placeholder={"Polikinlik Seciniz"}
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
              Randevu Günü<span className="text-danger">*</span>
            </Label>
            <ReactSelect
              blurInputOnSelect
              isSearchable={true}
              isDisabled={false}
              isMulti={false}
              options={AppointmentList}
              name="appointmentDate"
              id="appointmentDate"
              instanceId="appointmentDate"
              getOptionValue={(item) => item.date}
              getOptionLabel={(item) => item.date}
              onChange={(option) => {
                if (option !== undefined && option !== null) {
                  // SelectedPatient(option);
                  AppointmentHour(option.date);
                  formik.setFieldValue("appointmentDate", option.date);
                }
              }}
              placeholder={"Tarih Seciniz"}
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
              Saat seçiniz
              <span className="text-danger">*</span>
            </Label>

            <ReactSelect
              blurInputOnSelect
              isSearchable={true}
              isDisabled={false}
              isMulti={false}
              options={AppointmentList2}
              name="appointmentHour"
              id="appointmentHour"
              instanceId="appointmentHour"
              getOptionValue={(item) => item.appointmentHour}
              getOptionLabel={(item) => item.appointmentHour}
              onChange={(option) => {
                if (option !== undefined && option !== null) {
                  formik.setFieldValue("appointmentHour", option.id);
                }
              }}
              placeholder={"Saat Seçiniz"}
              noOptionsMessage={() => "No option"}
              styles={{
                container: (baseStyles, state) => ({
                  ...baseStyles,
                  flex: "1",
                }),
              }}
            />
          </div>

          <Link
            href={"/"}
            className="btn btn-danger float-start  mt-4"
            type="reset"
          >
            İPTAL
          </Link>

          <button className="btn btn-primary  ms-4 mt-4" type="submit">
            Kaydet
          </button>
        </form>
      </div>
    </div>
  );
}

export default page;
