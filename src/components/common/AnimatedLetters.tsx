import { Fragment } from 'react';

/**
 * Splits a heading into letters, each carrying its index (--l), for the
 * letter-by-letter reveal and the looping wave (see `.rv-letters` in
 * index.css). Words stay unbreakable so a line never wraps inside a word.
 * `offset` continues the numbering across several pieces of one heading.
 */
export const AnimatedLetters = ({
  text,
  offset = 0,
  accent = false,
}: {
  text: string;
  offset?: number;
  accent?: boolean;
}) => {
  let index = offset;
  const className = accent ? 'title-letter accent-letter' : 'title-letter';
  const words = text.split(' ');
  return (
    <>
      {words.map((word, w) => (
        <Fragment key={w}>
          <span className="inline-block whitespace-nowrap">
            {[...word].map((char) => {
              const l = index++;
              return (
                <span key={l} className={className} style={{ '--l': l } as React.CSSProperties}>
                  {char}
                </span>
              );
            })}
          </span>
          {w < words.length - 1 && (index++, ' ')}
        </Fragment>
      ))}
    </>
  );
};

/**
 * Standard section title: plain part + italic serif accent, animated.
 * The full sentence is exposed once to screen readers.
 */
export const AnimatedTitle = ({ title, accent }: { title: string; accent: string }) => {
  // French elision ("L’" + "architecture"): no space after an apostrophe.
  const sep = /['’]$/.test(title) ? '' : ' ';
  return (
    <>
      <span className="sr-only">{`${title}${sep}${accent}`}</span>
      <span className="rv-mask rv-letters" aria-hidden="true">
        <span>
          <AnimatedLetters text={title} />
          {sep}
          <span className="serif-accent">
            <AnimatedLetters text={accent} offset={title.length + 1} accent />
          </span>
        </span>
      </span>
    </>
  );
};
