import { Form, Formik, Field, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useCreatePostMutation } from "../../services/StudentApi";

const Student_Form = () => {
  const navigate = useNavigate();
  const initialValues = {
    std_name: "",
    std_add: "",
    std_roll: "", 
    std_age: "",
    std_mob: "",
  };

  const [createPost] = useCreatePostMutation();

  const validationSchema = Yup.object({
    std_name: Yup.string()
      .required("Name is required") 
      .min(2, "Minimum 2 characters required")
      .max(25, "Maximum 25 characters allowed")
      .matches(
        /^(?![\d\s]+$)([A-Za-z0-9\s]+)$/,
        "Name must contain letters and may contain numbers, but not only numbers or spaces"
      ),

    std_add: Yup.string()
      .required("Address is required")
      .min(4, "Minimum 4 characters required")
      .max(50, "Maximum 50 characters allowed")
      .matches(
        /^(?![\d\s]+$)([A-Za-z0-9\s,.-]+)$/,
        "Address must contain a combination of letters and numbers, but not only numbers or spaces"
      ),

    std_roll: Yup.string()
      .required("Roll number is required")
      .matches(/^\d{1,3}$/, "Roll number must be up to 3 digits"),

    std_age: Yup.number()
      .required("Age is required")
      .min(1, "Age must be at least 1")
      .max(25, "Age must be under 25"),

    std_mob: Yup.string()
      .required("Mobile number is required")
      .matches(/^\d{10}$/, "Mobile number must be exactly 10 digits"),
  });

  const onSubmit = async (values, { resetForm }) => {
    try {
       let payload = await createPost(values);
      toast.success("Form submitted successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
      resetForm();
      navigate("/");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Submission failed! Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const handleBackClick = () => {
    navigate("/");
  };

  return (
    <>
        <button onClick={handleBackClick} className="btn btn-secondary mb-3">
          Back
        </button>
        <div className="container vh-100 d-flex justify-content-center align-items-center">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            <Form className="text-center border p-4 rounded shadow bg-light w-50">
              <div className="mb-3">
                <label htmlFor="std_name">Name</label>
                <Field
                  type="text"
                  name="std_name"
                  id="std_name"
                  className="form-control"
                  placeholder="Enter your name"
                />
                <ErrorMessage
                  name="std_name"
                  className="text-danger"
                  component="p"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="std_add">Address</label>
                <Field
                  as="textarea"
                  name="std_add"
                  id="std_add"
                  className="form-control"
                  placeholder="Enter your address"
                />
                <ErrorMessage
                  name="std_add"
                  className="text-danger"
                  component="p"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="std_roll">Roll No.</label>
                <Field
                  type="number"
                  className="form-control"
                  placeholder="Enter roll no."
                  id="std_roll"
                  name="std_roll"
                />
                <ErrorMessage
                  name="std_roll"
                  className="text-danger"
                  component="p"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="std_age">Age</label>
                <Field
                  type="number"
                  className="form-control"
                  placeholder="Enter age"
                  id="std_age"
                  name="std_age"
                />
                <ErrorMessage
                  name="std_age"
                  className="text-danger"
                  component="p"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="std_mob">Mobile No.</label>
                <Field
                  type="text"
                  className="form-control"
                  placeholder="Enter mobile no."
                  id="std_mob"
                  name="std_mob"
                />
                <ErrorMessage
                  name="std_mob"
                  className="text-danger"
                  component="p"
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                >Submit</button>

              
            </Form>
          </Formik>
        </div>
    </>
  );
};

export default Student_Form;
