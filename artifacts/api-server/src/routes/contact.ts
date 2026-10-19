import { ReplitConnectors } from "@replit/connectors-sdk";
import {
  type ApiError,
  SubmitContactInquiryBody,
  SubmitContactInquiryResponse,
} from "@workspace/api-zod";
import { rateLimit } from "express-rate-limit";
import { Router, type IRouter } from "express";

const router: IRouter = Router();
const connectors = new ReplitConnectors();
const recipient = "m.faizansajid102418@gmail.com";
const senderEmailPattern = /^[^\s<>@]+@[^\s<>@]+\.[^\s<>@]+$/;

const errorBody = (error: string): ApiError => ({ error });

const inquiryRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_req, res): void => {
    res.status(429).json(errorBody("Too many enquiries. Please try again later."));
  },
});

router.post("/contact", inquiryRateLimit, async (req, res): Promise<void> => {
  const parsed = SubmitContactInquiryBody.safeParse(req.body);
  if (!parsed.success) {
    req.log.warn(
      {
        validationIssues: parsed.error.issues.map(({ path, code }) => ({
          path,
          code,
        })),
      },
      "Rejected invalid contact inquiry",
    );
    res.status(400).json(errorBody("Check the required fields and try again."));
    return;
  }

  const inquiry = parsed.data;
  if (inquiry.consent !== true) {
    res.status(400).json(
      errorBody("Please consent to sending your inquiry before submitting."),
    );
    return;
  }

  if (inquiry.website?.trim()) {
    req.log.warn("Rejected contact inquiry caught by honeypot");
    res.status(400).json(errorBody("The inquiry could not be accepted."));
    return;
  }

  const senderEmail = process.env.RESEND_FROM_EMAIL?.trim();
  if (!senderEmail || !senderEmailPattern.test(senderEmail)) {
    res.status(503).json(
      errorBody(
        "Contact form delivery is waiting for a sender email on a verified Resend domain.",
      ),
    );
    return;
  }

  const text = [
    "New project inquiry from the HighFly AI website",
    "",
    `Name: ${inquiry.name.trim()}`,
    `Email: ${inquiry.email.trim()}`,
    `Company: ${inquiry.company?.trim() || "Not provided"}`,
    `Phone: ${inquiry.phone?.trim() || "Not provided"}`,
    `Service: ${inquiry.service.trim()}`,
    `Budget: ${inquiry.budget?.trim() || "Not provided"}`,
    `Timeline: ${inquiry.timeline?.trim() || "Not provided"}`,
    "",
    "Project or business description:",
    inquiry.description.trim(),
    "",
    "Additional notes:",
    inquiry.notes?.trim() || "None",
  ].join("\n");

  try {
    const providerResponse = await connectors.proxy("resend", "/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        from: `HighFly AI Website <${senderEmail}>`,
        to: recipient,
        reply_to: inquiry.email.trim(),
        subject: "New HighFly AI website inquiry",
        text,
      }),
    });

    if (!providerResponse.ok) {
      req.log.error(
        { providerStatus: providerResponse.status },
        "Resend rejected the contact inquiry",
      );
      res.status(502).json(
        errorBody(
          error:
            "We could not deliver your inquiry right now. Please contact HighFly AI directly.",
        ),
      );
      return;
    }

    res.status(202).json(SubmitContactInquiryResponse.parse({ accepted: true }));
  } catch (error) {
    req.log.error(
      { errorType: error instanceof Error ? error.name : "UnknownError" },
      "Resend request failed for contact inquiry",
    );
    res.status(502).json(
      errorBody(
        "We could not deliver your inquiry right now. Please contact HighFly AI directly.",
      ),
    );
  }
});

export default router;
