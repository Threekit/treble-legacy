import { getAttributes, setConfiguration } from '../../store/threekit'
import { ISetConfiguration, IThreekitDisplayAttribute } from '../../threekit'
import { useThreekitSelector, useThreekitDispatch } from '../../store'

type UseConfiguratorError = [undefined, undefined]
type UseConfiguratorSuccess = [
  Record<string, IThreekitDisplayAttribute>,
  (configuration: ISetConfiguration) => void
]

type UseConfiguratorHook = UseConfiguratorError | UseConfiguratorSuccess

const useConfigurator = (): UseConfiguratorHook => {
  const dispatch = useThreekitDispatch()
  const attributes = useThreekitSelector<
    undefined | Record<string, IThreekitDisplayAttribute>
  >(getAttributes)

  if (!attributes) return [undefined, undefined]

  const handleChange = (configuration: ISetConfiguration) =>
    dispatch(setConfiguration(configuration))

  return [attributes, handleChange]
}

export default useConfigurator
