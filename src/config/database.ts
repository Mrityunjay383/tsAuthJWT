import { connect } from "mongoose";

const DATABASE_URL = process.env.DATABASE_URL;

exports.connect = async () => {
  try {
    await connect(DATABASE_URL || "");
    console.log(`#202481205637235 DB connected Successfully`);
  } catch (err) {
    console.log("DB Connection Failed!");
    console.log(err);
  }
};
