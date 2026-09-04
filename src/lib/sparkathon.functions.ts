import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";

export type Bounty = Database["public"]["Tables"]["bounties"]["Row"];

function getPublicClient() {
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
  return createClient<Database>(process.env["SUPABASE_URL"]!, key, {
    auth: { persistSession: false },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) {
          h.delete("Authorization");
        }
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

export const listBounties = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await getPublicClient()
    .from("bounties")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) throw new Error("Could not load the bounty board.");
  return data ?? [];
});

export const getBounty = createServerFn({ method: "GET" })
  .inputValidator((input: { id: string }) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data }) => {
    const { data: bounty, error } = await getPublicClient()
      .from("bounties")
      .select("*")
      .eq("id", data.id)
      .maybeSingle();

    if (error) throw new Error("Could not load this bounty.");
    return bounty ?? null;
  });

const registrationSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Enter a valid email address").max(255),
  date: z.string().trim().max(20).optional().or(z.literal("")),
  guests: z.coerce.number().int().min(1).max(6).default(1),
  experience: z.string().trim().max(60).optional().or(z.literal("")),
});

export type ActionResult = { ok: true; message: string } | { ok: false; message: string };

export const submitRegistration = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => registrationSchema.parse(input))
  .handler(async ({ data }): Promise<ActionResult> => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { error } = await supabaseAdmin.from("registrations").insert({
      name: data.name,
      email: data.email.toLowerCase(),
      preferred_date: data.date ? data.date : null,
      guests: data.guests,
      experience: data.experience ? data.experience : null,
    });

    if (error) {
      if (error.code === "23505") {
        return { ok: false, message: "That email is already on the roster — one ride per rider." };
      }
      console.error("registration insert failed", error);
      return { ok: false, message: "We couldn't save your registration. Please try again." };
    }

    return { ok: true, message: "You're on the roster. Watch your inbox for trail instructions." };
  });

const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Enter a valid email address").max(255),
  message: z.string().trim().min(5, "Tell us a little more").max(1000),
});

export const submitContactMessage = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => contactSchema.parse(input))
  .handler(async ({ data }): Promise<ActionResult> => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { error } = await supabaseAdmin.from("contact_messages").insert({
      name: data.name,
      email: data.email.toLowerCase(),
      message: data.message,
    });

    if (error) {
      console.error("contact insert failed", error);
      return { ok: false, message: "We couldn't send your message. Please try again." };
    }

    return { ok: true, message: "Word sent. The Trail Guides will ride back to you soon." };
  });
