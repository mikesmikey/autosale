/* eslint-disable no-undef */
var chai = require('chai')
var chaiHttp = require('chai-http')
var server = require('./testHelper')
var should = chai.should()
var ExamService = require('../service/ExamService')

const Subject = require('../dao/SubjectDAO')
const User = require('../dao/UserDAO')
const Building = require('../dao/BuildingDAO')
const Exam = require('../dao/ExamDAO')

// const examTestData = {
//     'subjectId': '66666',
//     'subjectName': 'Dark Magic',
//     'examName': 'safsfa',
//     'courseId': 1,
//     'date': '5/31/2019',
//     'maxScore': '23',
//     'seatLineUpType': 'vertical',
//     'seatOrderType': 'shuffle',
//     'rooms': [
//       {
//         'roomId': 'IF-3C04',
//         'startTime': 10,
//         'hours': 3,
//         'maxStudent': '200'
//       }
//     ]
//   }

describe('UNIT TEST: validExamSimpleData', () => {
  it('should have valid date error', (done) => {
    const examTestData = {
      'subjectId': '66666',
      'subjectName': 'Dark Magic',
      'examName': 'safsfa',
      'courseId': 1,
      'date': 'wrong',
      'maxScore': '23'
    }
    const service = new ExamService()
    service.validExamSimpleData(examTestData).then((result) => {
      result.should.have.property('validDate')
      result.validDate.should.equal(false)
      done()
    })
  })
  it('should have exam name error', (done) => {
    const examTestData = {
      'subjectId': '66666',
      'subjectName': 'Dark Magic',
      'examName': '',
      'courseId': 1,
      'date': '5/31/2019',
      'maxScore': '23'
    }
    const service = new ExamService()
    service.validExamSimpleData(examTestData).then((result) => {
      result.should.have.property('validExamName')
      result.validExamName.should.equal(false)
      done()
    })
  })
  it('should have max score error (lower than 0 or equal)', (done) => {
    const examTestData = {
      'subjectId': '66666',
      'subjectName': 'Dark Magic',
      'examName': 'safsfa',
      'courseId': 1,
      'date': '5/31/2019',
      'maxScore': '0'
    }
    const service = new ExamService()
    service.validExamSimpleData(examTestData).then((result) => {
      result.should.have.property('validMaxScore')
      result.validMaxScore.should.equal(false)
      done()
    })
  })
  it('should have max score error (not allowed float number)', (done) => {
    const examTestData = {
      'subjectId': '66666',
      'subjectName': 'Dark Magic',
      'examName': 'safsfa',
      'courseId': 1,
      'date': '5/31/2019',
      'maxScore': '15.5'
    }
    const service = new ExamService()
    service.validExamSimpleData(examTestData).then((result) => {
      result.should.have.property('validMaxScore')
      result.validMaxScore.should.equal(false)
      done()
    })
  })
  it('valid simple data should successful', (done) => {
    const examTestData = {
      'subjectId': '66666',
      'subjectName': 'Dark Magic',
      'examName': 'safsfa',
      'courseId': 1,
      'date': '5/31/2019',
      'maxScore': '23'
    }
    const service = new ExamService()
    service.validExamSimpleData(examTestData).then((result) => {
      result.should.have.property('validSimpleData')
      result.validSimpleData.should.equal(true)
      done()
    })
  })
})

describe('UNIT TEST: validRoom', () => {
  it('valid room successful', (done) => {
    const examTestData = {
      'seatLineUpType': 'vertical',
      'seatOrderType': 'shuffle',
      'rooms': [
        {
          'roomId': 'IF-3C04',
          'startTime': 10,
          'hours': 3,
          'maxStudent': '200'
        }
      ]
    }
    const service = new ExamService()
    service.validRoom(examTestData).then((result) => {
      result.should.have.property('roomExist')
      result.roomExist.should.equal(true)
      done()
    })
  })

  it('valid room successful (with rooms property)', (done) => {
    const examTestData = {
      'seatLineUpType': 'vertical',
      'seatOrderType': 'shuffle',
      'rooms': []
    }
    const service = new ExamService()
    service.validRoom(examTestData).then((result) => {
      result.should.have.property('roomExist')
      result.roomExist.should.equal(false)
      done()
    })
  })

  it('valid room successful (without rooms property)', (done) => {
    const examTestData = {
      'seatLineUpType': 'vertical',
      'seatOrderType': 'shuffle'
    }
    const service = new ExamService()
    service.validRoom(examTestData).then((result) => {
      result.should.have.property('roomExist')
      result.roomExist.should.equal(false)
      done()
    })
  })
})

describe('UNIT TEST: checkExamConfirmError', () => {
  it('exam not contain any error', (done) => {
    const errArr = [
      { validSimpleData: true }
    ]
    const service = new ExamService()
    const result = service.checkExamConfirmError(errArr)
    result.should.be.a('boolean')
    result.should.equal(true)
    done()
  })

  it('exam contain error', (done) => {
    const errArr = [
      { validMaxDate: false,
        validMaxScore: false
      }
    ]
    const service = new ExamService()
    const result = service.checkExamConfirmError(errArr)
    result.should.be.a('object')
    result.should.have.property('validMaxDate')
    result.validMaxDate.should.equal(false)
    done()
  })
})

