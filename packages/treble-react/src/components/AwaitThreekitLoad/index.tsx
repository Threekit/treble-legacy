import React from 'react'
import useThreekitInitStatus from '../../hooks/useThreekitInitStatus'

interface IAwaitThreekitLoad {
  children: React.ReactNode
}

const AwaitThreekitLoad = (props: IAwaitThreekitLoad) => {
  const { children } = props
  const isLoaded = useThreekitInitStatus()
  if (!isLoaded || !children) return null
  return <>{children}</>
}

export default AwaitThreekitLoad
