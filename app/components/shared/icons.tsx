const SvgWrapper = ({
  children,
  width,
  height,
  color,
  ...rest
}: {
  children: React.ReactNode;
  width?: number;
  height?: number;
  color?: string;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={`${width || 2}em`}
      height={`${height || 2}em`}
      viewBox="0 0 16 16"
      {...rest}
    >
      {children}
    </svg>
  );
};

export function CircleXMark() {
  return (
    <SvgWrapper>
      <path
        fill="#dc2626"
        fillRule="evenodd"
        d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14M6.53 5.47a.75.75 0 0 0-1.06 1.06L6.94 8L5.47 9.47a.75.75 0 1 0 1.06 1.06L8 9.06l1.47 1.47a.75.75 0 1 0 1.06-1.06L9.06 8l1.47-1.47a.75.75 0 1 0-1.06-1.06L8 6.94z"
        clipRule="evenodd"
      />
    </SvgWrapper>
  );
}

export function CircleCheck() {
  return (
    <SvgWrapper>
      <path
        fill="#059669"
        fillRule="evenodd"
        d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14m3.1-8.55a.75.75 0 1 0-1.2-.9L7.419 8.858L6.03 7.47a.75.75 0 0 0-1.06 1.06l2 2a.75.75 0 0 0 1.13-.08z"
        clipRule="evenodd"
      />
    </SvgWrapper>
  );
}
