import { useEffect, useState } from "react"

interface UseFetchOptions<TData, TError> {
  onSuccess?: (data: TData) => void
  onError?: (error: TError) => void
  onSettled?: () => void
}

interface UseFetchReturn<TData> {
  data: TData | null
  isLoading: boolean
  refetch: () => void
}

interface Props<TData, TError> {
  serviceFn: () => Promise<TData>
  options?: UseFetchOptions<TData, TError>
}

export function useFetch<TData = unknown, TError = unknown>({
  serviceFn,
  options,
}: Props<TData, TError>): UseFetchReturn<TData> {
  const [data, setData] = useState<TData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [refetchTrigger, setRefetchTrigger] = useState(0)

  const callService = async (): Promise<void> => {
    try {
      const data = await serviceFn()
      setData(data)
      if (options?.onSuccess) options.onSuccess(data)
    } catch (e) {
      const error = e as TError
      if (options?.onError) options.onError(error)
    } finally {
      setIsLoading(false)
      if (options?.onSettled) options.onSettled()
    }
  }

  const refetch = () => {
    setIsLoading(true)
    setRefetchTrigger(prevRefetchTrigger => prevRefetchTrigger + 1)
  }

  useEffect(() => {
    callService()
  }, [refetchTrigger])

  return {
    data,
    isLoading,
    refetch,
  }
}
