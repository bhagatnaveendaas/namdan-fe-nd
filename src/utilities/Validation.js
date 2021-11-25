import * as Yup from "yup";
import moment from "moment";

const tommorow = moment(new Date().setDate(new Date().getDate() + 1));
const threeYears = moment(new Date().setDate(new Date().getDate() - 365 * 3));

export const NewNonIndianDiscipleSchema = Yup.object().shape({
    avatar: Yup.string().required("Please provide profile picture."),
    form_date: Yup.string().required("Please fill Form date."),
    form_no: Yup.string()
        .required("Please fill Form number.")
        .min(6, "Form number must be atleast of 6 characters."),
    aadhaar_no: Yup.lazy((value) => {
        if (value !== "") {
            return Yup.string().min(
                12,
                "Aadhar Card number must be 12 characters long."
            );
        }
        return Yup.string().nullable().notRequired();
    }),
    mobile_no: Yup.string()
        .required("Please fill Mobile number.")
        .min(10, "Enter valid mobile number"),
    whatsapp_no: Yup.lazy((value) => {
        if (value !== "") {
            return Yup.string().min(
                10,
                "Whatsapp number must be 10 characters long."
            );
        }
        return Yup.string().nullable().notRequired();
    }),
    namdan_taken: Yup.string().required("Please fill Namdan Taken at."),
    name: Yup.string()
        .required("Please fill Name.")
        .matches(/^[a-zA-Z ]*$/, "Name must contain alphabets only.")
        .min(3),
    relation: Yup.string().required("Please fill Relation."),
    // TODO: gurardianName can be changed to guardian_name,
    //validation sequence is not working for guardian_name
    guardianName: Yup.string()
        .required("Please fill Gaurdian Name.")
        .matches(/^[a-zA-Z ]*$/, "Name must contain alphabets only.")
        .min(3),
    occupation: Yup.string()
        .required("Please fill Occupation.")
        .matches(/^[a-zA-Z ]*$/, "Occupation must contain alphabets only."),
    dob: Yup.string().required("Date of birth is required."),
    country_id: Yup.number()
        .required("Please fill Country.")
        .min(1, "Please fill Country."),
    state_id: Yup.number()
        .required("Please fill State")
        .min(1, "Please fill State."),
    city_id: Yup.number()
        .required("Please fill City.")
        .min(1, "Please fill City."),
    address: Yup.string()
        .required("Please fill Address.")
        .min(3, "Address must be atleast 3 characters long"),
    pincode: Yup.string()
        .required("Please fill Pincode")
        .min(6, "Enter valid pin code, it must be 6 characters long"),
    email: Yup.string().email("Enter a valid email address."),
    file1: Yup.string(),
});
export const NewIndianDiscipleSchema = Yup.object().shape({
    avatar: Yup.string().required("Please provide profile picture."),
    form_date: Yup.string().required("Please fill Form date."),
    form_no: Yup.string()
        .required("Please fill Form number.")
        .min(6, "Form number must be atleast of 6 characters."),
    aadhaar_no: Yup.lazy((value) => {
        if (value !== "") {
            return Yup.string().min(
                12,
                "Aadhar Card number must be 12 characters long."
            );
        }
        return Yup.string().nullable().notRequired();
    }),
    mobile_no: Yup.string()
        .required("Please fill Mobile number.")
        .min(10, "Enter valid mobile number"),
    whatsapp_no: Yup.lazy((value) => {
        if (value !== "") {
            return Yup.string().min(
                10,
                "Whatsapp number must be 10 characters long."
            );
        }
        return Yup.string().nullable().notRequired();
    }),
    namdan_taken: Yup.string().required("Please fill Namdan Taken at."),
    name: Yup.string()
        .required("Please fill Name.")
        .matches(/^[a-zA-Z ]*$/, "Name must contain alphabets only.")
        .min(3),
    relation: Yup.string().required("Please fill Relation."),
    // TODO: gurardianName can be changed to guardian_name,
    //validation sequence is not working for guardian_name
    guardianName: Yup.string()
        .required("Please fill Gaurdian Name.")
        .matches(/^[a-zA-Z ]*$/, "Name must contain alphabets only.")
        .min(3),
    occupation: Yup.string()
        .required("Please fill Occupation.")
        .matches(/^[a-zA-Z ]*$/, "Occupation must contain alphabets only."),
    dob: Yup.string().required("Date of birth is required."),

    country_id: Yup.number()
        .required("Please fill Country.")
        .min(1, "Please fill Country."),
    state_id: Yup.number()
        .required("Please fill State")
        .min(1, "Please fill State."),
    district_id: Yup.number()
        .required("Please fill District.")
        .min(1, "Please fill District."),
    tehsil_id: Yup.number(),
    address: Yup.string()
        .required("Please fill Address.")
        .min(3, "Address must be atleast 3 characters long"),
    pincode: Yup.string()
        .required("Please fill Pincode")
        .min(6, "Enter valid pin code, it must be 6 characters long"),
    email: Yup.string().email("Enter a valid email address."),
    file1: Yup.string(),
    file2: Yup.string(),
});
