import React from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CFormGroup,
  CInvalidFeedback,
  CInput,
  CLabel,
  CRow,
  CInputGroupAppend,
  CInputGroupText,
  CTextarea,
  CInputGroup,
} from "@coreui/react";

import { cilChevronLeft ,cilArrowLeft} from "@coreui/icons";

import CIcon from "@coreui/icons-react";
import { Formik } from "formik";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";

import { useHistory } from "react-router";
const PricingComponent = ({
  data,
  handleFormData,
  customSubmit=false,
  noCard = false,
  hideExtraFields=false,
  handleBack = () => {},
}) => {
  let schema = yup.object().shape({
    price: yup.string().required("Price is a required field").min(0),
    deposit: yup.string().required("Deposit is a required field").min(0),
    deposit_percentage: yup.number("Deposit Percentage has to be number").max(100).min(0),
  });
  const history = useHistory();
  function addCommas(str) {
    return str
      .replace(/^0+/, "")
      .replace(/\D/g, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  function removeCommas(str) {
    return str.replaceAll(",", "");
  }
  let Form = (
    <>
      {" "}
      <CCardHeader>
        <strong>Pricing</strong>
        {/* <small> Form</small> */}
      </CCardHeader>
      <Formik
        initialValues={data.form3}
        validationSchema={schema}
        onSubmit={(values) => {
         if(customSubmit){
          customSubmit(values)
         }else{
          handleFormData(values, 3);
          toast.success(
            noCard ? "The File is Edited Successfully" : "The file is Added! ",
            {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            }
          );
          setTimeout(() => {
            history.push("/files");
          }, 1000);
        }
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
                <CLabel htmlFor="company">Unit Price </CLabel>
                <CInput
                  invalid={touched["price"] && errors["price"]}
                  name="price"
                  onChange={(e) => {
                    if (
                      values["deposit"] !== "" ||
                      values["deposit_percentage"] !== ""
                    ) {
                      setFieldValue("deposit", "");
                      setFieldValue("deposit_percentage", "");
                    }

                    setFieldValue("price", addCommas(e.target.value));
                    // handleChange(e);
                  }}
                  value={values["price"]}
                  placeholder="123457"
                />
                {touched["price"] && errors["price"] && (
                  <CInvalidFeedback>{errors["price"]}</CInvalidFeedback>
                )}
              </CFormGroup>
                <CLabel htmlFor="vat">Minimum deposit </CLabel>
                <CRow>
                  <CCol>
                    <CInput
                      invalid={touched["deposit"] && errors["deposit"]}
                      onChange={(e) => {
                        if (values["price"] !== "") {
                          let val = removeCommas(e.target.value);
                          let perc =
                            (val * 100) / removeCommas(values["price"]);
                          if (!Number.isInteger(perc)) {
                            perc = parseFloat(perc).toFixed(2);
                          }
                          setFieldValue("deposit_percentage", perc);
                        }
                        setFieldValue("deposit", addCommas(e.target.value));
                      }}
                      value={values["deposit"]}
                      name="deposit"
                      placeholder="Deposit"
                    />
                    {touched["deposit"] && errors["deposit"] && (
                      <CInvalidFeedback>{errors["deposit"]}</CInvalidFeedback>
                    )}
                  </CCol>
                  <CCol>
                    <CInputGroup>
                      <CInput
                        invalid={
                          touched["deposit_percentage"] &&
                          errors["deposit_percentage"]
                        }
                        onChange={(e) => {
                          if (e.target.value < 101) {
                            if (values["price"] !== "") {
                              let perc =
                                (e.target.value / 100) *
                                removeCommas(values["price"]);
                              setFieldValue("deposit", addCommas(perc + ""));
                            }
                            handleChange(e);
                          }
                        }}
                        value={values["deposit_percentage"]}
                        name="deposit_percentage"
                        placeholder="Percentage"
                      />
                      <CInputGroupAppend>
                        <CInputGroupText>%</CInputGroupText>
                      </CInputGroupAppend>
                      {touched["deposit_percentage"] &&
                        errors["deposit_percentage"] && (
                          <CInvalidFeedback>
                            {errors["deposit_percentage"]}
                          </CInvalidFeedback>
                        )}
                    </CInputGroup>
                  </CCol>
                 
                {!hideExtraFields&&<>
                  <CCol xs='12'>
                 <CFormGroup>
                <br/>
                <CLabel htmlFor="company">Total Price </CLabel>
                <CInput
                  invalid={touched["total_price"] && errors["total_price"]}
                  name="total_price"
                  onChange={(e) => {
                    if (
                      values["deposit"] !== "" ||
                      values["discount_percentage"] !== ""
                    ) {
                      setFieldValue("deposit", "");
                      setFieldValue("discount_percentage", "");
                    }

                    setFieldValue("total_price", addCommas(e.target.value));
                    // handleChange(e);
                  }}
                  value={values["total_price"]}
                  placeholder="123457"
                />
                {touched["total_price"] && errors["total_price"] && (
                  <CInvalidFeedback>{errors["total_price"]}</CInvalidFeedback>
                )}
              </CFormGroup>
                 </CCol>
                 <CCol >
                 <CFormGroup>
                 <CLabel htmlFor="vat">Total discount on deposit</CLabel>
                    <CInput
                      invalid={touched["discount"] && errors["discount"]}
                      onChange={(e) => {
                        if (values["total_price"] !== "") {
                          let val = removeCommas(e.target.value);
                          let perc =
                            (val * 100) / removeCommas(values["total_price"]);
                          if (!Number.isInteger(perc)) {
                            perc = parseFloat(perc).toFixed(2);
                          }
                          // 23 % 1 = 0
                          // 23.5 % 1 = 0.5
                          // if (perc > 100) {
                          //   perc = 100;
                          // }
                          setFieldValue("discount", perc);
                        }
                        setFieldValue("discount", addCommas(e.target.value));
                      }}
                      value={values["discount"]}
                      name="discount"
                      placeholder="discount"
                    />
                    {touched["discount"] && errors["discount"] && (
                      <CInvalidFeedback>{errors["discount"]}</CInvalidFeedback>
                    )}
                    
                  </CFormGroup>
                  </CCol>
                  
                  <CCol>
                    <CLabel style={{marginBottom:'24px'}}></CLabel>
                    <CInputGroup>
                      <CInput
                        invalid={
                          touched["discount_percentage"] &&
                          errors["discount_percentage"]
                        }
                        onChange={(e) => {
                          if (e.target.value < 101) {
                            if (values["total_price"] !== "") {
                              let perc =
                                (e.target.value / 100) *
                                removeCommas(values["total_price"]);
                              setFieldValue("discount", addCommas(perc + ""));
                            }
                            handleChange(e);
                          }
                        }}
                        value={values["discount_percentage"]}
                        name="discount_percentage"
                        placeholder="Percentage"
                      />
                      <CInputGroupAppend>
                        <CInputGroupText>%</CInputGroupText>
                      </CInputGroupAppend>
                      {touched["discount_percentage"] &&
                        errors["discount_percentage"] && (
                          <CInvalidFeedback>
                            {errors["discount_percentage"]}
                          </CInvalidFeedback>
                        )}
                    </CInputGroup>
                  </CCol>
                  <CCol xs="12">
                  <CFormGroup>
                 <CLabel htmlFor="vat">Total Payable</CLabel>
                    <CInput
                      onChange={(e) => {
                        
                        setFieldValue("payable", e.target.value);
                      }}
                      value={values["payable"]}
                      name="payable"
                      placeholder="payable"
                    />
                    {touched["payable"] && errors["payable"] && (
                      <CInvalidFeedback>{errors["payable"]}</CInvalidFeedback>
                    )}
                    
                  </CFormGroup>
                  </CCol>
                  
                </>}
                  <CCol xs="12">
                    <br/>
                    <CFormGroup>
                    <CLabel htmlFor="textarea-input">Notes/Comments</CLabel>
                    <CTextarea 
                      onChange={handleChange}
                      name="note" 
                      id="textarea-input" 
                      rows="4"
                      name='note'
                      placeholder="Content..." 
                    />
                    </CFormGroup>
                  </CCol>
                  </CRow>
                  <br/>

            
            </CCardBody>
            <CCardFooter>
              <CButton type="submit" className="button-color">
                Submit
              </CButton>
              {noCard && (
                <CButton
                  onClick={handleBack}
                  color="secondary"
                  style={{
                    padding: "6px",
                    paddingRight: "10px",
                    paddingLeft: "10px",
                  }}
                  className="cancel-button-color"
                >
                  <CIcon style={{marginTop:'0px',marginRight:'6px'}} content={cilArrowLeft} width={16} />
                  Back
                </CButton>
              )}
            </CCardFooter>
          </form>
        )}
      </Formik>
    </>
  );

  const cardWrapper = (children, hideCard = false) =>
    hideCard ? (
      children
    ) : (
      <CCard className="m-4 p-4" className="form-shadow">
        {children}
      </CCard>
    );
  return (
    <>
      <CCol xs="12" sm={noCard ? 12 : 6}>
        {cardWrapper(Form, noCard)}
      </CCol>
    </>
  );
};

export default PricingComponent;
