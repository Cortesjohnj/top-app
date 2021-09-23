export default function validateInfo(values) {
  let errors = {};

  if (!values.description.trim()) {
    errors.description = "Description required";
  }

  if (!values.address) {
    errors.address = "Address required";
  }

  if (!values.phoneNumber) {
    errors.phoneNumber = "Phone number required";
  } else if (
    !RegExp(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/).test(
      values.phoneNumber
    )
  ) {
    errors.phoneNumber = "Phone number is invalid";
  }

  return errors;
}