describe('UNIT TEST: validExaminerInRoom', () => {
  it('have examiner in room', (done) => {
    const examTestData = {
      'seatLineUpType': 'vertical',
      'seatOrderType': 'shuffle',
      'rooms': [
        {
          'roomId': 'IF-3C04',
          'startTime': 10,
          'hours': 3,
          'maxStudent': '200',
          'examiners': [
            {
              'username': 'jeff'
            }
          ]
        }
      ]
    }
    const service = new ExamService()
    service.validExaminerInRoom(examTestData).then((result) => {
      result.should.be.a('object')
      result.should.have.property('enoughExaminer')
      result.enoughExaminer.should.equal(true)
      done()
    })
  })
  it('not have examiner in room (with examiners property)', (done) => {
    const examTestData = {
      'seatLineUpType': 'vertical',
      'seatOrderType': 'shuffle',
      'rooms': [
        {
          'roomId': 'IF-3C04',
          'startTime': 10,
          'hours': 3,
          'maxStudent': '200',
          'examiners': [
          ]
        }
      ]
    }
    const service = new ExamService()
    service.validExaminerInRoom(examTestData).then((result) => {
      result.should.be.a('object')
      result.should.have.property('enoughExaminer')
      result.enoughExaminer.should.equal(false)
      done()
    })
  })

  it('not have examiner in room (without examiners property)', (done) => {
    const examTestData = {
      'seatLineUpType': 'vertical',
      'seatOrderType': 'shuffle',
      'rooms': [
        {
          'roomId': 'IF-3C04',
          'startTime': 10,
          'hours': 3,
          'maxStudent': '200'
        }
      ]
    }
    const service = new ExamService()
    service.validExaminerInRoom(examTestData).then((result) => {
      result.should.be.a('object')
      result.should.have.property('enoughExaminer')
      result.enoughExaminer.should.equal(false)
      done()
    })
  })
})

describe('UNIT TEST: assignStudent', () => {
  const studentTestArr = [
    {
      username: 'test1'
    }, {
      username: 'test2'
    }
  ]
  const seatTestArr = [
    [
      {
        'seatNumber': '1A'
      },
      {
        'seatNumber': '2A'
      }
    ], [
      {
        'seatNumber': '1B'
      },
      {
        'seatNumber': '2B'
      }
    ]
  ]

  // true case
  // [ T, F ]
  // [ T, F ]
  it('assign vertical student', (done) => {
    const service = new ExamService()
    service.assignStudent('vertical', studentTestArr, seatTestArr, 0, 0, 0, 2).then((result) => {
      result.should.be.a('object')
      result.should.have.property('seatArr')
      result.seatArr[0].should.be.a('array')

      result.seatArr[0][0].should.be.a('object')
      result.seatArr[0][0].should.have.property('studentCode')
      result.seatArr[0][0].studentCode.should.equal('test1')

      result.seatArr[0][1].should.be.a('object')
      result.seatArr[0][1].should.have.property('studentCode')
      result.seatArr[0][1].studentCode.should.equal('test2')
      done()
    })
  })

  // true case
  // [ T, T ]
  // [ F, F ]
  it('assign horizontal student', (done) => {
    const service = new ExamService()
    service.assignStudent('horizontal', studentTestArr, seatTestArr, 0, 0, 0, 2).then((result) => {
      result.should.be.a('object')
      result.should.have.property('seatArr')
      result.seatArr[0].should.be.a('array')

      result.seatArr[0][0].should.be.a('object')
      result.seatArr[0][0].should.have.property('studentCode')
      result.seatArr[0][0].studentCode.should.equal('test1')

      result.seatArr[1][0].should.be.a('object')
      result.seatArr[1][0].should.have.property('studentCode')
      result.seatArr[1][0].studentCode.should.equal('test2')
      done()
    })
  })
})

describe('INTEGRAL TEST: validCourse', () => {
  // *** IMPORTANT ***
  // should have subject Dark Magic and course id 1
  const subjectData = {
    'subjectId': '66666',
    'subjectName': 'Dark Magic',
    'credits': 3,
    'facultyId': 1,
    'branchId': 1,
    'courses': [
      {
        'courseId': 1,
        'max_groups': 2,
        'max_students': 150,
        'school_year': 2562,
        'semester': 2
      }
    ]
  }
  let testSubject = new Subject(subjectData)

  before((done) => {
    testSubject.save(() => {
      done()
    })
  })

  after((done) => {
    Subject.deleteOne({ subjectId: testSubject.subjectId }, () => {
      done()
    })
  })

  it('course exist case', (done) => {
    const examTestData = {
      'subjectId': '66666',
      'subjectName': 'Dark Magic',
      'examName': 'safsfa',
      'courseId': 1,
      'date': '5/31/2019',
      'maxScore': '23'
    }
    const service = new ExamService()
    service.validCourse(examTestData).then((result) => {
      result.should.be.a('object')
      result.should.have.property('courseExist')
      result.courseExist.should.equal(true)
      done()
    })
  })

  it('course not exist case', (done) => {
    const examTestData = {
      'subjectId': '66666',
      'subjectName': 'Dark Magic',
      'examName': 'safsfa',
      'courseId': 999,
      'date': '5/31/2019',
      'maxScore': '23'
    }
    const service = new ExamService()
    service.validCourse(examTestData).then((result) => {
      result.should.be.a('object')
      result.should.have.property('courseExist')
      result.courseExist.should.equal(false)
      done()
    })
  })
})

