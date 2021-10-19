export default function validateInfo(values) {
  let errors = {};

  if (!values.idNumber?.trim()) {
    errors.idNumber = "Identification number required";
  }

  if (!values.cardNumber) {
    errors.cardNumber = "Credit Card number required";
  }

  if (!values.expMonth || !values.expYear) {
    errors.expDate = "Expiration date required";
  }

  if (!values.cvc) {
    errors.cvc = "CVC code required";
  }

  if (!values.amount) {
    errors.amount = "Donation amount required";
  }

  if (!values.dues) {
    errors.dues = "dues are required";
  } else if (values.dues > 12 || values.dues < 1) {
    errors.dues = "invalid dues number";
  }
  return errors;
}
