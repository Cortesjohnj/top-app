export default function validateInfo(values) {
  let errors = {};

  if (!values.fullName.trim()) {
    errors.fullName = 'FullName required';
  }

  if (!values.email) {
    errors.email = 'Email required';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email address is invalid';
  }

  if (!values.address) {
    errors.address = 'Address required';
  }

  if (!values.tel) {
    errors.tel = 'Phone number required';
  } else if (
    /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/g.test(values.email)
  ) {
    errors.tel = 'Phone number is invalid';
  }

  return errors;
}
