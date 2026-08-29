'use client';

import { FormEvent, useState } from 'react';

export function BookingForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = [
      `Name: ${data.get('name')}`,
      `Business: ${data.get('business')}`,
      `Trade: ${data.get('trade')}`,
      `Mobile: ${data.get('mobile')}`,
      `Email: ${data.get('email')}`,
      `Best time: ${data.get('time')}`,
      `Biggest phone problem: ${data.get('problem')}`,
    ].join('\n');

    const mailto = `mailto:hello@tradierelay.com.au?subject=${encodeURIComponent('TradieRelay call request')}&body=${encodeURIComponent(body)}`;
    setSent(true);
    window.location.href = mailto;
  }

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label><span>Your name</span><input name="name" autoComplete="name" required /></label>
        <label><span>Business name</span><input name="business" autoComplete="organization" required /></label>
        <label><span>Trade</span>
          <select name="trade" required defaultValue="">
            <option value="" disabled>Choose your trade</option>
            <option>Electrical</option><option>Plumbing</option><option>Air conditioning</option>
            <option>Building</option><option>Landscaping</option><option>Painting</option><option>Other</option>
          </select>
        </label>
        <label><span>Mobile</span><input name="mobile" type="tel" inputMode="tel" autoComplete="tel" required /></label>
        <label><span>Email</span><input name="email" type="email" autoComplete="email" required /></label>
        <label><span>Best time to call</span>
          <select name="time" required defaultValue="">
            <option value="" disabled>Choose a time</option>
            <option>Before 8am</option><option>8am–12pm</option><option>12pm–4pm</option><option>After 4pm</option>
          </select>
        </label>
      </div>
      <label><span>What is the biggest phone or follow-up problem?</span><textarea name="problem" rows={4} placeholder="For example: I miss calls when I'm on jobs, then spend the evening ringing people back." required /></label>
      <button type="submit" className="button form-submit">Request my 15-minute call</button>
      <p className="form-note">No pressure and no tech lecture. Noah will use these details to make the call useful.</p>
      {sent && <p className="form-success" role="status">Your email app should now open with the request ready to send.</p>}
    </form>
  );
}
