import * as React from 'react';

type Props = Omit<
  React.ComponentPropsWithoutRef<'svg'>,
  'xmlns' | 'version' | 'viewBox' | 'className'
>;

const icon = (props: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    viewBox="16 16 32 32"
    className="icon"
    {...props}
  >
    <path d="M44.584,43.126l-7.489-11.73v-4.722h0.425c1.753,0,3.335-1.432,3.335-3.29v-1.35 c0-1.857-1.582-3.328-3.335-3.328H26.736c-1.753,0-3.428,1.471-3.428,3.328v1.35c0,1.857,1.674,3.29,3.428,3.29h0.332v4.721 l-7.442,11.731c-0.26,0.407-0.277,0.968-0.059,1.401c0.218,0.433,0.652,0.739,1.115,0.739h22.892c0.463,0,0.874-0.306,1.092-0.739 C44.884,44.094,44.843,43.534,44.584,43.126z M29.378,32.543c0.14-0.219,0.197-0.478,0.197-0.742v-6.376 c0-0.734-0.527-1.407-1.219-1.407h-1.62c-0.371,0-0.921-0.241-0.921-0.633v-1.35c0-0.393,0.55-0.672,0.921-0.672H37.52 c0.371,0,0.829,0.28,0.829,0.672v1.35c0,0.393-0.458,0.633-0.829,0.633h-1.619c-0.692,0-1.312,0.673-1.312,1.407v6.376 c0,0.264,0.104,0.523,0.244,0.742l3.053,4.755H26.371L29.378,32.543z" />
  </svg>
);
export default icon;
