import { Turnstile } from "@marsidev/react-turnstile";

interface TurnstileWidgetProps {
  onToken: (token: string) => void;
  onExpire?: () => void;
  className?: string;
}

export function TurnstileWidget({
  onToken,
  onExpire,
  className = "",
}: TurnstileWidgetProps) {
  const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined;

  if (!siteKey) {
    return (
      <p className={`font-sans text-sm text-brand ${className}`} role="alert">
        Captcha is not configured. Add VITE_TURNSTILE_SITE_KEY to your environment.
      </p>
    );
  }

  return (
    <div className={className}>
      <Turnstile
        siteKey={siteKey}
        onSuccess={onToken}
        onExpire={() => {
          onExpire?.();
          onToken("");
        }}
        onError={() => {
          onToken("");
        }}
        options={{
          theme: "light",
          size: "normal",
        }}
      />
    </div>
  );
}