describe('INTEGRAL TEST: validAvailableSeat', () => {
  // *** IMPORTANT ***
  // should have subject Dark Magic and course id 1
  const subjectData = {
    'subjectId': '66666',
    'subjectName': 'Dark Magic',
    'credits': 3,
    'facultyId': 1,
    'branchId': 1,
    'courses': [
      {
        'courseId': 1,
        'max_groups': 2,
        'max_students': 150,
        'school_year': 2562,
        'semester': 2
      }
    ]
  }
  const userData = [
    {
      'username': 'test1',
      'typeOfUser': 'student',
      'courses': [
        {
          'group': 1,
          'subjectId': '66666',
          'courseId': 1
        }
      ]
    },
    {
      'username': 'test2',
      'typeOfUser': 'student',
      'courses': [
        {
          'group': 1,
          'subjectId': '66666',
          'courseId': 1
        }
      ]
    },
    {
      'username': 'test3',
      'typeOfUser': 'student',
      'courses': [
        {
          'group': 1,
          'subjectId': '66666',
          'courseId': 1
        }
      ]
    }
  ]

  let testSubject = new Subject(subjectData)

  before((done) => {
    testSubject.save(() => {
      User.insertMany(userData, () => {
        done()
      })
    })
  })

  after((done) => {
    Subject.deleteOne({ subjectId: testSubject.subjectId }, () => {
      User.deleteMany(() => {
        done()
      })
    })
  })

  it('enough seat case', (done) => {
    const examTestData = {
      'subjectId': '66666',
      'subjectName': 'Dark Magic',
      'examName': 'safsfa',
      'courseId': 1,
      'date': '5/31/2019',
      'maxScore': '23',
      'seatLineUpType': 'vertical',
      'seatOrderType': 'shuffle',
      'rooms': [
        {
          'roomId': 'IF-3C04',
          'startTime': 10,
          'hours': 3,
          'maxStudent': '200'
        }
      ]
    }

    const service = new ExamService()
    service.validAvailableSeat(examTestData).then((result) => {
      result.should.be.a('object')
      result.should.have.property('enoughSeat')
      result.enoughSeat.should.equal(true)
      done()
    })
  })

  it('not enough seat case', (done) => {
    const examTestData = {
      'subjectId': '66666',
      'subjectName': 'Dark Magic',
      'examName': 'safsfa',
      'courseId': 1,
      'date': '5/31/2019',
      'maxScore': '23',
      'seatLineUpType': 'vertical',
      'seatOrderType': 'shuffle',
      'rooms': [
        {
          'roomId': 'IF-3C04',
          'startTime': 10,
          'hours': 3,
          'maxStudent': '1'
        }
      ]
    }

    const service = new ExamService()
    service.validAvailableSeat(examTestData).then((result) => {
      result.should.be.a('object')
      result.should.have.property('enoughSeat')
      result.enoughSeat.should.equal(false)
      done()
    })
  })
})

