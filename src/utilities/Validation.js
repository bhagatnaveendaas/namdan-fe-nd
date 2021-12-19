import * as Yup from "yup";
import moment from "moment";

const tommorow = moment(new Date().setDate(new Date().getDate() + 1));
const threeYears = moment(new Date().setDate(new Date().getDate() - 365 * 3));

export const NewNonIndianDiscipleSchema = Yup.object().shape({
    avatar: Yup.string().required("Please provide profile picture."),
    form_date: Yup.string().required("Please fill Form date."),
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
    occupation: Yup.string().required("Please fill Occupation."),
    otherOccupation: Yup.string().when("occupation", (occupation) => {
        if (occupation === "Other" || occupation === "other") {
            return Yup.string().required("Please fill Occupation.");
        }
    }),
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
    pincode: Yup.lazy((value) => {
        if (value !== "") {
            return Yup.string().min(
                6,
                "Enter valid pin code, it must be 6 characters long"
            );
        }
        return Yup.string().nullable().notRequired();
    }),
    email: Yup.string().email("Enter a valid email address."),
});
export const NewIndianDiscipleSchema = Yup.object().shape(
    {
        avatar: Yup.string().required("Please provide profile picture."),
        form_date: Yup.string().required("Please fill Form date."),
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
        occupation: Yup.string().required("Please fill Occupation."),
        otherOccupation: Yup.string().when("occupation", (occupation) => {
            if (occupation === "Other" || occupation === "other") {
                return Yup.string().required("Please fill Occupation.");
            }
        }),
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
        tehsil_id: Yup.number().when("tehsil_id", (tehsil_id) => {
            if (tehsil_id >= 0) {
                return Yup.number()
                    .required("Please Select Tehsil")
                    .min(1, "Please fill Tehsil.");
            } else {
                return Yup.number().required("Please Select Tehsil");
            }
        }),
        tehsil_name1: Yup.string().when("tehsil_id", (tehsil_id) => {
            if (tehsil_id < 0) {
                return Yup.string().required("Please fill other tehsil name");
            }
        }),
        address: Yup.string()
            .required("Please fill Address.")
            .min(3, "Address must be atleast 3 characters long"),
        pincode: Yup.lazy((value) => {
            if (value !== "") {
                return Yup.string().min(
                    6,
                    "Enter valid pin code, it must be 6 characters long"
                );
            }
            return Yup.string().nullable().notRequired();
        }),
        email: Yup.string().email("Enter a valid email address."),
    },
    ["tehsil_id", "tehsil_id"]
);
