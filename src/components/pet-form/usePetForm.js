import { useState, useEffect } from 'react';

const usePetForm = (submitForm, validateInfo) => {
  const [values, setValues] = useState({
    address: '',
    tel: '',
    description: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validateInfo(values));

    setIsSubmitting(true);
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      submitForm();
    }
  }, [submitForm, errors, isSubmitting]);

  return { handleChange, values, handleSubmit, errors };
};

export default usePetForm;
