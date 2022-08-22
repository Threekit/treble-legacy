import React from 'react';
import {
  SkeletonWrapper,
  FormHeaderWrapper,
  FormDescriptionWrapper,
  TitleWrapper,
  DescriptionWrapper,
  RowWrapper,
  SwatchItem,
  StripsItem,
  CardItem,
  ShimmerDiv,
} from './skeleton.styles';

interface SkeletonProps {
  shimmer?: boolean;
}

interface ISkeleton extends React.FC<SkeletonProps> {
  ColorSwatchSkeleton: React.FC<SkeletonProps>;
  CardsSkeleton: React.FC<SkeletonProps>;
  StripsSkeleton: React.FC<SkeletonProps>;
  FormHeaderSkeleton: React.FC<SkeletonProps>;
  FormDescriptionSkeleton: React.FC<SkeletonProps>;
}

export const FormHeaderSkeleton: React.FC<SkeletonProps> = props => {
  const { shimmer } = props;
  return (
    <FormHeaderWrapper shimmer={shimmer}>
      <ShimmerDiv />
      <ShimmerDiv />
    </FormHeaderWrapper>
  );
};

export const FormDescriptionSkeleton: React.FC<SkeletonProps> = props => {
  const { shimmer } = props;
  return <FormDescriptionWrapper shimmer={shimmer} />;
};

export const StripsSkeleton: React.FC<SkeletonProps> = props => {
  const { shimmer } = props;
  return (
    <SkeletonWrapper shimmer={shimmer}>
      <TitleWrapper shimmer={shimmer} />
      <DescriptionWrapper shimmer={shimmer} />
      <div>
        {Array(3)
          .fill(null)
          .map((_, i) => (
            <StripsItem key={i}>
              <ShimmerDiv />
              <div>
                <ShimmerDiv />
                <ShimmerDiv />
              </div>
              <div>
                <ShimmerDiv />
              </div>
            </StripsItem>
          ))}
      </div>
    </SkeletonWrapper>
  );
};

export const CardsSkeleton: React.FC<SkeletonProps> = props => {
  const { shimmer } = props;
  return (
    <SkeletonWrapper shimmer={shimmer}>
      <TitleWrapper shimmer={shimmer} />
      <DescriptionWrapper shimmer={shimmer} />
      <RowWrapper>
        {Array(3)
          .fill(null)
          .map((_, i) => (
            <CardItem key={i}>
              <ShimmerDiv />
              <ShimmerDiv />
              <ShimmerDiv />
            </CardItem>
          ))}
      </RowWrapper>
    </SkeletonWrapper>
  );
};

export const ColowSwatchSkeleton: React.FC<SkeletonProps> = props => {
  const { shimmer } = props;
  return (
    <SkeletonWrapper shimmer={shimmer}>
      <TitleWrapper shimmer={shimmer} />
      <DescriptionWrapper shimmer={shimmer} />
      <RowWrapper>
        {Array(8)
          .fill(null)
          .map((_, i) => (
            <SwatchItem key={i} />
          ))}
      </RowWrapper>
    </SkeletonWrapper>
  );
};

const Skeleton: ISkeleton = props => {
  const { shimmer } = props;
  return (
    <div>
      <FormHeaderSkeleton shimmer={shimmer} />
      <FormDescriptionSkeleton shimmer={shimmer} />
      <StripsSkeleton shimmer={shimmer} />
      <CardsSkeleton shimmer={shimmer} />
    </div>
  );
};

Skeleton.FormHeaderSkeleton = FormHeaderSkeleton;
Skeleton.FormDescriptionSkeleton = FormDescriptionSkeleton;
Skeleton.ColorSwatchSkeleton = ColowSwatchSkeleton;
Skeleton.CardsSkeleton = CardsSkeleton;
Skeleton.StripsSkeleton = StripsSkeleton;

export default Skeleton;
