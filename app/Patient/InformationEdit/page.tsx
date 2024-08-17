"use client";
import React from "react";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { PaitientModel } from "@/models/DataModals/PatientList";
import { Errorful, Successful } from "@/toolkit/toaster";
import { Navbar, NavbarBrand, Input, Label, Row, Col, Form } from "reactstrap";
import Table from "react-bootstrap/Table";
import axios from "axios";
import Link from "next/link";
import { isEmptyArray } from "formik";
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
      <div className="container mt-3">
        <h2>Hasta Listesi</h2>
        <Table className="table table-hover " bordered hover responsive>
          <thead>
            <tr>
              <th>Ad Soyad</th>
              <th>Telefon</th>
              <th>Email</th>
              <th>Yaş</th>
              <th>Hastalık Türü</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {patientList.map((item, index) => {
              return (
                <tr>
                  <td>{item.firstName}</td>
                  <td>{item.mobilePhone}</td>
                  <td>{item.email}</td>
                  <td>{item.gender}</td>
                  <td>{item.id}</td>

                  <Link
                    href={`/Patient/InformationEdit/${item.id}`}
                    className="btn btn-secondary "
                    style={{
                      backgroundColor: "#0d6efd;",
                      background: "#0d6efd;",
                    }}
                  >
                    DÜZENLE
                  </Link>
                  {/* <td>{item.blood}</td> */}
                </tr>
              );
            })}
          </tbody>
        </Table>
        <Link href={"/"} className="btn btn-danger  ms-4 mt-4" type="reset">
          iptal
        </Link>
        {/* <button type="submit" className="btn btn-primary">
          DÜZENLE
        </button> */}
      </div>
    </div>

    // <div>
    //   <ToastContainer />
    //   <Row className="justify-content-center m-1  ">
    //     <Col sm={10} md={10} lg={10} xl={10}>
    //       {/* <div className="container">
    //     <div className="container mt-3"> */}

    //       <h2>Hasta Listesi</h2>
    //       <Table striped bordered hover responsive>
    //         {/* <Table className="table table-bordered table-striped"> */}
    //         <thead>
    //           <tr>
    //             <th>Ad Soyad</th>
    //             <th>Telefon</th>
    //             <th>Email</th>
    //             <th>Yaş</th>
    //             {/* <th>Hastalık Türü</th> */}
    //           </tr>
    //         </thead>
    //         <tbody style={{ display: "" }}>
    //           {/* mapping */}
    //           {patientList.map((item, index) => {
    //             return (
    //               <tr>
    //                 <td>{item.firstName}</td>
    //                 <td>{item.mobilePhone}</td>
    //                 <td>{item.email}</td>
    //                 <td>{item.gender}</td>
    //                 <td>{item.ad}</td>
    //                 <button type="submit" className="btn btn-secondary" style={{backgroundColor:"blue"}}>
    //                   İPTAL
    //                 </button>
    //                 {/* <td>{item.blood}</td> */}
    //               </tr>
    //             );
    //           })}

    //           {/* <tr>
    //             <td>PatientList</td>
    //             <td>05316201509</td>
    //             <td>fatihpir@example.com</td>
    //             <td>11</td>
    //             <td>Ailesel Akdeniz Ateşi</td>
    //           </tr>
    //           <tr>
    //             <td>Fatih Pir</td>
    //             <td>05316201509</td>
    //             <td>fatihpir@example.com</td>
    //             <td>11</td>
    //             <td>Ailesel Akdeniz Ateşi</td>
    //           </tr>
    //           <tr>
    //             <td>Fatih Pir</td>
    //             <td>05316201509</td>
    //             <td>fatihpir@example.com</td>
    //             <td>11</td>
    //             <td>Ailesel Akdeniz Ateşi</td>
    //           </tr>
    //           <tr>
    //             <td>Fatih Pir</td>
    //             <td>05316201509</td>
    //             <td>fatihpir@example.com</td>
    //             <td>11</td>
    //             <td>Ailesel Akdeniz Ateşi</td>
    //           </tr> */}
    //         </tbody>
    //       </Table>
    //     </Col>
    //     <Col sm={2} md={2} lg={2} xl={2}>
    //       {patientList.map((item, index) => {
    //         return (
    //           <div style={{display:"flex"}}>
    //             <button type="submit" className="btn btn-danger m-1 ">
    //               İPTAL ET
    //             </button>
    //             <button type="submit" className="btn btn-primary  m-1">
    //               Düzenle
    //             </button>
    //           </div>
    //         );
    //       })}
    //     </Col>
    //   </Row>
    //   {/* </div>
    //   </div> */}
    // </div>
  );
}

export default page;
