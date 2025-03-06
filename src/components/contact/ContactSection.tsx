"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiSend, FiInstagram, FiYoutube, FiLinkedin, FiTwitter, FiMail, FiMapPin, FiPhone } from "react-icons/fi";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    
    // The form will be handled by Netlify
    // This is just for user feedback
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitSuccess(true);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      setError("There was an error submitting your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-padding bg-[var(--background)]">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="heading-lg mb-4">
            <span className="text-[var(--primary)]">GET IN</span> TOUCH
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Interested in collaborating or have a project in mind? I'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-6">Let's Create Something Together</h3>
                <p className="text-gray-300 mb-8">
                  I'm open to discussing new projects, creative ideas or opportunities to be part of your vision.
                </p>
              </div>

              <div className="space-y-6">
                {/* Contact Details */}
                <div className="flex items-start">
                  <div className="text-[var(--primary)] mr-4 mt-1">
                    <FiMail size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Email</h4>
                    <p className="text-gray-300">info@jonasvision.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="text-[var(--primary)] mr-4 mt-1">
                    <FiMapPin size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Location</h4>
                    <p className="text-gray-300">Worldwide</p>
                  </div>
                </div>
              </div>

              {/* Social Media Links */}
              <div>
                <h4 className="font-bold text-white mb-4">Connect</h4>
                <div className="flex space-x-4">
                  <a 
                    href="https://instagram.com/jonesdahlke" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-[var(--secondary)] hover:bg-[var(--primary)] text-white p-3 rounded-full transition-colors"
                  >
                    <FiInstagram size={20} />
                  </a>
                  <a 
                    href="https://youtube.com/jonesaway" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-[var(--secondary)] hover:bg-[var(--primary)] text-white p-3 rounded-full transition-colors"
                  >
                    <FiYoutube size={20} />
                  </a>
                  <a 
                    href="https://de.linkedin.com/in/jonas-dahlke" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-[var(--secondary)] hover:bg-[var(--primary)] text-white p-3 rounded-full transition-colors"
                  >
                    <FiLinkedin size={20} />
                  </a>
                  <a 
                    href="https://twitter.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-[var(--secondary)] hover:bg-[var(--primary)] text-white p-3 rounded-full transition-colors"
                  >
                    <FiTwitter size={20} />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {submitSuccess ? (
              <div className="bg-green-900/20 border border-green-800 rounded-lg p-8 text-center">
                <div className="text-green-400 mx-auto mb-4">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M22 4L12 14.01l-3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Message Sent Successfully!</h3>
                <p className="text-gray-300 mb-6">Thank you for reaching out. I'll get back to you as soon as possible.</p>
                <button 
                  onClick={() => setSubmitSuccess(false)}
                  className="btn-primary"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form 
                onSubmit={handleSubmit} 
                className="bg-[var(--secondary)] p-8 rounded-lg"
                name="contact"
                method="POST"
                data-netlify="true"
                data-netlify-recaptcha="true"
                netlify-honeypot="bot-field"
              >
                {/* Hidden field for Netlify */}
                <input type="hidden" name="form-name" value="contact" />
                
                {/* Honeypot field to catch bots */}
                <p className="hidden">
                  <label>
                    Don't fill this out if you're human: <input name="bot-field" />
                  </label>
                </p>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-white mb-2">Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-[var(--background)] border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-white"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-white mb-2">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-[var(--background)] border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-white"
                        placeholder="Your email"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-white mb-2">Subject</label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[var(--background)] border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-white"
                    >
                      <option value="">Select a subject</option>
                      <option value="Project Inquiry">Project Inquiry</option>
                      <option value="Collaboration">Collaboration</option>
                      <option value="Job Opportunity">Job Opportunity</option>
                      <option value="General Inquiry">General Inquiry</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-white mb-2">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[var(--background)] border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-white h-32"
                      placeholder="Your message"
                    ></textarea>
                  </div>
                  
                  {/* Netlify reCAPTCHA */}
                  <div className="bg-[var(--background)] p-4 rounded-md" data-netlify-recaptcha="true"></div>
                  
                  {error && <p className="text-red-500">{error}</p>}
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <span className="inline-block w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin mr-2"></span>
                    ) : (
                      <FiSend className="mr-2" />
                    )}
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection; 