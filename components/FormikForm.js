import { Formik, Form, useField } from 'formik';
import styled from 'styled-components';
import * as Yup from 'yup';

const FormStyles = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5rem;
  button {
    margin-top: 2rem;
  }
  .form-error {
    color: red;
  }
`;

// const validate = (values) => {
//   const errors = {};

//   if (!values.firstName) {
//     errors.firstName = 'Required';
//   } else if (values.firstName.length > 15) {
//     errors.firstName = 'Must be 15 characters or less';
//   }

//   if (!values.lastName) {
//     errors.lastName = 'Required';
//   } else if (values.lastName.length > 20) {
//     errors.lastName = 'Must be 20 characters or less';
//   }

//   if (!values.email) {
//     errors.email = 'Required';
//   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
//     errors.email = 'Invalid email address';
//   }

//   return errors;
// };

const MyTextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)

  const [field, meta] = useField(props);

  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

const MyCheckbox = ({ children, ...props }) => {
  // React treats radios and checkbox inputs differently other input types, select, and textarea.
  // Formik does this too! When you specify `type` to useField(), it will
  // return the correct bag of props for you -- a `checked` prop will be included
  // in `field` alongside `name`, `value`, `onChange`, and `onBlur`

  const [field, meta] = useField({ ...props, type: 'checkbox' });

  return (
    <div>
      <label className="checkbox-input">
        <input type="checkbox" {...field} {...props} />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

const MySelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div>
      <label htmlFor={props.id || props.name}>{label}</label>
      <select {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

const SignupForm = () => (
  <Formik
    initialValues={{
      firstName: '',
      lastName: '',
      email: '',
      acceptedTerms: false, // added for our checkbox
      jobType: '', // added for our select
    }}
    validationSchema={Yup.object({
      firstName: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
      lastName: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      acceptedTerms: Yup.boolean()
        .required('Required')
        .oneOf([true], 'You must accept the terms and conditions.'),
      jobType: Yup.string()
        .oneOf(
          ['designer', 'development', 'product', 'other'],
          'Invalid Job Type'
        )
        .required('Required'),
    })}
    onSubmit={(values, { setSubmitting }) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
      }, 400);
    }}
  >
    <FormStyles>
      <MyTextInput
        label="First Name"
        name="firstName"
        type="text"
        placeholder="Jane"
      />

      <MyTextInput
        label="Last Name"
        name="lastName"
        type="text"
        placeholder="Doe"
      />

      <MyTextInput
        label="Email Address"
        name="email"
        type="email"
        placeholder="jane@formik.com"
      />

      <MySelect label="Job Type" name="jobType">
        <option value="">Select a job type</option>
        <option value="designer">Designer</option>
        <option value="development">Developer</option>
        <option value="product">Product Manager</option>
        <option value="other">Other</option>
      </MySelect>

      <MyCheckbox name="acceptedTerms">
        I accept the terms and conditions
      </MyCheckbox>

      <button type="submit">Submit</button>
    </FormStyles>
  </Formik>
);

export default SignupForm;
