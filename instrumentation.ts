import dbConnect from "@/server/utils/db";

export async function register() {
  await dbConnect();
}
