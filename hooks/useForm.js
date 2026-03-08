import { useState } from "react";

export function useForm(schema, initialValues) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  function setValue(field, value) {
    setValues((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  }

  function validate() {
    const result = schema.safeParse(values);
    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
      return false;
    }
    setErrors({});
    return true;
  }

  return { values, errors, setValue, validate };
}