describe('INTEGRAL TEST: validRoomData', () => {
  // *** IMPORTANT ***
  // should have subject Dark Magic and course id 1
  const subjectData = {
    'subjectId': '66666',
    'subjectName': 'Dark Magic',
    'credits': 3,
    'facultyId': 1,
    'branchId': 1,
    'courses': [
      {
        'courseId': 1,
        'max_groups': 2,
        'max_students': 150,
        'school_year': 2562,
        'semester': 2
      }
    ]
  }
  const userData = [
    {
      'username': 'test1',
      'typeOfUser': 'student',
      'courses': [
        {
          'group': 1,
          'subjectId': '66666',
          'courseId': 1
        }
      ]
    },
    {
      'username': 'test2',
      'typeOfUser': 'student',
      'courses': [
        {
          'group': 1,
          'subjectId': '66666',
          'courseId': 1
        }
      ]
    },
    {
      'username': 'test3',
      'typeOfUser': 'student',
      'courses': [
        {
          'group': 1,
          'subjectId': '66666',
          'courseId': 1
        }
      ]
    }
  ]

  let testSubject = new Subject(subjectData)

  before((done) => {
    testSubject.save(() => {
      User.insertMany(userData, () => {
        done()
      })
    })
  })

  after((done) => {
    Subject.deleteOne({ subjectId: testSubject.subjectId }, () => {
      User.deleteMany(() => {
        done()
      })
    })
  })

  it('room data correct', (done) => {
    const examTestData = {
      'subjectId': '66666',
      'subjectName': 'Dark Magic',
      'examName': 'safsfa',
      'courseId': 1,
      'date': '5/31/2019',
      'maxScore': '23',
      'seatLineUpType': 'vertical',
      'seatOrderType': 'shuffle',
      'rooms': [
        {
          'roomId': 'IF-3C04',
          'startTime': 10,
          'hours': 3,
          'maxStudent': '10',
          'examiners': [
            {
              'username': 'jeff'
            }
          ]
        }
      ]
    }
    const service = new ExamService()
    service.validRoomData(examTestData).then((result) => {
      result.should.be.a('object')
      result.should.have.property('roomExist')
      result.roomExist.should.equal(true)
      result.should.have.property('enoughSeat')
      result.enoughSeat.should.equal(true)
      result.should.have.property('enoughExaminer')
      result.enoughExaminer.should.equal(true)
      done()
    })
  })

  it('room data incorrect (room not exist)', (done) => {
    const examTestData = {
      'subjectId': '66666',
      'subjectName': 'Dark Magic',
      'examName': 'safsfa',
      'courseId': 1,
      'date': '5/31/2019',
      'maxScore': '23',
      'seatLineUpType': 'vertical',
      'seatOrderType': 'shuffle'
    }
    const service = new ExamService()
    service.validRoomData(examTestData).then((result) => {
      result.should.be.a('object')
      result.should.have.property('roomExist')
      result.roomExist.should.equal(false)
      done()
    })
  })

  it('room data incorrect (seat not enough)', (done) => {
    const examTestData = {
      'subjectId': '66666',
      'subjectName': 'Dark Magic',
      'examName': 'safsfa',
      'courseId': 1,
      'date': '5/31/2019',
      'maxScore': '23',
      'seatLineUpType': 'vertical',
      'seatOrderType': 'shuffle',
      'rooms': [
        {
          'roomId': 'IF-3C04',
          'startTime': 10,
          'hours': 3,
          'maxStudent': '1',
          'examiners': [
            {
              'username': 'jeff'
            }
          ]
        }
      ]
    }
    const service = new ExamService()
    service.validRoomData(examTestData).then((result) => {
      result.should.be.a('object')
      result.should.have.property('enoughSeat')
      result.enoughSeat.should.equal(false)
      done()
    })
  })

  it('room data incorrect (examiner not enough)', (done) => {
    const examTestData = {
      'subjectId': '66666',
      'subjectName': 'Dark Magic',
      'examName': 'safsfa',
      'courseId': 1,
      'date': '5/31/2019',
      'maxScore': '23',
      'seatLineUpType': 'vertical',
      'seatOrderType': 'shuffle',
      'rooms': [
        {
          'roomId': 'IF-3C04',
          'startTime': 10,
          'hours': 3,
          'maxStudent': '10'
        }
      ]
    }
    const service = new ExamService()
    service.validRoomData(examTestData).then((result) => {
      result.should.be.a('object')
      result.should.have.property('enoughExaminer')
      result.enoughExaminer.should.equal(false)
      done()
    })
  })
})

describe('INTEGRAL TEST: validExamData', () => {
  // *** IMPORTANT ***
  // should have subject Dark Magic and course id 1
  const subjectData = {
    'subjectId': '66666',
    'subjectName': 'Dark Magic',
    'credits': 3,
    'facultyId': 1,
    'branchId': 1,
    'courses': [
      {
        'courseId': 1,
        'max_groups': 2,
        'max_students': 150,
        'school_year': 2562,
        'semester': 2
      }
    ]
  }
  const userData = [
    {
      'username': 'test1',
      'typeOfUser': 'student',
      'courses': [
        {
          'group': 1,
          'subjectId': '66666',
          'courseId': 1
        }
      ]
    },
    {
      'username': 'test2',
      'typeOfUser': 'student',
      'courses': [
        {
          'group': 1,
          'subjectId': '66666',
          'courseId': 1
        }
      ]
    },
    {
      'username': 'test3',
      'typeOfUser': 'student',
      'courses': [
        {
          'group': 1,
          'subjectId': '66666',
          'courseId': 1
        }
      ]
    }
  ]

  let testSubject = new Subject(subjectData)

  before((done) => {
    testSubject.save(() => {
      User.insertMany(userData, () => {
        done()
      })
    })
  })

  after((done) => {
    Subject.deleteOne({ subjectId: testSubject.subjectId }, () => {
      User.deleteMany(() => {
        done()
      })
    })
  })

  it('successful case', (done) => {
    const examTestData = {
      'subjectId': '66666',
      'subjectName': 'Dark Magic',
      'examName': 'safsfa',
      'courseId': 1,
      'date': '5/31/2019',
      'maxScore': '23',
      'rooms': [
        {
          'roomId': 'IF-3C04',
          'startTime': 10,
          'hours': 3,
          'maxStudent': '10',
          'examiners': [
            {
              'username': 'jeff'
            }
          ]
        }
      ]
    }
    const service = new ExamService()
    service.validExamData(examTestData).then((errResult) => {
      const result = service.checkExamConfirmError(errResult)
      result.should.be.a('boolean')
      result.should.equal(true)
      done()
    })
  })

  it('unsuccessful case (atleast one error)', (done) => {
    const examTestData = {
      'subjectId': '66666',
      'subjectName': 'Dark Magic',
      'examName': 'safsfa',
      'courseId': 1,
      'date': '5/31/2019',
      'maxScore': '23'
    }
    const service = new ExamService()
    service.validExamData(examTestData).then((errResult) => {
      const result = service.checkExamConfirmError(errResult)
      result.should.be.a('object')
      result.should.have.property('roomExist')
      result.roomExist.should.equal(false)
      done()
    })
  })
})

