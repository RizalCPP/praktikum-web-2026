"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { db } from "@/prisma/db";

// 1. REGISTER ACTION (Menyimpan data user & NIM ke MySQL)
export async function registerAction(formData: FormData) {
  const name = String(formData.get("name") || "").trim();
  const nim = String(formData.get("nim") || "").trim() || null;
  const email = String(formData.get("email") || "").trim();
  const rawPassword = String(formData.get("password") || "");

  if (!name || !email || !rawPassword) {
    throw new Error("Nama, email, dan password wajib diisi.");
  }

  const existingUser = await db.orm.User.where({ email }).first();
  if (existingUser) {
    redirect("/register?error=email-exists");
  }

  const hashedPassword = await bcrypt.hash(rawPassword, 10);

  await db.orm.User.create({
    name,
    nim,
    email,
    password: hashedPassword,
    role: "USER",
  });

  redirect("/login?registered=1");
}

// 2. LOGIN ACTION (Verifikasi password & simpan sesi ke cookie)
export async function loginAction(formData: FormData) {
  const email = String(formData.get("email") || "").trim();
  const rawPassword = String(formData.get("password") || "");

  if (!email || !rawPassword) {
    redirect("/login?error=missing-fields");
  }

  const user = await db.orm.User.where({ email }).first();
  if (!user || !user.password) {
    redirect("/login?error=invalid-credentials");
  }

  const isPasswordValid = await bcrypt.compare(rawPassword, user.password);
  if (!isPasswordValid) {
    redirect("/login?error=invalid-credentials");
  }

  const sessionPayload = JSON.stringify({
    id: user.id,
    name: user.name,
    nim: user.nim ?? null,
    email: user.email,
    role: user.role,
  });

  const cookieStore = await cookies();
  cookieStore.set("praktikum_session", sessionPayload, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  redirect("/dashboard");
}