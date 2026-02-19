"use client";

import { useState } from "react";
import { Send, Mail, Linkedin, Instagram } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function ContactForm() {
  const { t } = useI18n();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    companyTitle: "",
    challenge: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle rate limiting (429) with specific message
        if (response.status === 429) {
          const retryAfter = data.retryAfter || 15;
          const minutes = Math.ceil(retryAfter / 60);
          setErrorMessage(
            `Too many requests. Please wait ${minutes} minute${minutes > 1 ? "s" : ""} before trying again.`
          );
        } else {
          setErrorMessage(data.error || "Failed to send message. Please try again.");
        }
        setSubmitStatus("error");
        return;
      }

      setSubmitStatus("success");
      setFormData({ name: "", email: "", companyTitle: "", challenge: "", message: "" });
    } catch (error) {
      console.error("Form submission error:", error);
      setErrorMessage("An unexpected error occurred. Please try again later.");
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-8 md:p-10">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-foreground mb-2"
          >
            {t.contact.form.name}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
            placeholder={t.contact.form.namePlaceholder}
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-foreground mb-2"
          >
            {t.contact.form.email}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
            placeholder={t.contact.form.emailPlaceholder}
          />
        </div>

        <div>
          <label
            htmlFor="companyTitle"
            className="block text-sm font-medium text-foreground mb-2"
          >
            {t.contact.form.companyTitle} <span className="text-muted-foreground font-normal">{t.contact.form.companyTitleOptional}</span>
          </label>
          <input
            type="text"
            id="companyTitle"
            name="companyTitle"
            value={formData.companyTitle}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
            placeholder={t.contact.form.companyTitlePlaceholder}
          />
        </div>

        <div>
          <label
            htmlFor="challenge"
            className="block text-sm font-medium text-foreground mb-2"
          >
            {t.contact.form.challenge} <span className="text-muted-foreground font-normal">{t.contact.form.challengeOptional}</span>
          </label>
          <select
            id="challenge"
            name="challenge"
            value={formData.challenge}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
          >
            <option value="">{t.contact.form.challengePlaceholder}</option>
            <option value="Visibility">{t.contact.form.challengeOptions.visibility}</option>
            <option value="Messaging">{t.contact.form.challengeOptions.messaging}</option>
            <option value="Credibility">{t.contact.form.challengeOptions.credibility}</option>
            <option value="Other">{t.contact.form.challengeOptions.other}</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-foreground mb-2"
          >
            {t.contact.form.message}
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={6}
            className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors resize-none"
            placeholder={t.contact.form.messagePlaceholder}
          />
        </div>

        {submitStatus === "success" && (
          <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg text-primary text-sm">
            {t.contact.form.success}
          </div>
        )}

        {submitStatus === "error" && (
          <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
            {errorMessage || t.contact.form.error}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary text-primary-foreground hover:bg-accent px-8 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <span className="animate-spin">⏳</span>
              {t.contact.form.sending}
            </>
          ) : (
            <>
              <Send size={18} />
              {t.contact.form.send}
            </>
          )}
        </button>
      </form>

      <div className="mt-8 pt-8 border-t border-border">
        <p className="text-sm text-muted-foreground text-center mb-4">
          {t.contact.form.reachOut}
        </p>
        <div className="flex gap-6 justify-center">
          <a
            href="https://linkedin.com/in/filip-wyrembak"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-foreground hover:text-primary transition-colors flex items-center gap-2"
          >
            <Linkedin size={20} />
            <span className="text-sm">LinkedIn</span>
          </a>
          <a
            href="https://www.instagram.com/filip_wyrembak/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-foreground hover:text-primary transition-colors flex items-center gap-2"
          >
            <Instagram size={20} />
            <span className="text-sm">Instagram</span>
          </a>
          <a
            href="mailto:filip@astraflow.tech"
            aria-label="Email"
            className="text-foreground hover:text-primary transition-colors flex items-center gap-2"
          >
            <Mail size={20} />
            <span className="text-sm">Email</span>
          </a>
        </div>
      </div>
    </div>
  );
}
