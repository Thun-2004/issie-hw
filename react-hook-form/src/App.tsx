import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const formSchema = z.object({
  firstname: z.string().nonempty("First Name must not be empty"),
  lastname: z.string().nonempty("Last Name must not be empty"),
  email: z.string().email(),
  phone: z.string().length(10, "Phone number must be exactly 10 digits"),
  idnumber: z.string().length(13 , "ID must be exactly 13 digits"),
  age: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: "Age must not be empty",
  })
  .transform((val) => parseInt(val, 10))
  .refine((num) => num >= 10 && num <= 95, {
    message: "Age must be between 10 and 95",
  }),
  gender: z.string()
  .refine(val => ['Male', "Female", "Non-binary", "Prefer not to say"].includes(val), {
    message: "Please select a gender option",
  }),
  country: z.string()
  .refine(val => ["Thailand", "Russia", "China", "North Korea"].includes(val), {
    message: "Please select a country option",
  }),
  birthdate: z.coerce.date().refine(
    (date) => {
      const today = new Date();
      const minDate = new Date(
        today.getFullYear() - 95,
        today.getMonth(),
        today.getDate()
      );
      const maxDate = new Date(
        today.getFullYear() - 10,
        today.getMonth(),
        today.getDate()
      );
      return date >= minDate && date <= maxDate;
    },
    {
      message: "Age must be between 10 and 95 years old",
    }
  ),
  password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
  "Password must contain at least 1 uppercase,1 lowercase letter, and 1 number"),
  confirmpassword: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
  "Password must contain at least 1 uppercase,1 lowercase letter, and 1 number"),
}).refine((data) => data.password === data.confirmpassword, {
  message: "Passwords don't match",
  path: ["confirmpassword"],
});

export default function ResponsiveForm() {
  const {
    register,
    handleSubmit,
    reset, 
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      idnumber: "",
      age: "",
      gender: "Male" as const,
      country: "Thailand" as const,
      birthdate: new Date("1930-01-01"),
      password: "",
      confirmpassword: "",
    },
  });

  const onSubmit = handleSubmit(() => {
    alert("Form submitted!");
    reset();
  });

  return (
    <div className="py-12 flex items-center justify-center">
      <div className="max-w-7xl w-full mx-auto p-4 sm:p-6">
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block pb-1">First Name</label>
            <input
              type="text"
              {...register("firstname")}
              placeholder="First Name"
              className="border w-full rounded-md p-2 border-gray-400"
            />
            {errors.firstname && (
              <p className="text-red-500">{errors.firstname.message}</p>
            )}
          </div>

          <div>
            <label className="block pb-1">Last Name</label>
            <input
              type="text"
              {...register("lastname")}
              placeholder="Last Name"
              className="border w-full rounded-md p-2 border-gray-400"
            />
            {errors.lastname && (
              <p className="text-red-500">{errors.lastname.message}</p>
            )}
          </div>

          <div>
            <label className="block pb-1">Email</label>
            <input
              type="email"
              {...register("email")}
              placeholder="Email"
              className="border w-full rounded-md p-2 border-gray-400"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block pb-1">Phone</label>
            <input
              type="tel"
              {...register("phone")}
              placeholder="Phone"
              className="border w-full rounded-md p-2 border-gray-400"
            />
            {errors.phone && (
              <p className="text-red-500">{errors.phone.message}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block pb-1">ID number</label>
            <input
              type="text"
              {...register("idnumber")}
              placeholder="ID number"
              className="border w-full rounded-md p-2 border-gray-400"
            />
            {errors.idnumber && (
              <p className="text-red-500">{errors.idnumber.message}</p>
            )}
          </div>

          <div>
            <label className="block pb-1">Age</label>
            <input
              type="number"
              {...register("age")}
              placeholder="Age"
              className="border w-full rounded-md p-2 border-gray-400"
            />
            {errors.age && <p className="text-red-500">{errors.age.message}</p>}
          </div>

          <div>
            <label className="block pb-1">Gender</label>
            <select
              id=""
              {...register("gender")}
              className="border w-full rounded-md p-2 border-gray-400"
            >
              <option value="">-- Select Gender --</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Non-binary">Non-binary</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
            {errors.gender && (
              <p className="text-red-500">{errors.gender.message}</p>
            )}
          </div>

          <div>
            <label className="block pb-1">Country</label>
            <select
              id=""
              {...register("country")}
              className="border w-full rounded-md p-2 border-gray-400"
            >
              <option value="">-- Select Country --</option>
              <option value="Thailand">Thailand</option>
              <option value="Russia">Russia</option>
              <option value="China">China</option>
              <option value="North Korea">North Korea</option>
            </select>
            {errors.country && (
              <p className="text-red-500">{errors.country.message}</p>
            )}
          </div>

          <div>
            <label className="block pb-1">Birthdate</label>
            <input
              type="date"
              {...register("birthdate")}
              placeholder="Birthdate"
              className="border w-full rounded-md p-2 border-gray-400"
            />
            {errors.birthdate && (
              <p className="text-red-500">{errors.birthdate.message}</p>
            )}
          </div>

          <div>
            <label className="block pb-1">Password</label>
            <input
              type="password"
              {...register("password")}
              placeholder="Password"
              className="border w-full rounded-md p-2 border-gray-400"
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>

          <div>
            <label className="block pb-1">Confirm Password</label>
            <input
              type="password"
              {...register("confirmpassword")}
              placeholder="Confirm Password"
              className="border w-full rounded-md p-2 border-gray-400"
            />
            {errors.confirmpassword && (
              <p className="text-red-500">{errors.confirmpassword.message}</p>
            )}
          </div>

          <div className="md:col-span-2 pt-4">
            <button
              type="submit"
              onClick={onSubmit}
              className="bg-orange-600 text-white px-6 py-2 rounded-md hover:bg-orange-700"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
