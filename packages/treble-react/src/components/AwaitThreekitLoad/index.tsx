import React from 'react';
import useThreekitInitStatus from '../../hooks/useThreekitInitStatus';

interface AwaitThreekitLoadProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const AwaitThreekitLoad: React.FC<AwaitThreekitLoadProps> = props => {
  const { children, fallback } = props;
  const isLoaded = useThreekitInitStatus();
  if (!isLoaded) {
    if (fallback) return <>{fallback}</>;
    return null;
  }
  if (!children) return null;
  return <>{children}</>;
};

export default AwaitThreekitLoad;
