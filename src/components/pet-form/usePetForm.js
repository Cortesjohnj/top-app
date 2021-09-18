import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { createAdoption } from "../../store/actionCreators";

const usePetForm = (submitForm, validateInfo) => {
  const { id: petId } = useParams();

  const error = useSelector((state) => state.error);

  const dispatch = useDispatch();

  const [values, setValues] = useState({
    address: "",
    PhoneNumber: "",
    description: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
      petId: petId,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validateInfo(values));
    setIsSubmitting(true);
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      submitForm(values);
    }
  }, [submitForm, errors, isSubmitting, values]);

  return { handleChange, values, handleSubmit, errors };
};

export default usePetForm;
