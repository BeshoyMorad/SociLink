import { useState } from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";
import { setLogin } from "state";

// Schemas for validation
const registerSchema = yup.object().shape({
  firstName: yup
    .string()
    .required("Required")
    .min(3, "Must be at least 3 characters"),
  lastName: yup
    .string()
    .required("Required")
    .min(3, "Must be at least 3 characters"),
  email: yup.string().required("Required").email("Invalid email"),
  password: yup
    .string()
    .required("Required")
    .min(8, "Password must be at least 8 characters"),
  location: yup.string().required("Required"),
  occupation: yup.string().required("Required"),
  picture: yup.string().required("Required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().required("Required").email("Invalid email"),
  password: yup
    .string()
    .required("Required")
    .min(8, "Password must be at least 8 characters"),
});

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};

function Form(props) {
  const [pageType, setPageType] = useState("login");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 800px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  const register = async (values, onSubmitProps) => {
    const formData = new FormData();

    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("picturePath", values.picture.name);

    const savedUserResponse = await fetch(
      "http://localhost:3001/auth/register",
      {
        method: "POST",
        body: formData,
      }
    );

    if (savedUserResponse.ok) {
      onSubmitProps.resetForm();
      setPageType("login");
    }
  };

  const login = async (values, onSubmitProps) => {
    const savedUserResponse = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    console.log(savedUserResponse);
    if (savedUserResponse.ok) {
      const savedUser = await savedUserResponse.json();
      onSubmitProps.resetForm();

      dispatch(setLogin({ user: savedUser.user, token: savedUser.token }));
      navigate("/home");
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    else if (isRegister) await register(values, onSubmitProps);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <Box component="form" onSubmit={handleSubmit}>
          <Grid
            container
            spacing={3}
            sx={{
              "& .MuiFormControl-root": {
                width: "100%",
              },
            }}
          >
            {isRegister && (
              <>
                <Grid item xs={isNonMobileScreens ? 6 : 12}>
                  <TextField
                    label="First Name"
                    value={values.firstName}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    name="firstName"
                    error={
                      Boolean(touched.firstName) && Boolean(errors.firstName)
                    }
                    helperText={touched.firstName && errors.firstName}
                  />
                </Grid>
                <Grid item xs={isNonMobileScreens ? 6 : 12}>
                  <TextField
                    label="Last Name"
                    value={values.lastName}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    name="lastName"
                    error={
                      Boolean(touched.lastName) && Boolean(errors.lastName)
                    }
                    helperText={touched.lastName && errors.lastName}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Location"
                    value={values.location}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    name="location"
                    error={
                      Boolean(touched.location) && Boolean(errors.location)
                    }
                    helperText={touched.location && errors.location}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Occupation"
                    value={values.occupation}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    name="occupation"
                    error={
                      Boolean(touched.occupation) && Boolean(errors.occupation)
                    }
                    helperText={touched.occupation && errors.occupation}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box
                    border={`1px solid ${theme.palette.primary.light}`}
                    borderRadius="5px"
                    p="1rem"
                  >
                    <Dropzone
                      accept={{
                        "image/png": [".png"],
                        "image/jpeg": [".jpg", ".jpeg"],
                      }}
                      onDrop={(acceptedFiles) => {
                        setFieldValue("picture", acceptedFiles[0]);
                      }}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <Box
                          {...getRootProps()}
                          border={`2px dashed ${theme.palette.primary.main}`}
                          borderRadius="5px"
                          p="1rem"
                          sx={{
                            "&:hover": {
                              cursor: "pointer",
                            },
                          }}
                        >
                          <input {...getInputProps()} />

                          {!values.picture ? (
                            <Typography>Add Picture Here</Typography>
                          ) : (
                            <FlexBetween>
                              <Typography>{values.picture.name}</Typography>
                              <EditIcon />
                            </FlexBetween>
                          )}
                        </Box>
                      )}
                    </Dropzone>
                  </Box>
                </Grid>
              </>
            )}

            <Grid item xs={12}>
              <TextField
                label="Email"
                value={values.email}
                onBlur={handleBlur}
                onChange={handleChange}
                name="email"
                error={Boolean(touched.email) && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                type="password"
                value={values.password}
                onBlur={handleBlur}
                onChange={handleChange}
                name="password"
                error={Boolean(touched.password) && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />
            </Grid>
          </Grid>

          <Box>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{
                m: "2rem 0",
                p: "1rem",
              }}
            >
              {isLogin ? "Login" : "Register"}
            </Button>

            <Typography
              width="fit-content"
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                resetForm();
              }}
              sx={{
                textDecoration: "underline",
                "&:hover": {
                  color: theme.palette.primary.main,
                  cursor: "pointer",
                },
              }}
            >
              {isLogin
                ? "Don't have an account? Sign Up here."
                : "Already have an account? Login here."}
            </Typography>
          </Box>
        </Box>
      )}
    </Formik>
  );
}

export default Form;
