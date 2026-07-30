export function GlitchText({ text, className = "" }: { text: string; className?: string }) {
  return (
    <span className={`glitch relative inline-block ${className}`} data-text={text}>
      {text}
    </span>
  );
}
