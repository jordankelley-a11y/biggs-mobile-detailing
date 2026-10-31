import { useState, type FormEvent } from 'react';
import BookButton from './BookButton';
import Reveal from './Reveal';
import { ALL_PACKAGES, SITE, instagramDmUrl, isConfigured } from '../config/site';

type FieldName = 'name' | 'contact' | 'vehicle' | 'service' | 'message';
type Values = Record<FieldName, string>;
type Errors = Partial<Record<FieldName, string>>;

type Status =
  | { kind: 'idle' }
  | { kind: 'sending' }
  | { kind: 'sent' }
  | { kind: 'mailto' }
  | { kind: 'error' }
  | { kind: 'unconfigured' };

const EMPTY: Values = { name: '', contact: '', vehicle: '', service: '', message: '' };
const FIELD_ORDER: FieldName[] = ['name', 'contact', 'vehicle', 'service', 'message'];

function validate(v: Values): Errors {
  const e: Errors = {};
  if (!v.name.trim()) e.name = 'Please enter your name.';

  const c = v.contact.trim();
  const looksLikeEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(c);
  const looksLikePhone = c.replace(/\D/g, '').length >= 10 && /^[\d\s().+-]+$/.test(c);
  if (!c) e.contact = 'Please enter a phone number or email so we can reach you.';
  else if (!looksLikeEmail && !looksLikePhone) e.contact = 'Enter a valid email (name@example.com) or a 10-digit phone number.';

  if (!v.vehicle.trim()) e.vehicle = 'Please tell us the year, make and model (e.g. 2021 Ford F-150).';
  if (!v.service) e.service = 'Please choose a service.';
  if (v.message.length > 1000) e.message = 'Please keep your message under 1,000 characters.';
  return e;
}

const inputBase =
  'w-full border bg-ink px-4 py-3.5 text-base text-white placeholder:text-white/35 focus:border-white focus:outline-none';

