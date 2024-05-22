"use server";

export const passwordValidator = async (
  password: string,
  hashedPassword: string
) => {
  const bcrypt = require("bcrypt");
  const res = await bcrypt.compareSync(password, hashedPassword);
  return res;
};
