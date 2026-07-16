'use client';

import { useState } from 'react';
import {
  ArrowUpRight,
  Briefcase,
  ChevronDown,
  Loader2,
  Mail,
  MessageSquare,
  Phone,
  User,
} from 'lucide-react';

import { services } from '@/app/data/services';
import { RippleButton } from '@/components/ui/ripple-button';
import { cn } from '@/lib/utils';

const projectTypes = ['New project', 'Ongoing support', 'Redesign', 'Consultation', 'Other'];

const MESSAGE_LIMIT = 300;

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [projectType, setProjectType] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errorText, setErrorText] = useState('');

  const toggleService = (title: string) => {
    setSelectedServices((prev) =>
      prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title]
    );
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus('submitting');
    setErrorText('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          projectType,
          services: selectedServices,
          message,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong. Please try again.');
      }

      setStatus('success');
      setName('');
      setEmail('');
      setPhone('');
      setProjectType('');
      setSelectedServices([]);
      setMessage('');
    } catch (error) {
      setStatus('error');
      setErrorText(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-field">
          <label className="form-label" htmlFor="contact-name">Full Name</label>
          <div className="form-input-wrap">
            <User className="form-input-icon" size={16} />
            <input
              id="contact-name"
              className="form-input"
              type="text"
              placeholder="Enter your full name..."
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              maxLength={200}
            />
          </div>
        </div>

        <div className="form-field">
          <label className="form-label" htmlFor="contact-email">Email Address</label>
          <div className="form-input-wrap">
            <Mail className="form-input-icon" size={16} />
            <input
              id="contact-email"
              className="form-input"
              type="email"
              placeholder="Enter your email address..."
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              maxLength={200}
            />
          </div>
        </div>
      </div>

      <div className="form-row">
        <div className="form-field">
          <label className="form-label" htmlFor="contact-phone">Phone Number</label>
          <div className="form-input-wrap">
            <Phone className="form-input-icon" size={16} />
            <input
              id="contact-phone"
              className="form-input"
              type="tel"
              placeholder="Enter your phone number..."
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              maxLength={60}
            />
          </div>
        </div>

        <div className="form-field">
          <label className="form-label" htmlFor="contact-project-type">Project Type</label>
          <div className="form-input-wrap">
            <Briefcase className="form-input-icon" size={16} />
            <select
              id="contact-project-type"
              className="form-input form-select"
              value={projectType}
              onChange={(event) => setProjectType(event.target.value)}
            >
              <option value="">Select project type...</option>
              {projectTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            <ChevronDown className="form-select-chevron" size={15} aria-hidden="true" />
          </div>
        </div>
      </div>

      <div className="form-field">
        <span className="form-label">Choose Our Services</span>
        <div className="form-services">
          {[...services.map((service) => service.title), 'Other'].map((title) => {
            const checked = selectedServices.includes(title);
            return (
              <label key={title} className="form-checkbox">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleService(title)}
                />
                <span className="form-checkbox-box" aria-hidden="true" />
                {title}
              </label>
            );
          })}
        </div>
      </div>

      <div className="form-field">
        <label className="form-label" htmlFor="contact-message">Message</label>
        <div className="form-textarea-wrap">
          <textarea
            id="contact-message"
            className="form-textarea"
            placeholder="Enter your main text here..."
            value={message}
            onChange={(event) => setMessage(event.target.value.slice(0, MESSAGE_LIMIT))}
            maxLength={MESSAGE_LIMIT}
            rows={5}
            required
          />
          <span className="form-counter">{message.length}/{MESSAGE_LIMIT}</span>
        </div>
      </div>

      <RippleButton
        type="submit"
        rippleColor="rgba(255,255,255,0.7)"
        className={cn('cta-ripple', 'form-submit')}
        disabled={status === 'submitting'}
      >
        {status === 'submitting' ? (
          <>
            Sending
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
          </>
        ) : (
          <>
          <p className="flex items-center gap-2">
            Send Message
            <ArrowUpRight className="size-4" aria-hidden="true" /></p>
          </>
        )}
      </RippleButton>

      {status === 'success' && (
        <p className="form-status form-status-success">
          <MessageSquare className="size-4" aria-hidden="true" />
          Thanks — your message is on its way to our team.
        </p>
      )}

      {status === 'error' && (
        <p className="form-status form-status-error">{errorText}</p>
      )}
    </form>
  );
}
