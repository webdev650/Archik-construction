
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactSection() {
  const [status, setStatus] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    inquiryType: "",
    briefSubject: "",
    projectRequirements: "",
  });

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setStatus("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus(data.message);
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          setStatus("");
          setFormData({
            fullName: "",
            email: "",
            phone: "",
            inquiryType: "",
            briefSubject: "",
            projectRequirements: "",
          });
        }, 3000);
      } else {
        setError(data.error || "Failed to send message");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
          Send us a Message
        </h2>
        <p className="text-lg text-slate-600 mx-auto max-w-2xl">
          Ready to transform your space? Get in touch with our design experts
          and let's create something beautiful together.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Contact Form */}
        <div className="order-2 lg:order-1">
          <form
            onSubmit={onSubmit}
            className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg space-y-4"
          >
            <div className="text-center mb-4">
              <h3 className="text-xl font-semibold text-slate-800 mb-2">
                Get Started Today
              </h3>
              <p className="text-slate-600 text-sm">
                Fill out the form below and we'll get back to you within 24
                hours
              </p>
            </div>

            {error && (
              <div className="p-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg">
                {error}
              </div>
            )}

            <div className="grid gap-2">
              <label className="text-sm font-medium text-slate-700">
                Full Name *
              </label>
              <Input
                required
                placeholder="Your full name"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                className="border-gray-200 focus:border-gray-400 py-2"
                disabled={loading}
              />
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-medium text-slate-700">
                Email *
              </label>
              <Input
                required
                type="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="border-gray-200 focus:border-gray-400 py-2"
                disabled={loading}
              />
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-medium text-slate-700">
                Phone *
              </label>
              <Input
                required
                type="tel"
                placeholder="+91 95835 30095"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="border-gray-200 focus:border-gray-400 py-2"
                disabled={loading}
              />
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-medium text-slate-700">
                Select Inquiry Type *
              </label>
              <select
                required
                value={formData.inquiryType}
                onChange={(e) =>
                  setFormData({ ...formData, inquiryType: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-200 rounded-md focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 text-slate-700"
                disabled={loading}
              >
                <option value="">Select Inquiry Type</option>
                <option value="interior-design">
                  Interior Design Consultation
                </option>
                <option value="furniture-purchase">Furniture Purchase</option>
                <option value="complete-home">Complete Home Makeover</option>
                <option value="commercial-project">Commercial Project</option>
                <option value="custom-furniture">
                  Custom Furniture Design
                </option>
                <option value="renovation">Home Renovation</option>
                <option value="general">General Inquiry</option>
              </select>
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-medium text-slate-700">
                Brief Subject *
              </label>
              <Input
                required
                placeholder="Brief description of your project"
                value={formData.briefSubject}
                onChange={(e) =>
                  setFormData({ ...formData, briefSubject: e.target.value })
                }
                className="border-gray-200 focus:border-gray-400 py-2"
                disabled={loading}
              />
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-medium text-slate-700">
                Tell us about your project requirements *
              </label>
              <Textarea
                required
                rows={3}
                placeholder="Describe your project in detail - space dimensions, style preferences, budget range, timeline, specific requirements..."
                value={formData.projectRequirements}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    projectRequirements: e.target.value,
                  })
                }
                className="border-gray-200 focus:border-gray-400"
                disabled={loading}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 rounded-xl transition-all duration-200"
              disabled={loading}
            >
              {loading ? "Sending Message..." : "Send Message"}
            </Button>

            {status && !showSuccess && (
              <p className="text-sm text-green-600 text-center">{status}</p>
            )}
          </form>
        </div>

        {/* Contact Info & Map */}
        <div className="order-1 lg:order-2 space-y-6">
          {/* Contact Information */}
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 shadow-lg">
            <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-1l-4 4z"
                  />
                </svg>
              </div>
              Get in Touch
            </h3>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gray-200 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800">Email Us</h4>
                  <p className="text-slate-600"><a href="mailto:info@archikconstruction.com" className="hover:underline">info@archikconstruction.com</a></p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gray-200 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800">Call Us</h4>
                  <p className="text-slate-600">+91 95835 30095</p>
                  <p className="text-slate-500 text-sm">
                    Mon - Sat: 9 AM - 7 PM
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                {/* Address 1 */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>

                  <div>
                    <h4 className="font-semibold text-slate-800">
                      Visit Our Showroom
                    </h4>
                    <p className="text-slate-600 font-medium">
                      Bhubaneswar Office
                    </p>
                    <p className="text-slate-600">
                      Plot no-B/32, Sidhivihar, New Jagamara Road, Infront of
                      Pabitra Mandap, Bhubaneswar, Khurda, Odisha, 751030
                    </p>
                    <button className="text-slate-600 hover:text-slate-800 text-sm font-medium mt-1 transition-colors">
                      Get Directions →
                    </button>
                  </div>
                </div>

    

  {/* Address 2 — NEW */}
  <div className="flex items-start gap-4">
    <div className="w-12 h-12 bg-gray-200 rounded-xl flex items-center justify-center flex-shrink-0">
      <svg
        className="w-6 h-6 text-gray-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    </div>

    <div>
      <h4 className="font-semibold text-slate-800">Visit Our Showroom</h4>
      <p className="text-slate-600 font-medium">Bhubaneswar Office (Old Town)</p>
      <p className="text-slate-600">
        Plot no-1967, Sriram Nagar, Old Town, Bhubaneswar, Odisha 751002
      </p>
      <button className="text-slate-600 hover:text-slate-800 text-sm font-medium mt-1 transition-colors">
        Get Directions →
      </button>
    </div>
  </div>
                {/* Address 3 */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>

                  <div>
                    <h4 className="font-semibold text-slate-800">
                      Visit Our Showroom
                    </h4>
                    <p className="text-slate-600 font-medium">
                      Bengaluru Office
                    </p>
                    <p className="text-slate-600">
                      J304 Icon Happy Living, Electronic City Phase 2, Ecity,
                      Bengaluru – 560100
                    </p>
                    <button className="text-slate-600 hover:text-slate-800 text-sm font-medium mt-1 transition-colors">
                      Get Directions →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Embedded Map */}
          <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200">
            <div className="bg-slate-700 text-white p-4">
              <h4 className="font-semibold flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m0 0L9 7"
                  />
                </svg>
                Find Us Here
              </h4>
            </div>
            <div className="relative h-64">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3742.9502007223405!2d85.79587337523589!3d20.26089998120317!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjDCsDE1JzM5LjIiTiA4NcKwNDcnNTQuNCJF!5e0!3m2!1sen!2sin!4v1765693591994!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      {/* Success Animation */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 text-center animate-bounce shadow-2xl max-w-md mx-4">
            <div className="text-6xl mb-4">✅</div>
            <h3 className="text-2xl font-bold text-green-600 mb-2">
              Message Sent Successfully!
            </h3>
            <p className="text-slate-600">
              Thanks for reaching out! We'll get back to you within 24 hours.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export { ContactSection };

