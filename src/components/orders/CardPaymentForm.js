import {MDBCard,
    MDBCardBody,
    MDBCol,
    MDBContainer,
    MDBInput,
    MDBRow,} from "mdb-react-ui-kit";
import React from "react";
import getMessage from "../../common/LanguageVersionMessageFinder";

export default function CardPaymentForm({languageVersion}) {
    return <MDBContainer fluid className="py-5">
        <MDBRow className="d-flex justify-content-center">
            <MDBCol md="9" lg="7" xl="5">
                <MDBCard>
                    <div className="rounded-bottom">
                        <MDBCardBody>
                            {" "}
                            <p className="mb-4">{getMessage(languageVersion, "details", LABELS)}</p>
                            <MDBInput
                                label={getMessage(languageVersion, "cardNumber", LABELS)}
                                id="form1"
                                type="text"
                                placeholder="1234 5678 1234 5678"
                                wrapperClass="mb-3"
                                className="bg-violet-50"
                            />
                            <MDBRow className="mb-3">
                                <MDBCol size="6">
                                    <MDBInput
                                        label={getMessage(languageVersion, "expire", LABELS)}
                                        id="form2"
                                        type="password"
                                        placeholder="MM/YYYY"
                                        wrapperClass="mb-3"
                                        className="bg-violet-50"
                                    />
                                </MDBCol>
                                <MDBCol size="6">
                                    <MDBInput
                                        label="CVV"
                                        id="form4"
                                        type="password"
                                        placeholder="CVV"
                                        wrapperClass="mb-3"
                                        className="bg-violet-50"
                                    />
                                </MDBCol>
                            </MDBRow>
                        </MDBCardBody>
                    </div>
                </MDBCard>
            </MDBCol>
        </MDBRow>
    </MDBContainer>
}

const LABELS = [
    {
        "name" : "details",
        "values": [
            {
                "language" : "english",
                "value": "Your payment details"
            },
            {
                "language" : "polish",
                "value": "Szczegóły płatności"
            }
        ]
    },
    {
        "name" : "cardNumber",
        "values": [
            {
                "language" : "english",
                "value": "Card number"
            },
            {
                "language" : "polish",
                "value": "Numer karty"
            }
        ]
    },
    {
        "name" : "expire",
        "values": [
            {
                "language" : "english",
                "value": "Expire"
            },
            {
                "language" : "polish",
                "value": "Data ważności"
            }
        ]
    },
    {
        "name" : "postCode",
        "values": [
            {
                "language" : "english",
                "value": "postal code"
            },
            {
                "language" : "polish",
                "value": "kod pocztowy"
            }
        ]
    },
    {
        "name" : "confirmPassword",
        "values": [
            {
                "language" : "english",
                "value": "Confirm password"
            },
            {
                "language" : "polish",
                "value": "Potwierdź hasło"
            }
        ]
    },
    {
        "name" : "checkout",
        "values": [
            {
                "language" : "english",
                "value": "Checkout"
            },
            {
                "language" : "polish",
                "value": "Złóż zamówienie"
            }
        ]
    },
    {
        "name" : "agreement",
        "values": [
            {
                "language" : "english",
                "value": "By checking out, you agree to the "
            },
            {
                "language" : "polish",
                "value": "Składając zamówienie się zgadzasz się z "
            }
        ]
    },
    {
        "name" : "termsOfService",
        "values": [
            {
                "language" : "english",
                "value": "Terms of Service"
            },
            {
                "language" : "polish",
                "value": "Regulaminem"
            }
        ]
    }

]