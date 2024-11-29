import * as Yup from "yup";

export const HomeAdminValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  position: Yup.string().required("Position is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  profilePic: Yup.mixed().nullable(),
  resume: Yup.mixed().nullable().required("Resume is required"),
  socials: Yup.array().of(
    Yup.object().shape({
      label: Yup.string().required("Label is required"),
      url: Yup.string().url("Invalid URL").required("URL is required")
    })
  ),
});