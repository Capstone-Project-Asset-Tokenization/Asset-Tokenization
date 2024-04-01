import {
  RegistrationValidatorSchema,
  LoginRegistratinValidatorSchema,
} from "../config/validation/auth_validation.js";
import User from "../models/user_model.js";
import bcrypt from "bcrypt";
export const RegisterController = async (req, res) => {
  const { error, value } = RegistrationValidatorSchema.validate(req.body);
  const { fullName, email, password, legalIdNo } = req.body;

  if (error) return res.status(400).send(error.details[0].message);

  const userExist = await User.findOne({ email: email });
  if (userExist) return res.status(400).send("User already exist");

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = (await bcrypt.hash(password, salt)).toString();

  const user = new User({
    fullName: fullName,
    email: email,
    password: hashedPassword,
    legalIdNo: legalIdNo,
  });

  const result = await user.save(user);
  res.send(result);
};

export const LoginController = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  const { error, value } = LoginRegistratinValidatorSchema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  if (!email) return res.status(400).send("Email or password is require d");

  const user = await User.findOne({ email: email });

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400).send("Invalid password");

  res.send(user);
};
