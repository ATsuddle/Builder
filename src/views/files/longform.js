import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CFormGroup,
  CInput,
  CLabel,
  CInvalidFeedback,
  CSelect,
  CSwitch,
  CInputRadio,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { Field, Formik } from "formik";
import * as yup from "yup";
function FileLongForm({ data, col = 12, handleFormData = () => {} }) {
  const [receivingSwitch, setReceivingSwitch] = useState(true);
  let schema = yup.object().shape({
    file_name: yup.string().required(),
    security_code: yup.string().required(),
    type: yup.string().required(),
    assignment_date: yup.string().required(),
    received_by: yup.string().required(),
    received_date: yup.string().required(),
    assigned_to: yup.string().required(),
  });

  return (
    <div>
      <CCol xs="12" sm={12}>
        <Formik
          initialValues={{
            file_name: "",
            security_code: "",
            type: "",
            project_name: "",
            assigned_to: "",
            assignment_date: new Date().toISOString().split("T")[0],
            received_by: "",
            received_date: new Date().toISOString().split("T")[0],
            ...data,
          }}
          validationSchema={schema}
          onSubmit={(values) => {
            handleFormData(values, 2);
          }}
        >
          {({
            errors,
            touched,
            handleSubmit,
            handleChange,
            values,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit}>
              <CCardBody>
                <CFormGroup>
                  <CLabel htmlFor="company">
                    File number <span className="sterick-field">*</span>{" "}
                  </CLabel>
                  <CInput
                    invalid={touched["file_name"] && errors["file_name"]}
                    name="file_name"
                    id="company"
                    value={values["file_name"]}
                    onChange={handleChange}
                    placeholder="123457"
                  />

                  {touched["file_name"] && errors["file_name"] && (
                    <CInvalidFeedback>{errors["file_name"]}</CInvalidFeedback>
                  )}
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="vat">
                    Security Code <span className="sterick-field">*</span>{" "}
                  </CLabel>
                  <CInput
                    invalid={
                      touched["security_code"] && errors["security_code"]
                    }
                    value={values["security_code"]}
                    name="security_code"
                    onChange={handleChange}
                    id="vat"
                    placeholder="ABC12345XTZ"
                  />
                  {touched["security_code"] && errors["security_code"] && (
                    <CInvalidFeedback>
                      {errors["security_code"]}
                    </CInvalidFeedback>
                  )}
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="ccmonth">
                    Type <span className="sterick-field">*</span>
                  </CLabel>
                  <CSelect
                    name="type"
                    value={values["type"]}
                    invalid={touched["type"] && errors["type"]}
                    onChange={handleChange}
                    custom
                    name="type"
                    id="ccmonth"
                  >
                    <option value="Enter Type"></option>
                    <option value="5 Marla">5 Marla</option>
                    <option value="10 Marla">10 Marla</option>
                    <option value="15 Marla">15 Marla</option>
                    <option value="20 Marla">20 Marla</option>
                  </CSelect>
                  {touched["type"] && errors["type"] && (
                    <CInvalidFeedback>{errors["type"]}</CInvalidFeedback>
                  )}
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="12">
                    <CLabel>Status</CLabel>
                  </CCol>
                  <CCol md="11">
                    <CFormGroup variant="custom-radio" inline>
                      <CInputRadio
                        custom
                        id="inline-radio1"
                        name="inline-radios"
                        value="option1"
                      />
                      <CLabel variant="custom-checkbox" htmlFor="inline-radio1">
                        Sold
                      </CLabel>
                    </CFormGroup>
                    <CFormGroup variant="custom-radio" inline>
                      <CInputRadio
                        custom
                        color="primary"
                        id="inline-radio2"
                        name="inline-radios"
                        value="option2"
                      />
                      <CLabel variant="custom-checkbox" htmlFor="inline-radio2">
                        Reserved
                      </CLabel>
                    </CFormGroup>
                    <CFormGroup variant="custom-radio" inline>
                      <CInputRadio
                        custom
                        id="inline-radio3"
                        name="inline-radios"
                        value="option3"
                      />
                      <CLabel variant="custom-checkbox" htmlFor="inline-radio3">
                        Available
                      </CLabel>
                    </CFormGroup>
                  </CCol>
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="street">Project Name</CLabel>
                  <CInput
                    onChange={handleChange}
                    name="project_name"
                    value={values["project_name"]}
                    id="street"
                    placeholder="DHA etc.."
                    invalid={
                      touched["project_name"] && errors["tproject_nameype"]
                    }
                  />
                  {touched["project_name"] && errors["project_name"] && (
                    <CInvalidFeedback>
                      {errors["project_name"]}
                    </CInvalidFeedback>
                  )}
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="assigned_to">
                    Assigned To <span className="sterick-field">*</span>
                  </CLabel>
                  <CInput
                    invalid={touched["assigned_to"] && errors["assigned_to"]}
                    id="assigned_to"
                    name="assigned_to"
                    onChange={(e) => {
                      handleChange(e);
                      setFieldValue("received_by", e.target.value);
                    }}
                    value={values["assigned_to"]}
                    placeholder="123457"
                  />
                  {touched["assigned_to"] && errors["assigned_to"] && (
                    <CInvalidFeedback>{errors["assigned_to"]}</CInvalidFeedback>
                  )}
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="vat">Assignment Date </CLabel>
                  <CInput
                    invalid={
                      touched["assignment_date"] && errors["assignment_date"]
                    }
                    value={values["assignment_date"]}
                    name="assignment_date"
                    type="date"
                    id="vat"
                    onChange={handleChange}
                    placeholder="ABC12345XTZ"
                  />
                  {touched["assignment_date"] && errors["assignment_date"] && (
                    <CInvalidFeedback>
                      {errors["assignment_date"]}
                    </CInvalidFeedback>
                  )}
                </CFormGroup>
                <CFormGroup>
                  <CSwitch
                    className={"mx-1"}
                    variant={"3d"}
                    color={"primary"}
                    checked={receivingSwitch}
                    onChange={() => {
                      setReceivingSwitch(!receivingSwitch);
                    }}
                    size={"lg"}
                  />
                  <br />
                  <CLabel>
                    Please uncheck it if you want recieved date and recieving
                    person to be different
                  </CLabel>
                </CFormGroup>
                {!receivingSwitch && (
                  <>
                    <CFormGroup>
                      <CLabel htmlFor="street">
                        Received By <span className="sterick-field">*</span>
                      </CLabel>
                      <CInput
                        id="street"
                        value={values["received_by"]}
                        name="received_by"
                        onChange={handleChange}
                        invalid={
                          touched["received_by"] && errors["received_by"]
                        }
                        placeholder="Enter street name"
                      />
                      {touched["received_by"] && errors["received_by"] && (
                        <CInvalidFeedback>
                          {errors["received_by"]}
                        </CInvalidFeedback>
                      )}
                    </CFormGroup>

                    <CFormGroup>
                      <CLabel htmlFor="vat">
                        Receiving Date <span className="sterick-field">*</span>
                      </CLabel>
                      <CInput
                        invalid={
                          touched["received_date"] && errors["received_date"]
                        }
                        value={values["received_date"]}
                        name="received_date"
                        onChange={handleChange}
                        type="date"
                        id="vat"
                        placeholder="ABC12345XTZ"
                      />
                      {touched["received_date"] && errors["received_date"] && (
                        <CInvalidFeedback>
                          {errors["received_date"]}
                        </CInvalidFeedback>
                      )}
                    </CFormGroup>
                  </>
                )}
              </CCardBody>
            </form>
          )}
        </Formik>
      </CCol>
    </div>
  );
}

FileLongForm.propTypes = {};

export default FileLongForm;
