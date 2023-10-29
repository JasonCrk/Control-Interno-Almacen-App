import { useState } from "react"

interface UseCallServiceOptions<TData, TError, TVariables> {
  onSuccess?: (data: TData, variables: TVariables) => void
  onError?: (error: TError, variables: TVariables) => void
  onSettled?: (variables: TVariables) => void
}

interface UseCallService<TData, TVariables> {
  callService: (props: TVariables) => Promise<void>
  isLoading: boolean
  data: TData | null
}

interface Props<TData, TError, TVariables> {
  serviceFn: (props: TVariables) => Promise<TData>
  options?: UseCallServiceOptions<TData, TError, TVariables>
}

export function useCallService<
  TData = unknown,
  TError = unknown,
  TVariables = unknown
>({
  serviceFn,
  options,
}: Props<TData, TError, TVariables>): UseCallService<TData, TVariables> {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<TData | null>(null)

  const callService = async (props: TVariables): Promise<void> => {
    setIsLoading(true)

    try {
      const response = await serviceFn(props)
      setData(response)
      if (options?.onSuccess) options.onSuccess(response, props)
    } catch (e) {
      const error = e as TError
      if (options?.onError) options.onError(error, props)
    } finally {
      setIsLoading(false)
      if (options?.onSettled) options.onSettled(props)
    }
  }

  return { callService, isLoading, data }
}
