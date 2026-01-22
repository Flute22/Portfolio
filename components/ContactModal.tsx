import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle, AlertCircle, Phone, Mail, User, MessageSquare, AlertTriangle } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormDataState {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<FormDataState>({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionError(null);

    if (validate()) {
      setIsSubmitting(true);
      
      try {
        // We use JSON for the AJAX request as it is the standard documented method for FormSubmit AJAX
        const response = await fetch("https://formsubmit.co/ajax/khushalsinhmar@gmail.com", {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone || "Not provided",
            message: formData.message,
            _subject: `Portfolio Query from ${formData.name}`,
            _template: "table",
            _captcha: "false" // Disable captcha to prevent interaction issues
          })
        });

        const result = await response.json();

        // FormSubmit returns success: "true" (string) or true (boolean) depending on version
        if (response.ok && (result.success === "true" || result.success === true)) {
          setIsSuccess(true);
          setTimeout(() => {
            onClose();
            // Reset form state after modal closes
            setTimeout(() => {
              setIsSuccess(false);
              setFormData({ name: '', email: '', phone: '', message: '' });
              setSubmissionError(null);
            }, 300);
          }, 3000);
        } else {
          // Extract specific error message from server response if available
          throw new Error(result.message || "Unable to send message. Please try again.");
        }
      } catch (error) {
        console.error("Submission Error:", error);
        // Display the actual error message to help with debugging (e.g., "Activate email")
        const errorMessage = error instanceof Error ? error.message : "Something went wrong. Please try again later.";
        setSubmissionError(errorMessage);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
    if (submissionError) {
      setSubmissionError(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-lg bg-surface border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-slide-up">
        
        <div className="flex items-center justify-between p-6 border-b border-white/5 bg-surfaceHighlight/20">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Mail className="w-5 h-5 text-primary" />
            Get in Touch
          </h2>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 md:p-8">
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center py-12 text-center animate-fade-in">
              <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mb-4 border border-emerald-500/20">
                <CheckCircle className="w-8 h-8 text-emerald-500" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
              <p className="text-slate-400 max-w-xs">
                Thanks for reaching out. I'll get back to you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                  <User className="w-4 h-4 text-primary" />
                  Name <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full bg-background/50 border ${errors.name ? 'border-red-500/50' : 'border-white/10'} rounded-lg px-4 py-3 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all`}
                    placeholder="John Doe"
                  />
                  {errors.name && (
                    <div className="absolute right-3 top-3.5 text-red-400 animate-pulse">
                      <AlertCircle className="w-5 h-5" />
                    </div>
                  )}
                </div>
                {errors.name && <p className="text-xs text-red-400">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-primary" />
                  Email <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full bg-background/50 border ${errors.email ? 'border-red-500/50' : 'border-white/10'} rounded-lg px-4 py-3 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all`}
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <div className="absolute right-3 top-3.5 text-red-400 animate-pulse">
                      <AlertCircle className="w-5 h-5" />
                    </div>
                  )}
                </div>
                {errors.email && <p className="text-xs text-red-400">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-primary" />
                  Phone <span className="text-slate-500 text-xs font-normal">(Optional)</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-background/50 border border-white/10 rounded-lg px-4 py-3 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                  placeholder="+1 (555) 000-0000"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-primary" />
                  Message <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className={`w-full bg-background/50 border ${errors.message ? 'border-red-500/50' : 'border-white/10'} rounded-lg px-4 py-3 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all resize-none`}
                    placeholder="How can we help you today?"
                  />
                  {errors.message && (
                    <div className="absolute right-3 top-3.5 text-red-400 animate-pulse">
                      <AlertCircle className="w-5 h-5" />
                    </div>
                  )}
                </div>
                {errors.message && <p className="text-xs text-red-400">{errors.message}</p>}
              </div>

              {/* Error Message Display - Now shows specific error text */}
              {submissionError && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-3 animate-fade-in">
                  <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-red-300">Submission Error</p>
                    <p className="text-xs text-red-200 mt-1 leading-relaxed">{submissionError}</p>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary/90 text-surface font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed group shadow-[0_0_20px_rgba(56,189,248,0.2)] hover:shadow-[0_0_30px_rgba(56,189,248,0.4)]"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-surface border-t-transparent rounded-full animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};