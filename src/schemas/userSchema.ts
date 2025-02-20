import { z } from "zod";

export const loginCredentialsSchema = z.object({
  email: z.string().email({
    message: "Invalid email",
  }),
  password: z
    .string()
    .min(4, {
      message: "Password must be at least 4 characters long",
    })
    .max(16, {
      message: "Password must be at most 16 characters long",
    }),
});

const documentTypes = [
  "cedula_ciudadania",
  "cedula_extranjera",
  "pasaporte",
] as const;

export type DocumentType = (typeof documentTypes)[number];

export const mappedDocumentTypes: { [key in DocumentType]: string } = {
  cedula_ciudadania: "Cédula de Ciudadanía",
  cedula_extranjera: "Cédula de Extranjería",
  pasaporte: "Pasaporte",
};

export const registerSchema = z
  .object({
    firstName: z.string().min(2, {
      message: "First name must be at least 2 characters",
    }),
    lastName: z.string().min(2, {
      message: "Last name must be at least 2 characters",
    }),
    phone: z
      .string()
      .min(10, { message: "Phone number must be at least 10 digits" }),
    documentType: z.enum(documentTypes),
    documentNumber: z
      .string()
      .min(8, "Document number must be at least 8 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
    termsAccepted: z.literal(true, {
      errorMap: () => ({ message: "You must accept the terms and conditions" }),
    }),
    dataPolicy: z.literal(true, {
      errorMap: () => ({ message: "You must accept the data policy" }),
    }),
    promotionalEmails: z.boolean().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });
