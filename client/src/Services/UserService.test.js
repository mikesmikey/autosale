/* eslint-disable no-undef */

import UserService from './UserService'
import Student from '../Objects/Student'
import Professor from '../Objects/Professor'
import Staff from '../Objects/Staff'

it('correct student obj', () => {
  const userForm = {
    'username': 'jeff',
    'password': '123',
    'firstName': 'jeff',
    'lastName': 'comeback',
    'typeOfUser': 'student',
    'isExaminer': true,
    'facultyId': 2,
    'branchId': 2,
    'year': 3
  }
  const service = new UserService()
  const student = service.createUserObjectByType(userForm)
  expect(student instanceof Student).toEqual(true)
})

it('wrong student obj', () => {
  const userForm = {
    'username': 'jeff',
    'password': '123',
    'firstName': 'jeff',
    'lastName': 'comeback',
    'typeOfUser': 'professor',
    'isExaminer': true,
    'facultyId': 2,
    'branchId': 2,
    'year': 3
  }
  const service = new UserService()
  const student = service.createUserObjectByType(userForm)
  expect(student instanceof Student).toEqual(false)
})

it('correct professor obj', () => {
  const userForm = {
    'username': 'jeff',
    'password': '123',
    'firstName': 'jeff',
    'lastName': 'comeback',
    'typeOfUser': 'professor',
    'isExaminer': true,
    'facultyId': 2,
    'branchId': 2
  }
  const service = new UserService()
  const professor = service.createUserObjectByType(userForm)
  expect(professor instanceof Professor).toEqual(true)
})

it('wrong professor obj', () => {
  const userForm = {
    'username': 'jeff',
    'password': '123',
    'firstName': 'jeff',
    'lastName': 'comeback',
    'typeOfUser': 'staff',
    'isExaminer': true,
    'facultyId': 2,
    'branchId': 2
  }
  const service = new UserService()
  const professor = service.createUserObjectByType(userForm)
  expect(professor instanceof Professor).toEqual(false)
})

it('correct staff obj', () => {
  const userForm = {
    'username': 'jeff',
    'password': '123',
    'firstName': 'jeff',
    'lastName': 'comeback',
    'typeOfUser': 'staff',
    'isExaminer': true,
    'standing': 'แม่บ้าน'
  }
  const service = new UserService()
  const staff = service.createUserObjectByType(userForm)
  expect(staff instanceof Staff).toEqual(true)
})

it('wrong staff obj', () => {
  const userForm = {
    'username': 'jeff',
    'password': '123',
    'firstName': 'jeff',
    'lastName': 'comeback',
    'typeOfUser': 'professor',
    'isExaminer': true,
    'standing': 'แม่บ้าน'
  }
  const service = new UserService()
  const staff = service.createUserObjectByType(userForm)
  expect(staff instanceof Staff).toEqual(false)
})

it('name invalid', () => {
  const studentForm = {
    'username': 'jeff',
    'password': '123',
    'firstName': '',
    'lastName': 'comeback',
    'typeOfUser': 'student',
    'isExaminer': true,
    'facultyId': 2,
    'branchId': 2,
    'year': 3
  }
  const student = new Student(studentForm)
  const service = new UserService()
  expect(service.userObjFormCheck(student)).toEqual(false)
})

it('surname invalid', () => {
  const studentForm = {
    'username': 'jeff',
    'password': '123',
    'firstName': 'jeff',
    'lastName': '',
    'typeOfUser': 'student',
    'isExaminer': true,
    'facultyId': 2,
    'branchId': 2,
    'year': 3
  }
  const student = new Student(studentForm)
  const service = new UserService()
  expect(service.userObjFormCheck(student)).toEqual(false)
})

it('faculty invalid', () => {
  const studentForm = {
    'username': 'jeff',
    'password': '123',
    'firstName': 'jeff',
    'lastName': '',
    'typeOfUser': 'student',
    'isExaminer': true,
    'facultyId': 0,
    'branchId': 2,
    'year': 3
  }
  const student = new Student(studentForm)
  const service = new UserService()
  expect(service.userObjFormCheck(student)).toEqual(false)
})

it('branch invalid', () => {
  const studentForm = {
    'username': 'jeff',
    'password': '123',
    'firstName': 'jeff',
    'lastName': '',
    'typeOfUser': 'student',
    'isExaminer': true,
    'facultyId': 2,
    'branchId': -1,
    'year': 3
  }
  const student = new Student(studentForm)
  const service = new UserService()
  expect(service.userObjFormCheck(student)).toEqual(false)
})

it('year invalid', () => {
  const studentForm = {
    'username': 'jeff',
    'password': '123',
    'firstName': 'jeff',
    'lastName': '',
    'typeOfUser': 'student',
    'isExaminer': true,
    'facultyId': 2,
    'branchId': 2,
    'year': 0
  }
  const student = new Student(studentForm)
  const service = new UserService()
  expect(service.userObjFormCheck(student)).toEqual(false)
})
