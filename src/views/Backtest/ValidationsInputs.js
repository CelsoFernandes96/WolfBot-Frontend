const validateInputs = (state) => {
  if (state.exchangeSelect === '') {
    return false
  }
  if (state.candleSelect === '') {
    return false
  }
  if (state.profit === '') {
    return false
  }
  if (state.stop === '') {
    return false
  }
  if (state.quantity === '') {
    return false
  }
  if (state.date === '') {
    return false
  }
  if (state.emaState === true) {
    if (state.emaPeriod === '') {
      return false
    }
  }
  if (state.macdState === true) {
    if (state.macdShortPeriod === '') {
      return false
    }
    if (state.macdLongPeriod === '') {
      return false
    }
    if (state.macdSignalPeriod === '') {
      return false
    }
  }
  if (state.stochState === true) {
    if (state.stochKperiod === '') {
      return false
    }
    if (state.stochKslowPeriod === '') {
      return false
    }
    if (state.stochDperiod === '') {
      return false
    }
  }
  if (state.cciState === true) {
    if (state.cciPeriod === '') {
      return false
    }
  }
  if (state.bbandsState === true) {
    if (state.bbandsPeriod === '') {
      return false
    }
    if (state.bbandsStddevPeriod === '') {
      return false
    }
  }
  return true
}

export {
  validateInputs,
}