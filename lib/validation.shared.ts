/** Well-known disposable domains for instant client-side feedback. */
export const COMMON_DISPOSABLE_DOMAINS = [
  "10minutemail.com",
  "10minutemail.net",
  "10minutemail.org",
  "guerrillamail.com",
  "guerrillamail.net",
  "guerrillamail.org",
  "guerrillamail.biz",
  "guerrillamailblock.com",
  "mailinator.com",
  "mailinator.net",
  "mailinator2.com",
  "yopmail.com",
  "yopmail.fr",
  "yopmail.net",
  "yopmail.gq",
  "temp-mail.org",
  "temp-mail.io",
  "tempmail.com",
  "tempmail.net",
  "tempmailo.com",
  "throwaway.email",
  "getnada.com",
  "maildrop.cc",
  "sharklasers.com",
  "grr.la",
  "dispostable.com",
  "mailnesia.com",
  "mintemail.com",
  "mytemp.email",
  "emailondeck.com",
  "fakeinbox.com",
  "mailcatch.com",
  "mohmal.com",
  "tempr.email",
  "tmpmail.net",
  "tmpmail.org",
  "burnermail.io",
  "inboxkitten.com",
  "getairmail.com",
  "mailpoof.com",
  "mailsac.com",
  "mail.tm",
  "mail.gw",
  "dropmail.me",
  "harakirimail.com",
  "spamgourmet.com",
  "spamgourmet.net",
  "spamgourmet.org",
  "trashmail.com",
  "trashmail.me",
  "trashmail.net",
  "trashmail.org",
  "trashmail.at",
  "trashmail.de",
  "trashymail.com",
  "maildrop.cc",
  "getairmail.com",
  "mailnesia.com",
  "tempail.com",
  "tempemail.com",
  "tempinbox.com",
  "temporarymail.com",
  "fakemailgenerator.com",
  "emailfake.com",
  "crazymailing.com",
  "mailforspam.com",
  "spambox.us",
  "mytrashmail.com",
  "mailnull.com",
  "jetable.org",
  "jetable.com",
  "jetable.net",
  "mail-temporaire.fr",
  "wegwerfmail.de",
  "wegwerfmail.net",
  "wegwerfmail.org",
  "mailscrap.com",
  "mailzilla.org",
  "meltmail.com",
  "mailmoat.com",
  "mailhazard.com",
  "mailhz.me",
  "mailimate.com",
  "mailismagic.com",
  "mailquack.com",
  "mailrock.biz",
  "mailslite.com",
  "mailtemp.info",
  "mailtothis.com",
  "mailtrash.net",
  "mailtv.net",
  "mailtv.tv",
  "mailzilla.com",
  "mvrht.com",
  "mvrht.net",
  "my10minutemail.com",
  "mycleaninbox.net",
  "mymailoasis.com",
  "myphantomemail.com",
  "myspamless.com",
  "mytempemail.com",
  "neverbox.com",
  "nomail.pw",
  "nowmymail.com",
  "one-time.email",
  "oneoffemail.com",
  "onewaymail.com",
  "opayq.com",
  "pookmail.com",
  "quickinbox.com",
  "rejectmail.com",
  "rmqkr.net",
  "safetymail.info",
  "selfdestructingmail.com",
  "sharklasers.com",
  "spam4.me",
  "spambox.info",
  "spamdecoy.net",
  "spamex.com",
  "spamgourmet.com",
  "spamherelots.com",
  "spamhole.com",
  "spaml.com",
  "spammotel.com",
  "spamobox.com",
  "spamspot.com",
  "spamtrail.com",
  "spoofmail.de",
  "stuffmail.de",
  "superrito.com",
  "suremail.info",
  "teleworm.com",
  "teleworm.us",
  "tempalias.com",
  "tempe-mail.com",
  "tempemail.biz",
  "tempemail.co.za",
  "tempemail.net",
  "tempinbox.co.uk",
  "tempmail.eu",
  "tempmail.it",
  "tempmail2.com",
  "tempmaildemo.com",
  "tempmailer.com",
  "tempmailer.de",
  "tempomail.fr",
  "temporaryemail.net",
  "temporaryemail.us",
  "temporaryforwarding.com",
  "temporaryinbox.com",
  "temporarymailaddress.com",
  "tempthe.net",
  "thisisnotmyrealemail.com",
  "throwawayemailaddress.com",
  "tmailinator.com",
  "trash-amil.com",
  "trash-mail.at",
  "trash-mail.com",
  "trash-mail.de",
  "trash2009.com",
  "trash2010.com",
  "trash2011.com",
  "trashdevil.com",
  "trashdevil.de",
  "trashmail.ws",
  "trashmailer.com",
  "trashymail.net",
  "trialmail.de",
  "tyldd.com",
  "uggsrock.com",
  "veryrealemail.com",
  "viditag.com",
  "webemail.me",
  "wegwerfadresse.de",
  "wegwerfemail.de",
  "wh4f.org",
  "whyspam.me",
  "willselfdestruct.com",
  "wuzupmail.net",
  "xoxy.net",
  "yomail.info",
  "zoemail.com",
  "zoemail.net",
  "zoemail.org",
] as const;

const EMAIL_FORMAT =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

const NAME_RE = /^[\p{L}\s'.-]{2,80}$/u;

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function getEmailDomain(email: string): string {
  const at = email.lastIndexOf("@");
  return at === -1 ? "" : email.slice(at + 1).toLowerCase();
}

export function isDisposableDomain(
  domain: string,
  disposableSet: ReadonlySet<string>
): boolean {
  if (!domain) return false;
  if (disposableSet.has(domain)) return true;
  const parts = domain.split(".");
  for (let i = 1; i < parts.length; i++) {
    const parent = parts.slice(i).join(".");
    if (disposableSet.has(parent)) return true;
  }
  return false;
}

export function validateEmailFormat(email: string): string | null {
  const value = email.trim();
  if (!value) return "Email is required.";
  if (value.length > 254) return "Email is too long.";
  if (!EMAIL_FORMAT.test(value)) return "Enter a valid email address.";
  return null;
}

export function validateEmailNotDisposable(
  email: string,
  disposableSet: ReadonlySet<string>
): string | null {
  const formatError = validateEmailFormat(email);
  if (formatError) return formatError;
  const domain = getEmailDomain(normalizeEmail(email));
  if (isDisposableDomain(domain, disposableSet)) {
    return "Please use a permanent email address (temporary inboxes are not accepted).";
  }
  return null;
}

export function validateName(name: string): string | null {
  const value = name.trim();
  if (!value) return "Name is required.";
  if (!NAME_RE.test(value)) {
    return "Enter a valid name (letters, spaces, hyphens, and apostrophes only).";
  }
  return null;
}

export function validatePhone(phone: string): string | null {
  const value = phone.trim();
  if (!value) return "Phone number is required.";
  if (!/^[\d\s+().-]+$/.test(value)) {
    return "Enter a valid phone number.";
  }
  const digits = value.replace(/\D/g, "");
  if (digits.length < 7 || digits.length > 15) {
    return "Enter a valid phone number (7–15 digits).";
  }
  return null;
}

export function validateMessage(message: string): string | null {
  const value = message.trim();
  if (!value) return "Message is required.";
  if (value.length < 10) return "Message must be at least 10 characters.";
  if (value.length > 5000) return "Message is too long.";
  return null;
}

export function contactFieldsReadyForCaptcha(fields: {
  name: string;
  email: string;
  phone: string;
}): boolean {
  return (
    validateName(fields.name) === null &&
    validatePhone(fields.phone) === null &&
    validateEmailFormat(fields.email) === null
  );
}
