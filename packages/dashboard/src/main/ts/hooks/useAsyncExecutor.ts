import { useState, useCallback } from 'react'

export const useAsync = (asyncFunction: (...args: any[]) => Promise<any>) => {
  const [status, setStatus] = useState('idle')
  const [value, setValue] = useState<any | undefined>()
  const [error, setError] = useState<any | undefined>()

  const execute = useCallback((...args) => {
    setStatus('pending')
    setValue(undefined)
    setError(undefined)
    return asyncFunction(...args)
      .then((response) => {
        setValue(response)
        setStatus('success')
      })
      .catch((error) => {
        setError(error)
        setStatus('error')
      })
  }, [])

  return [execute, status, value, error]
}
