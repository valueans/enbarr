import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import Navigator from './src/Navigator'

const queryClient = new QueryClient()

export default () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Navigator />
    </QueryClientProvider>
  )
}
