import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const applicationSchema = z.object({
  roleSlug: z.string().trim().min(1).max(80),
  roleTitle: z.string().trim().min(1).max(120),
  fullName: z.string().trim().min(2, "Please enter your full name").max(100),
  email: z.string().trim().email("Enter a valid email address").max(255),
  message: z.string().trim().max(1000).optional().default(""),
  resumeName: z.string().trim().max(200).optional(),
  resumeType: z.string().trim().max(120).optional(),
  // base64 (no data-url prefix), max ~5MB raw
  resumeBase64: z
    .string()
    .max(7_000_000, "Resume must be smaller than 5MB")
    .optional(),
});

export const submitApplication = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => applicationSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    let resumePath: string | null = null;
    if (data.resumeBase64 && data.resumeName) {
      const bytes = Uint8Array.from(atob(data.resumeBase64), (c) => c.charCodeAt(0));
      const safeName = data.resumeName.replace(/[^a-zA-Z0-9._-]/g, "_").slice(-80);
      const path = `${data.roleSlug}/${crypto.randomUUID()}-${safeName}`;
      const { error: uploadError } = await supabaseAdmin.storage
        .from("resumes")
        .upload(path, bytes, {
          contentType: data.resumeType || "application/octet-stream",
          upsert: false,
        });
      if (uploadError) throw new Error("Could not upload your resume. Please try again.");
      resumePath = path;
    }

    const { error } = await supabaseAdmin.from("job_applications").insert({
      role_slug: data.roleSlug,
      role_title: data.roleTitle,
      full_name: data.fullName,
      email: data.email,
      message: data.message || null,
      resume_path: resumePath,
      resume_name: data.resumeName ?? null,
    });
    if (error) throw new Error("Could not submit your application. Please try again.");

    return { ok: true as const };
  });
