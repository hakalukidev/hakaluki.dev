import { cn } from '@/lib/utils';

export interface TweetCardProps {
  name: string;
  handle: string;
  text: string;
  date?: string;
  href?: string;
  className?: string;
}

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/);
  const initials = parts.length > 1 ? `${parts[0][0]}${parts[parts.length - 1][0]}` : parts[0].slice(0, 2);
  return initials.toUpperCase();
}

export function TweetCard({ name, handle, text, date, href, className }: TweetCardProps) {
  return (
    <div
      className={cn(
        'tweet-card',
        className,
      )}
    >
      <div className="tweet-card-header">
        <span className="tweet-card-avatar" aria-hidden="true">
          {getInitials(name)}
        </span>
        <div className="tweet-card-identity">
          <span className="tweet-card-name">{name}</span>
          {href ? (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="tweet-card-handle tweet-card-handle-link"
            >
              {handle}
            </a>
          ) : (
            <span className="tweet-card-handle">{handle}</span>
          )}
        </div>
      </div>

      <p className="tweet-card-text">{text}</p>

      {date ? <span className="tweet-card-date">{date}</span> : null}
    </div>
  );
}
