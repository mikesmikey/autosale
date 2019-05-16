/* eslint-disable no-undef */

import AuthService from './AuthService'

it('username blank', () => {
  const service = new AuthService()
  expect(service.loginUsernameCheck('')).toEqual(false)
})

it('username not blank', () => {
  const service = new AuthService()
  expect(service.loginUsernameCheck('jeff')).toEqual(true)
})

it('password blank', () => {
  const service = new AuthService()
  expect(service.loginPasswordCheck('')).toEqual(false)
})

it('password not blank', () => {
  const service = new AuthService()
  expect(service.loginPasswordCheck('123')).toEqual(true)
})