describe('INTEGRAL TEST: mappingDefaultSeat', () => {
  const examTestData = {
    'subjectId': '66666',
    'subjectName': 'Dark Magic',
    'examName': 'safsfa',
    'courseId': 1,
    'date': '5/31/2019',
    'maxScore': '23',
    'seatLineUpType': 'vertical',
    'seatOrderType': 'shuffle',
    'rooms': [
      {
        'roomId': 'TS-101',
        'startTime': 10,
        'hours': 3,
        'maxStudent': '10',
        'examiners': [
          {
            'username': 'jeff'
          }
        ]
      }
    ]
  }
  const buildingData = {
    'building_name': 'test',
    'short_name': 'TS',
    'floors': 3,
    'Rooms': [
      {
        'roomId': 1,
        'floor': 1,
        'room': 'TS-101',
        'roomType': 'Lecture',
        'numberOfSeat': 50,
        'row': 5,
        'column': 5
      }
    ]
  }

  const building = new Building(buildingData)
  const exam = new Exam(examTestData)

  before((done) => {
    building.save((err, result) => {
      if (err) {
        throw err
      }
      exam.save(() => {
        done()
      })
    })
  })

  after((done) => {
    Building.deleteMany({ building_name: 'test' }, () => {
      Exam.findByIdAndDelete(exam.id, () => {
        done()
      })
    })
  })

  // True case
  // [A1, B1, C1, D1, E1]
  // [A2, B2, C2, D2, E2]
  // [A3, B3, C3, D3, E3]
  // [A4, B4, C4, D4, E4]
  // [A5, B5, C5, D5, E5]

  it('mapping correct seat', (done) => {
    const service = new ExamService()
    service.mappingDefaultSeat(exam.rooms[0]).then((result) => {
      result.should.be.a('array')
      result.should.have.lengthOf(5)
      result[0].should.have.lengthOf(5)
      done()
    })
  })
})

describe('INTEGRAL TEST: mappingAlreadyAssignSeat', () => {
  const otherExamTestData = {
    'subjectId': '66666',
    'subjectName': 'Dark Magic',
    'examName': 'exam1',
    'courseId': 1,
    'date': '5/31/2019',
    'maxScore': '23',
    'seatLineUpType': 'vertical',
    'seatOrderType': 'shuffle',
    'examConfirm': true,
    'rooms': [
      {
        'roomId': 'TS-101',
        'startTime': 10,
        'hours': 3,
        'maxStudent': '10',
        'examiners': [
          {
            'username': 'jeff'
          }
        ],
        'examSeats': [
          [
            {
              'seatNumber': '1A',
              'studentCode': 'jeff',
              'status': 'unregistered'
            },
            {
              'seatNumber': '2A',
              'studentCode': 'jeff',
              'status': 'unregistered'
            },
            {
              'seatNumber': '3A',
              'studentCode': 'jeff',
              'status': 'unregistered'
            }

          ], [
            {
              'seatNumber': '1B',
              'studentCode': 'jeff',
              'status': 'unregistered'
            },
            {
              'seatNumber': '2B',
              'studentCode': 'jeff',
              'status': 'unregistered'
            }
          ]
        ]
      }
    ]
  }

  const examTestData = {
    'subjectId': '66666',
    'subjectName': 'Dark Magic',
    'examName': 'exam2',
    'courseId': 1,
    'date': '5/31/2019',
    'maxScore': '23',
    'seatLineUpType': 'vertical',
    'seatOrderType': 'shuffle',
    'rooms': [
      {
        'roomId': 'TS-101',
        'startTime': 10,
        'hours': 3,
        'maxStudent': '10',
        'examiners': [
          {
            'username': 'jeff'
          }
        ]
      }
    ]
  }

  const seatData = [ [ { seatNumber: '1A' },
    { seatNumber: '2A' },
    { seatNumber: '3A' },
    { seatNumber: '4A' },
    { seatNumber: '5A' } ],
  [ { seatNumber: '1B' },
    { seatNumber: '2B' },
    { seatNumber: '3B' },
    { seatNumber: '4B' },
    { seatNumber: '5B' } ],
  [ { seatNumber: '1C' },
    { seatNumber: '2C' },
    { seatNumber: '3C' },
    { seatNumber: '4C' },
    { seatNumber: '5C' } ],
  [ { seatNumber: '1D' },
    { seatNumber: '2D' },
    { seatNumber: '3D' },
    { seatNumber: '4D' },
    { seatNumber: '5D' } ],
  [ { seatNumber: '1E' },
    { seatNumber: '2E' },
    { seatNumber: '3E' },
    { seatNumber: '4E' },
    { seatNumber: '5E' } ] ]

  const userData = [
    {
      'username': 'test1',
      'typeOfUser': 'student',
      'courses': [
        {
          'group': 1,
          'subjectId': '66666',
          'courseId': 1
        }
      ]
    },
    {
      'username': 'test2',
      'typeOfUser': 'student',
      'courses': [
        {
          'group': 1,
          'subjectId': '66666',
          'courseId': 1
        }
      ]
    },
    {
      'username': 'test3',
      'typeOfUser': 'student',
      'courses': [
        {
          'group': 1,
          'subjectId': '66666',
          'courseId': 1
        }
      ]
    }
  ]

  const exam1 = new Exam(otherExamTestData)
  const exam2 = new Exam(examTestData)

  before((done) => {
    User.insertMany(userData, () => {
      exam1.save((_err, result) => {
        exam1._id = exam1.id
        exam2.save((_err, result) => {
          exam2._id = exam2.id
          done()
        })
      })
    })
  })

  after((done) => {
    User.deleteMany({}, () => {
      Exam.deleteMany({}, () => {
        done()
      })
    })
  })

  it('successful map', (done) => {
    const service = new ExamService()
    service.mappingAlreadyAssignSeat(exam2, exam2.rooms[0], seatData).then((result) => {
      result.should.be.a('array')
      result.should.have.lengthOf(5)
      result[0].should.have.lengthOf(5)
      result[0][0].studentCode.should.equal('jeff')
      result[0][1].studentCode.should.equal('jeff')
      result[0][2].studentCode.should.equal('jeff')
      result[1][0].studentCode.should.equal('jeff')
      result[1][1].studentCode.should.equal('jeff')
      done()
    })
  })
})