export default function Contact() {
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>({ kind: 'idle' });

  const hasEndpoint = isConfigured(SITE.contactFormEndpoint);
  const hasEmail = isConfigured(SITE.contactEmail);
  const phoneHref = isConfigured(SITE.phone) ? `tel:${SITE.phone.replace(/[^\d+]/g, '')}` : null;

  const set = (name: FieldName) => (e: { target: { value: string } }) => {
    setValues((v) => ({ ...v, [name]: e.target.value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const errs = validate(values);
    setErrors(errs);
    const firstBad = FIELD_ORDER.find((f) => errs[f]);
    if (firstBad) {
      setStatus({ kind: 'idle' });
      (form.elements.namedItem(firstBad) as HTMLElement | null)?.focus();
      return;
    }

    const summary = [
      `Name: ${values.name.trim()}`,
      `Phone / email: ${values.contact.trim()}`,
      `Vehicle: ${values.vehicle.trim()}`,
      `Service: ${values.service}`,
      '',
      values.message.trim(),
    ].join('\n');

    if (hasEndpoint) {
      setStatus({ kind: 'sending' });
      try {
        const res = await fetch(SITE.contactFormEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ ...values, _subject: `New website inquiry — ${values.service}` }),
        });
        if (!res.ok) throw new Error(String(res.status));
        setStatus({ kind: 'sent' });
        setValues(EMPTY);
      } catch {
        setStatus({ kind: 'error' });
      }
      return;
    }

    if (hasEmail) {
      const subject = encodeURIComponent(`Website inquiry — ${values.service}`);
      window.location.href = `mailto:${SITE.contactEmail}?subject=${subject}&body=${encodeURIComponent(summary)}`;
      setStatus({ kind: 'mailto' });
      return;
    }

    // Nothing is connected yet: be honest rather than pretend the message was sent.
    setStatus({ kind: 'unconfigured' });
  }

  const err = (n: FieldName) => errors[n];
  const fieldProps = (n: FieldName) => ({
    id: `contact-${n}`,
    name: n,
    value: values[n],
    onChange: set(n),
    'aria-invalid': err(n) ? (true as const) : undefined,
    'aria-describedby': err(n) ? `contact-${n}-error` : undefined,
    className: `${inputBase} ${err(n) ? 'border-accent' : 'border-line'}`,
  });
  const ErrorText = ({ n }: { n: FieldName }) =>
    err(n) ? (
      <p id={`contact-${n}-error`} className="mt-1.5 text-sm text-[#ff8a8f]">
        {err(n)}
      </p>
    ) : null;

  return (
    <section id="contact" aria-labelledby="contact-title" className="bg-charcoal py-20 sm:py-28">
      <div className="container-page grid gap-14 lg:grid-cols-5 lg:gap-16">
        <Reveal className="lg:col-span-2">
          <p className="eyebrow mb-4">Contact</p>
          <h2 id="contact-title" className="section-title">
            Let’s talk.
          </h2>

          <dl className="mt-8 space-y-6 text-silver">
            <div>
              <dt className="eyebrow !text-white">{SITE.name}</dt>
              <dd className="mt-1">
                {SITE.city}, {SITE.state}
              </dd>
            </div>
            <div>
              <dt className="eyebrow">Service area</dt>
              <dd className="mt-1">{SITE.serviceArea}</dd>
            </div>
            <div>
              <dt className="eyebrow">Phone</dt>
              <dd className="mt-1">
                {phoneHref ? (
                  <a href={phoneHref} className="text-white underline-offset-4 hover:underline">
                    {SITE.phone}
                  </a>
                ) : (
                  <span>{SITE.phone}</span>
                )}
              </dd>
            </div>
            <div>
              <dt className="eyebrow">Follow</dt>
              <dd className="mt-1 flex gap-6">
                {isConfigured(SITE.instagramUrl) ? (
                  <a href={SITE.instagramUrl} target="_blank" rel="noopener noreferrer" className="text-white underline-offset-4 hover:underline">
                    Instagram<span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ) : (
                  <span>Instagram — coming soon</span>
                )}
                {isConfigured(SITE.facebookUrl) ? (
                  <a href={SITE.facebookUrl} target="_blank" rel="noopener noreferrer" className="text-white underline-offset-4 hover:underline">
                    Facebook<span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ) : null}
              </dd>
            </div>
          </dl>

          <div className="mt-10 border-t border-line pt-8">
            <p className="mb-4 text-sm text-silver">Ready to schedule? Booking takes just a minute.</p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <BookButton className="w-full sm:w-auto" />
              {instagramDmUrl() ? (
                <a href={instagramDmUrl()} target="_blank" rel="noopener noreferrer" className="btn-outline w-full sm:w-auto">
                  MESSAGE US ON INSTAGRAM
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              ) : null}
            </div>
          </div>
        </Reveal>

        <Reveal className="lg:col-span-3" delay={100}>
          <form onSubmit={onSubmit} noValidate aria-label="Contact form" className="border border-line bg-panel p-6 sm:p-10">
            <p className="mb-6 text-xs text-silver">Fields marked * are required.</p>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="contact-name" className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em]">
                  Name *
                </label>
                <input type="text" autoComplete="name" required {...fieldProps('name')} />
                <ErrorText n="name" />
              </div>
              <div>
                <label htmlFor="contact-contact" className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em]">
                  Phone or email *
                </label>
                <input type="text" autoComplete="email" inputMode="email" required {...fieldProps('contact')} />
                <ErrorText n="contact" />
              </div>
              <div>
                <label htmlFor="contact-vehicle" className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em]">
                  Vehicle year, make &amp; model *
                </label>
                <input type="text" placeholder="e.g. 2021 Ford F-150" required {...fieldProps('vehicle')} />
                <ErrorText n="vehicle" />
              </div>
              <div>
                <label htmlFor="contact-service" className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em]">
                  Service interested in *
                </label>
                <select required {...fieldProps('service')}>
                  <option value="">Select a service</option>
                  {ALL_PACKAGES.map((s) => (
                    <option key={s.id} value={s.name}>
                      {s.name}
                    </option>
                  ))}
                  <option value="Not sure yet">Not sure yet</option>
                </select>
                <ErrorText n="service" />
              </div>
            </div>

            <div className="mt-5">
              <label htmlFor="contact-message" className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em]">
                Message
              </label>
              <textarea rows={5} {...fieldProps('message')} />
              <ErrorText n="message" />
            </div>

            <button type="submit" disabled={status.kind === 'sending'} className="btn-outline mt-7 w-full disabled:opacity-60 sm:w-auto">
              {status.kind === 'sending' ? 'SENDING…' : 'SEND MESSAGE'}
            </button>

            <div role="status" aria-live="polite" className="mt-5 text-sm leading-relaxed">
              {status.kind === 'sent' ? <p className="text-white">Thank you — your message was sent. We’ll be in touch soon.</p> : null}
              {status.kind === 'mailto' ? (
                <p className="text-silver">Your email app should have opened with your message ready to send. If it didn’t, email us at {SITE.contactEmail}.</p>
              ) : null}
              {status.kind === 'error' ? (
                <p className="text-[#ff8a8f]">Sorry — your message didn’t go through. Please try again, or use the booking button to schedule directly.</p>
              ) : null}
              {status.kind === 'unconfigured' ? (
                <p className="text-silver">
                  Our contact form isn’t connected yet, so your message was <strong className="text-white">not</strong> sent. Please use “Book your detail” or call us{isConfigured(SITE.phone) ? ` at ${SITE.phone}` : ''}.
                </p>
              ) : null}
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
