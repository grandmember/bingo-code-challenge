import type { ElementType } from 'react';
import React from 'react';

type Variant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'body'
  | 'body-small'
  | 'small';

interface Props {
  variant: Variant;
  children: React.ReactNode;
  className?: string;
  as?: ElementType;
}

const tags: Record<Variant, ElementType> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  body: 'p',
  'body-small': 'p',
  small: 'span',
};

// TODO adjust sizes concisely
// const sizes: Record<Variant, string> = {
//   h1: 'text-6xl font-bold sm:text-4xl',
//   h2: 'text-4xl font-bold sm:text-3xl',
//   h3: 'text-3xl font-bold sm:text-2xl',
//   h4: 'text-2xl font-bold sm:text-1xl',
//   h5: 'text-xl font-bold sm:text-lg',
//   body: 'text-lg sm:text-md',
//   'body-small': 'text-md sm:text-sm',
//   small: 'text-sm sm:text-xs lg:text-lg',
// };

const sizes: Record<Variant, string> = {
  h1: 'text-4xl font-bold sm:text-4xl md:text-5xl lg:text-6xl xl:text-6xl 2xl:text-6xl',
  h2: 'text-3xl font-bold sm:text-3xl md:text-4xl lg:text-4xl xl:text-4xl 2xl:text-4xl',
  h3: 'text-2xl font-bold sm:text-2xl md:text-3xl lg:text-3xl xl:text-3xl 2xl:text-3xl',
  h4: 'text-xl font-bold sm:text-xl md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-2xl',
  h5: 'text-lg font-bold sm:text-lg md:text-xl lg:text-xl xl:text-xl 2xl:text-xl',
  body: 'text-md sm:text-md md:text-lg lg:text-lg xl:text-lg 2xl:text-lg',
  'body-small':
    'text-sm sm:text-sm md:text-md lg:text-md xl:text-md 2xl:text-md',
  small: 'text-xs sm:text-xs md:text-sm lg:text-sm xl:text-lg 2xl:text-lg',
};

export const Typography = ({ variant, children, className, as }: Props) => {
  const sizeClasses = sizes[variant];
  const Tag = as || tags[variant];

  return <Tag className={`${sizeClasses} ${className}`}>{children}</Tag>;
};