describe('INTEGRAL TEST: generateSeat', () => {
  const otherExamTestData = {
    'subjectId': '66666',
    'subjectName': 'Dark Magic',
    'examName': 'exam1',
    'courseId': 1,
    'date': '5/31/2019',
    'maxScore': '23',
    'seatLineUpType': 'vertical',
    'seatOrderType': 'shuffle',
    'examConfirm': true,
    'rooms': [
      {
        'roomId': 'TS-101',
        'startTime': 10,
        'hours': 3,
        'maxStudent': '10',
        'examiners': [
          {
            'username': 'jeff'
          }
        ],
        'examSeats': [
          [
            {
              'seatNumber': '1A',
              'studentCode': 'jeff',
              'status': 'unregistered'
            },
            {
              'seatNumber': '2A',
              'studentCode': 'jeff',
              'status': 'unregistered'
            },
            {
              'seatNumber': '3A',
              'studentCode': 'jeff',
              'status': 'unregistered'
            }

          ], [
            {
              'seatNumber': '1B',
              'studentCode': 'jeff',
              'status': 'unregistered'
            },
            {
              'seatNumber': '2B',
              'studentCode': 'jeff',
              'status': 'unregistered'
            }
          ]
        ]
      }
    ]
  }

  const examTestData = {
    'subjectId': '66666',
    'subjectName': 'Dark Magic',
    'examName': 'exam2',
    'courseId': 1,
    'date': '5/31/2019',
    'maxScore': '23',
    'seatLineUpType': 'vertical',
    'seatOrderType': 'shuffle',
    'rooms': [
      {
        'roomId': 'TS-101',
        'startTime': 10,
        'hours': 3,
        'maxStudent': '10',
        'examiners': [
          {
            'username': 'jeff'
          }
        ]
      }
    ]
  }
  const userData = [
    {
      'username': 'test1',
      'typeOfUser': 'student',
      'courses': [
        {
          'group': 1,
          'subjectId': '66666',
          'courseId': 1
        }
      ]
    },
    {
      'username': 'test2',
      'typeOfUser': 'student',
      'courses': [
        {
          'group': 1,
          'subjectId': '66666',
          'courseId': 1
        }
      ]
    },
    {
      'username': 'test3',
      'typeOfUser': 'student',
      'courses': [
        {
          'group': 1,
          'subjectId': '66666',
          'courseId': 1
        }
      ]
    }
  ]

  const buildingData = {
    'building_name': 'test',
    'short_name': 'TS',
    'floors': 3,
    'Rooms': [
      {
        'roomId': 1,
        'floor': 1,
        'room': 'TS-101',
        'roomType': 'Lecture',
        'numberOfSeat': 50,
        'row': 5,
        'column': 5
      }
    ]
  }

  const exam1 = new Exam(otherExamTestData)
  const exam2 = new Exam(examTestData)
  const building = new Building(buildingData)

  before((done) => {
    User.insertMany(userData, () => {
      building.save((_err, result) => {
        exam1.save((_err, result) => {
          exam1._id = exam1.id
          exam2.save((_err, result) => {
            exam2._id = exam2.id
            done()
          })
        })
      })
    })
  })

  after((done) => {
    User.deleteMany({}, () => {
      Building.deleteMany({ building_name: building.building_name }, () => {
        Exam.deleteMany({}, () => {
          done()
        })
      })
    })
  })

  it('successful generate seat', (done) => {
    const service = new ExamService()
    service.generateSeat(exam2).then((result) => {
      Exam.findById(exam2.id, (_err, examResult) => {
        examResult.should.be.a('object')
        examResult.should.have.property('rooms')
        examResult.rooms.should.have.lengthOf(1)
        examResult.rooms[0].should.have.property('examSeats')
        examResult.rooms[0].examSeats[0][3].should.have.property('studentCode')
        examResult.rooms[0].examSeats[0][4].should.have.property('studentCode')
        examResult.rooms[0].examSeats[1][2].should.have.property('studentCode')
        done()
      })
    })
  })
})

