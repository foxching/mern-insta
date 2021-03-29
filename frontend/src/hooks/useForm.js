import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { clearErrors } from "../redux/actions/errorActions";

export const useForm = (callback, initialState = {}) => {
  const dispatch = useDispatch();
  const { isAuthenticated, isLoading } = useSelector(state => state.auth);
  const { loading } = useSelector(state => state.ui);
  const [values, setValues] = useState(initialState);

  const onChange = event => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    callback();
  };

  //cleanup ui errors
  useEffect(() => {
    return () => {
      dispatch(clearErrors());
    };
  }, [dispatch]);

  return {
    values,
    setValues,
    isLoading,
    loading,
    isAuthenticated,
    onChange,
    handleSubmit
  };
};
