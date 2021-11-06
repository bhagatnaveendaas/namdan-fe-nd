import * as Yup from "yup";
import moment from "moment";

const tommorow = moment(new Date().setDate(new Date().getDate() + 1));
const threeYears = moment(
    new Date().setDate(new Date().getDate() - (365 * 3 + 1))
);

// const threeYearDateText = threeYears.format("DD-MM-YYYY");

export const NewDiscipleSchema = Yup.object().shape(
    {
        form_date: Yup.date().required("Please fill Form date.").max(tommorow),
        form_no: Yup.string()
            .required("Please fill Form number.")
            .min(6, "Form number must be atleast of 6 characters."),
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
        dob: Yup.date()
            .max(threeYears, `Check DOB, make sure age is greater than 3 years`)
            .required("Date of birth."),
        mobile_no: Yup.string()
            .required("Please fill Mobile number.")
            .min(10, "Enter valid mobile number"),
        whatsapp_no: Yup.string()
            .nullable()
            .notRequired()
            .when("whatsapp_no", {
                is: (value) => value?.length,
                then: (rule) => rule.min(10, "Enter valid whatsapp number"),
            }),
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
    },
    ["whatsapp_no", "whatsapp_no"]
);