describe('INTEGRAL TEST: assignExaminer', () => {
  const examTestData = {
    'subjectId': '66666',
    'subjectName': 'Dark Magic',
    'examName': 'exam2',
    'courseId': 1,
    'date': '5/31/2019',
    'maxScore': '23',
    'seatLineUpType': 'vertical',
    'seatOrderType': 'shuffle',
    'rooms': [
      {
        'roomId': 'TS-101',
        'startTime': 10,
        'hours': 3,
        'maxStudent': '10',
        'examiners': [
          {
            'username': 'iamexaminer'
          }
        ]
      }
    ]
  }

  const userData = {
    'username': 'iamexaminer',
    'typeOfUser': 'student'
  }

  const exam = new Exam(examTestData)
  const user = new User(userData)

  before((done) => {
    user.save(() => {
      exam.save(() => {
        done()
      })
    })
  })

  after((done) => {
    Exam.findByIdAndDelete(exam.id, () => {
      User.deleteMany({}, () => {
        done()
      })
    })
  })

  it('successful register examiner to exam', (done) => {
    const service = new ExamService()
    service.assignExaminer(exam).then((result) => {
      User.findById(user.id, (_err, user) => {
        user.should.be.a('object')
        user.should.have.property('examList')
        done()
      })
    })
  })
})

describe('INTEGRAL TEST: confirmExam', () => {
  const otherExamTestData = {
    'subjectId': '66666',
    'subjectName': 'Dark Magic',
    'examName': 'exam1',
    'courseId': 1,
    'date': '5/31/2019',
    'maxScore': '23',
    'seatLineUpType': 'vertical',
    'seatOrderType': 'shuffle',
    'examConfirm': true,
    'rooms': [
      {
        'roomId': 'TS-101',
        'startTime': 10,
        'hours': 3,
        'maxStudent': '10',
        'examiners': [
          {
            'username': 'jeff'
          }
        ],
        'examSeats': [
          [
            {
              'seatNumber': '1A',
              'studentCode': 'jeff',
              'status': 'unregistered'
            },
            {
              'seatNumber': '2A',
              'studentCode': 'jeff',
              'status': 'unregistered'
            },
            {
              'seatNumber': '3A',
              'studentCode': 'jeff',
              'status': 'unregistered'
            }

          ], [
            {
              'seatNumber': '1B',
              'studentCode': 'jeff',
              'status': 'unregistered'
            },
            {
              'seatNumber': '2B',
              'studentCode': 'jeff',
              'status': 'unregistered'
            }
          ]
        ]
      }
    ]
  }

  const examTestData = {
    'subjectId': '66666',
    'subjectName': 'Dark Magic',
    'examName': 'exam2',
    'courseId': 1,
    'date': '5/31/2019',
    'maxScore': '23',
    'seatLineUpType': 'vertical',
    'seatOrderType': 'shuffle',
    'rooms': [
      {
        'roomId': 'TS-101',
        'startTime': 10,
        'hours': 3,
        'maxStudent': '10',
        'examiners': [
          {
            'username': 'jeff'
          }
        ]
      }
    ]
  }
  const userData = [
    {
      'username': 'test1',
      'typeOfUser': 'student',
      'courses': [
        {
          'group': 1,
          'subjectId': '66666',
          'courseId': 1
        }
      ]
    },
    {
      'username': 'test2',
      'typeOfUser': 'student',
      'courses': [
        {
          'group': 1,
          'subjectId': '66666',
          'courseId': 1
        }
      ]
    },
    {
      'username': 'test3',
      'typeOfUser': 'student',
      'courses': [
        {
          'group': 1,
          'subjectId': '66666',
          'courseId': 1
        }
      ]
    }
  ]

  const buildingData = {
    'building_name': 'test',
    'short_name': 'TS',
    'floors': 3,
    'Rooms': [
      {
        'roomId': 1,
        'floor': 1,
        'room': 'TS-101',
        'roomType': 'Lecture',
        'numberOfSeat': 50,
        'row': 5,
        'column': 5
      }
    ]
  }

  const exam1 = new Exam(otherExamTestData)
  const exam2 = new Exam(examTestData)
  const building = new Building(buildingData)

  before((done) => {
    User.insertMany(userData, () => {
      building.save((_err, result) => {
        exam1.save((_err, result) => {
          exam1._id = exam1.id
          exam2.save((_err, result) => {
            exam2._id = exam2.id
            done()
          })
        })
      })
    })
  })

  after((done) => {
    User.deleteMany({}, () => {
      Building.deleteMany({ building_name: building.building_name }, () => {
        Exam.deleteMany({}, () => {
          done()
        })
      })
    })
  })

  it('successful confirm exam', (done) => {
    const service = new ExamService()
    service.confirmExam(exam2.id).then((result) => {
      result.should.be.a('object')
      result.should.have.property('examConfirm')
      result.examConfirm.should.equal(true)
      Exam.findById(exam2.id, (_err, exam) => {
        exam.should.be.a('object')
        exam.should.have.property('examConfirm')
        exam.examConfirm.should.equal(true)
        done()
      })
    })
  }).timeout(10000)
})

