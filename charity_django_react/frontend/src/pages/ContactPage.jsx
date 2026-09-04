import { CheckCircle2, Clock3, Mail, MapPin, Phone } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';

export function ContactPage({ data }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [donationForm, setDonationForm] = useState({
    name: '',
    email: '',
    address: '',
    country: '',
    date: '',
    amount: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
  });
  const [status, setStatus] = useState({ type: '', message: '' });

  useEffect(() => {
    if (location.state?.eventTitle) {
      setContactForm((current) => ({
        ...current,
        subject: `Event registration: ${location.state.eventTitle}`,
      }));
    }
  }, [location.state]);

  const handleContactChange = (event) => {
    setContactForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleDonationChange = (event) => {
    setDonationForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleContactSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${API_BASE_URL}/api/contact/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactForm),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'Unable to send message.');
      }

      setStatus({ type: 'success', message: result.message });
      setContactForm({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setStatus({ type: 'error', message: error.message || 'Unable to send message.' });
    }
  };

  const handleDonationSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${API_BASE_URL}/api/donate/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(donationForm),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'Unable to process donation.');
      }

      const donationReceipt = {
        donorName: donationForm.name,
        amount: donationForm.amount,
        date: donationForm.date || new Date().toISOString().slice(0, 10),
        id: result.donationId ? `HB-${result.donationId}` : 'HB-0000',
        paymentMethod: 'International Card',
      };

      setStatus({ type: 'success', message: result.message });
      setDonationForm({ name: '', email: '', address: '', country: '', date: '', amount: '', cardNumber: '', expiry: '', cvc: '' });
      navigate('/receipt', { state: { donation: donationReceipt } });
    } catch (error) {
      setStatus({ type: 'error', message: error.message || 'Unable to process donation.' });
    }
  };

  return (
    <div className="container section-block contact-page">
      <div className="section-heading center-heading">
        <span className="eyebrow">Contact us</span>
        <h1>Connect with us and make a difference</h1>
      </div>

      <div className="contact-layout">
        <div className="contact-card">
          <h3>Send a message</h3>
          <form className="contact-form" onSubmit={handleContactSubmit}>
            <div className="form-row">
              <label>
                Name
                <input type="text" name="name" value={contactForm.name} onChange={handleContactChange} placeholder="Your name" required />
              </label>
              <label>
                Email
                <input type="email" name="email" value={contactForm.email} onChange={handleContactChange} placeholder="Your email" required />
              </label>
            </div>
            <label>
              Subject
              <input type="text" name="subject" value={contactForm.subject} onChange={handleContactChange} placeholder="How can we help?" />
            </label>
            <label>
              Message
              <textarea rows="5" name="message" value={contactForm.message} onChange={handleContactChange} placeholder="Tell us more about your idea or question" required />
            </label>
            <button type="submit" className="primary-btn">
              Send message
            </button>
          </form>
        </div>

        <div className="sidebar-column">
          <div className="mini-card donation-box">
            <h3>Donate online</h3>
            <p className="donation-note">International card donations are welcome for supporters anywhere in the world.</p>
            <form className="donation-form" onSubmit={handleDonationSubmit}>
              <label>
                Full Name
                <input type="text" name="name" value={donationForm.name} onChange={handleDonationChange} required />
              </label>
              <label>
                Email
                <input type="email" name="email" value={donationForm.email} onChange={handleDonationChange} required />
              </label>
              <label>
                Address
                <input type="text" name="address" value={donationForm.address} onChange={handleDonationChange} placeholder="Street, city, country" required />
              </label>
              <label>
                Country
                <input type="text" name="country" value={donationForm.country} onChange={handleDonationChange} placeholder="Bangladesh" required />
              </label>
              <label>
                Card Number
                <input type="text" name="cardNumber" value={donationForm.cardNumber} onChange={handleDonationChange} placeholder="1234 5678 9012 3456" required />
              </label>
              <div className="form-row donation-mini-row">
                <label>
                  Expiry
                  <input type="text" name="expiry" value={donationForm.expiry} onChange={handleDonationChange} placeholder="MM/YY" required />
                </label>
                <label>
                  CVC
                  <input type="text" name="cvc" value={donationForm.cvc} onChange={handleDonationChange} placeholder="123" required />
                </label>
              </div>
              <div className="form-row donation-mini-row">
                <label>
                  Date
                  <input type="date" name="date" value={donationForm.date} onChange={handleDonationChange} required />
                </label>
                <label>
                  Amount
                  <input type="number" name="amount" min="1" step="0.01" value={donationForm.amount} onChange={handleDonationChange} placeholder="25.00" required />
                </label>
              </div>
              <button type="submit" className="primary-btn">
                Donate now
              </button>
            </form>
          </div>

          <div className="mini-card info-stack">
            <div className="info-row">
              <Phone size={18} />
              <span>{data.contact.phone}</span>
            </div>
            <div className="info-row">
              <Mail size={18} />
              <span>{data.contact.email}</span>
            </div>
            <div className="info-row">
              <MapPin size={18} />
              <span>{data.contact.address}</span>
            </div>
            <div className="info-row">
              <Clock3 size={18} />
              <span>{data.contact.hours}</span>
            </div>
          </div>

          <div className="mini-card faq-card">
            <h3>Frequently asked questions</h3>
            {data.faq.map((item) => (
              <div key={item.question} className="faq-item">
                <div className="faq-question">
                  <CheckCircle2 size={16} />
                  <span>{item.question}</span>
                </div>
                <p>{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {status.message && (
        <div className={`status-banner ${status.type === 'success' ? 'success' : 'error'}`}>
          {status.message}
        </div>
      )}
    </div>
  );
}
