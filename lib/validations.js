/* eslint-disable no-useless-escape */

export default () => {}

export function isStringEmpty(text) {
  return !text || text === '' || text.trim() === ''
}

export function isEmail(email) {
  // const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  const re = /^[a-z0-9][a-z0-9_\.-]{0,}[a-z0-9]@[a-z0-9][a-z0-9_\.-]{0,}[a-z0-9][\.][a-z0-9]{2,4}$/

  return re.test(email)
}

export function isNationalID(value) {
  if (value.length !== 13) {
    return false
  }

  const reducer = (accumulator, currentValue, currentIndex) =>
    currentIndex < value.length - 1
      ? accumulator + parseFloat(currentValue) * (13 - currentIndex)
      : accumulator

  const sum = Array.from(value).reduce(reducer, 0)
  return (11 - (sum % 11)) % 10 === parseFloat(value.charAt(12))
}

export function isValidOtp(text) {
  return text && text !== '' && text.trim() !== '' && text.trim().length === 6
}

/* eslint-enable no-useless-escape */
