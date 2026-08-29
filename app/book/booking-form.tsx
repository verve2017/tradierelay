'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';

export function BookingForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = [
      `Name: ${data.get('name')}`,
      `Business: ${data.get('business')}`,
      `Trade: ${data.get('trade')}`,
      `Team size: ${data.get('teamSize')}`,
      `Missed calls estimate: ${data.get('missedCalls')}`,
      `Current system: ${data.get('currentSystem')}`,
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
        <label><span>Team size</span>
          <select name="teamSize" required defaultValue="">
            <option value="" disabled>Choose team size</option>
            <option>Sole trader</option><option>2–3 people</option><option>4–8 people</option><option>9+ people</option>
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
        <label><span>Missed calls in a normal week</span>
          <select name="missedCalls" required defaultValue="">
            <option value="" disabled>Choose an estimate</option>
            <option>1–5</option><option>6–15</option><option>16–30</option><option>More than 30</option><option>Not sure</option>
          </select>
        </label>
        <label><span>Current phone / job system</span><input name="currentSystem" placeholder="For example: mobile + ServiceM8" /></label>
      </div>
      <label><span>What is the biggest phone or follow-up problem?</span><textarea name="problem" rows={4} placeholder="For example: I miss calls when I'm on jobs, then spend the evening ringing people back." required /></label>
      <label className="form-consent"><input type="checkbox" required /><span>I’m happy for Noah to use these details to contact me about TradieRelay.</span></label>
      <button type="submit" className="button form-submit">Prepare my call request</button>
      <p className="form-note">This opens a ready-to-send email in your own email app. The website does not save the form. <Link href="/privacy">Privacy notice</Link>.</p>
      {sent && <p className="form-success" role="status">Your email app should now be open. Review the request and press send to complete it.</p>}
    </form>
  );
}
