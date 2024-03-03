import { COLORS } from '@/constants/colors';
import React from 'react';

const SvgWrapper = ({
  children,
  width,
  height,
  color,
  viewBox,
  ...rest
}: {
  children: React.ReactNode;
  width?: number;
  height?: number;
  color?: string;
  viewBox?: string | undefined;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={`${width || 2}em`}
      height={`${height || 2}em`}
      viewBox={viewBox || '0 0 16 16'}
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
        fill={COLORS.ERROR}
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
        fill={COLORS.SUCCESS}
        fillRule="evenodd"
        d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14m3.1-8.55a.75.75 0 1 0-1.2-.9L7.419 8.858L6.03 7.47a.75.75 0 0 0-1.06 1.06l2 2a.75.75 0 0 0 1.13-.08z"
        clipRule="evenodd"
      />
    </SvgWrapper>
  );
}

// material-symbols
export function EditIcon({
  onClickHandler,
  width
}: {
  onClickHandler: () => void;
  width?: number;
}) {
  return (
    <button onClick={onClickHandler}>
      <SvgWrapper viewBox={'false'} width={width}>
        <path
          fill={COLORS.SUCCESS}
          d="M3 21v-4.25L16.2 3.575q.3-.275.663-.425t.762-.15q.4 0 .775.15t.65.45L20.425 5q.3.275.438.65T21 6.4q0 .4-.137.763t-.438.662L7.25 21zM17.6 7.8L19 6.4L17.6 5l-1.4 1.4z"
        />
      </SvgWrapper>
    </button>
  );
}

export function DeleteIcon({
  onClickHandler,
  width
}: {
  onClickHandler: () => void;
  width?: number;
}) {
  return (
    <button onClick={onClickHandler}>
      <SvgWrapper viewBox={'false'} width={width}>
        <path
          fill={COLORS.ERROR}
          d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zm2-4h2V8H9zm4 0h2V8h-2z"
        />
      </SvgWrapper>
    </button>
  );
}

export function AddIcon({
  onClickHandler,
  width,
  height,
  viewBox
}: {
  onClickHandler: () => void;
  width?: number;
  height?: number;
  viewBox?: string;
}) {
  return (
    <button onClick={onClickHandler}>
      <SvgWrapper viewBox={viewBox} width={width} height={height}>
        <path
          fill={COLORS.PRIMARY}
          d="M11 17h2v-4h4v-2h-4V7h-2v4H7v2h4zm1 5q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22"
        />
      </SvgWrapper>
    </button>
  );
}
