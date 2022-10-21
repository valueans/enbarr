import { consoleTransport, logger as _logger } from 'react-native-logs'

// TODO Add sentry transport

const config = {
  levels: {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3
  },
  severity: __DEV__ ? 'debug' : 'error',
  transport: consoleTransport,
  transportOptions: {
    colors: {
      info: 'blueBright',
      warn: 'yellowBright',
      error: 'redBright'
    },
  },
  async: true,
  dateFormat: 'time',
  printLevel: true,
  printDate: true,
  enabled: true
}

export default _logger.createLogger<'debug' | 'info' | 'warn' | 'error'>(config)