describe('INTEGRAL TEST: route /confirm', () => {
  const otherExamTestData = {
    'subjectId': '66666',
    'subjectName': 'Dark Magic',
    'examName': 'exam1',
    'courseId': 1,
    'date': '5/31/2019',
    'maxScore': '23',
    'seatLineUpType': 'vertical',
    'seatOrderType': 'shuffle',
    'examConfirm': true,
    'rooms': [
      {
        'roomId': 'TS-101',
        'startTime': 10,
        'hours': 3,
        'maxStudent': '10',
        'examiners': [
          {
            'username': 'jeff'
          }
        ],
        'examSeats': [
          [
            {
              'seatNumber': '1A',
              'studentCode': 'jeff',
              'status': 'unregistered'
            },
            {
              'seatNumber': '2A',
              'studentCode': 'jeff',
              'status': 'unregistered'
            },
            {
              'seatNumber': '3A',
              'studentCode': 'jeff',
              'status': 'unregistered'
            }

          ], [
            {
              'seatNumber': '1B',
              'studentCode': 'jeff',
              'status': 'unregistered'
            },
            {
              'seatNumber': '2B',
              'studentCode': 'jeff',
              'status': 'unregistered'
            }
          ]
        ]
      }
    ]
  }

  const examTestData = {
    'subjectId': '66666',
    'subjectName': 'Dark Magic',
    'examName': 'exam2',
    'courseId': 1,
    'date': '5/31/2019',
    'maxScore': '23',
    'seatLineUpType': 'vertical',
    'seatOrderType': 'shuffle',
    'rooms': [
      {
        'roomId': 'TS-101',
        'startTime': 10,
        'hours': 3,
        'maxStudent': '10',
        'examiners': [
          {
            'username': 'jeff'
          }
        ]
      }
    ]
  }
  const userData = [
    {
      'username': 'test1',
      'typeOfUser': 'student',
      'courses': [
        {
          'group': 1,
          'subjectId': '66666',
          'courseId': 1
        }
      ]
    },
    {
      'username': 'test2',
      'typeOfUser': 'student',
      'courses': [
        {
          'group': 1,
          'subjectId': '66666',
          'courseId': 1
        }
      ]
    },
    {
      'username': 'test3',
      'typeOfUser': 'student',
      'courses': [
        {
          'group': 1,
          'subjectId': '66666',
          'courseId': 1
        }
      ]
    }
  ]

  const buildingData = {
    'building_name': 'test',
    'short_name': 'TS',
    'floors': 3,
    'Rooms': [
      {
        'roomId': 1,
        'floor': 1,
        'room': 'TS-101',
        'roomType': 'Lecture',
        'numberOfSeat': 50,
        'row': 5,
        'column': 5
      }
    ]
  }

  const exam1 = new Exam(otherExamTestData)
  const exam2 = new Exam(examTestData)
  const building = new Building(buildingData)

  before((done) => {
    User.insertMany(userData, () => {
      building.save((_err, result) => {
        exam1.save((_err, result) => {
          exam1._id = exam1.id
          exam2.save((_err, result) => {
            exam2._id = exam2.id
            done()
          })
        })
      })
    })
  })

  after((done) => {
    User.deleteMany({}, () => {
      Building.deleteMany({ building_name: building.building_name }, () => {
        Exam.deleteMany({}, () => {
          done()
        })
      })
    })
  })

  it('confirm successfuly', (done) => {
    chai.request(server).post('/exam/confirm').send({ examId: exam2.id }).end((_err, res) => {
      res.should.have.status(200)
      res.should.be.json
      res.body.should.be.a('object')
      res.body.should.have.property('examConfirm')
      res.body.examConfirm.should.equal(true)
      done()
    })
  })
})
