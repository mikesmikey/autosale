/* eslint-disable no-new-object */
/* eslint-disable handle-callback-err */
const mongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectID
const url = 'mongodb+srv://jeff:jeff123@cluster0-mumpe.mongodb.net/test?retryWrites=true'
// const url = 'mongodb://hanami:hanami02@ds131765.mlab.com:31765/ooad_kob'
const dbName = 'ooad_kob'

class WebDAO {
  /* ===========[User DAO]=================== */
  getAllUser () {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
        if (err) { resolve(null) }

        const db = client.db(dbName)
        db.collection('User').find({}).project({ '_id': 0, 'password': 0 }).toArray((err, data) => {
          if (err) { throw err }
          client.close()
          return resolve(data)
        })
        client.close()
      })
    })
  }

  countUserInCollectionByType (type) {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
        if (err) { resolve(null) }
        if (!client) return resolve(null)
        const db = client.db(dbName)
        db.collection('User').find({ 'typeOfUser': type }).count((err, data) => {
          if (err) { throw err }
          client.close()
          return resolve(data)
        })
      })
    })
  }

  countUserInCollectionByTypeAndUsername (type, username) {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
        if (err) { resolve(null) }

        const db = client.db(dbName)
        const regex = new RegExp(`${username}`)
        db.collection('User').find({ 'username': regex, 'typeOfUser': type }).count((err, data) => {
          if (err) { throw err }
          client.close()
          return resolve(data)
        })
      })
    })
  }

  getUserByUsername (username) {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
        if (err) { resolve(null) }
        if (!client) return resolve(null)
        const db = client.db(dbName)
        db.collection('User').findOne({ 'username': username }, { '_id': 0, 'password': 0 }, (err, data) => {
          if (err) { throw err }
          client.close()
          return resolve(data)
        })
      })
    })
  }

  insertUser (user) {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
        if (err) { resolve(null) }

        const db = client.db(dbName)
        db.collection('User').findOne({ 'username': user.username }, (err, data) => {
          if (err) { throw err }
          if (!data) {
            db.collection('User').insertOne(user, (err, result) => {
              if (err) { throw err }
              client.close()
              return resolve(true)
            })
          } else { client.close(); return resolve(false) }
        })
      })
    })
  }

  insertManyUser (users) {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
        if (err) { resolve(null) }

        const db = client.db(dbName)
        db.collection('User').insertMany(users, (err, result) => {
          if (err) { throw err }
          client.close()
          return resolve(true)
        })
        client.close()
      })
    })
  }

  addManyStudents (users) {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
        if (err) { resolve(null) }

        const db = client.db(dbName)
        db.collection('User').insertMany(users, (err, result) => {
          if (err) { throw err }
          client.close()
          return resolve(true)
        })
        client.close()
      })
    })
  }

  editUser (newUserData) {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
        if (err) { resolve(null) }

        const db = client.db(dbName)
        db.collection('User').findOneAndUpdate({ 'username': newUserData.username }, { '$set': newUserData }, (err, result) => {
          if (err) { throw err }
          if (result.value) {
            client.close()
            return resolve(true)
          } else { client.close(); return resolve(false) }
        })
        client.close()
      })
    })
  }

  deleteUserByUsername (username) {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
        if (err) { resolve(null) }

        const db = client.db(dbName)
        db.collection('User').findOne({ 'username': username }, (err, data) => {
          if (err) { throw err }
          if (data) {
            db.collection('User').deleteOne({ username }, (err, result) => {
              if (err) { throw err }
              client.close()
              return resolve(true)
            })
          } else { client.close(); return resolve(false) }
        })
      })
    })
  }

  getAllUserByType (type, startPos, limit) {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
        if (err) { resolve(null) }
        if (!client) return resolve(null)
        const db = client.db(dbName)
        db.collection('User').find({ 'typeOfUser': type }).project({ '_id': 0, 'password': 0 }).skip(Number.parseInt(startPos)).limit(Number.parseInt(limit)).toArray((err, data) => {
          if (err) { throw err }
          client.close()
          return resolve(data)
        })
      })
    })
  }

  getAllUserByTypeAndUsername (type, username, startPos, limit) {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
        if (err) { resolve(null) }

        const db = client.db(dbName)
        const regex = new RegExp(`${username}`)
        db.collection('User').find({ 'username': regex, 'typeOfUser': type }).project({ '_id': 0, 'password': 0 }).skip(Number.parseInt(startPos)).limit(Number.parseInt(limit)).toArray((err, data) => {
          if (err) { throw err }
          client.close()
          return resolve(data)
        })
      })
    })
  }

  /* ===========[Student DAO] ================== */
  getAllStudentByRegisteredCourse (subjectId, courseId) {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
        if (err) { resolve(null) }

        const db = client.db(dbName)
        const query = { 'typeOfUser': 'student',
          'courses.subjectId': subjectId,
          'courses.courseId': courseId
        }
        db.collection('User').find(query).project({ '_id': 0, 'password': 0 }).toArray((err, data) => {
          if (err) { throw err }
          client.close()
          return resolve(data)
        })
      })
    })
  }

  /* ===========[Faculty DAO]=================== */
  getAllFaculty () {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
        if (err) { resolve(null) }

        const db = client.db(dbName)
        db.collection('Faculty').find({}).project({ '_id': 0 }).toArray((err, data) => {
          if (err) { throw err }
          client.close()
          data.found = true
          return resolve(data)
        })
        client.close()
      })
    })
  }
  /* ===========[Score DAO]=================== */

  getAllExamByUsername (username) {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, { useNewUrlParser: true }, (_err, client) => {
        if (_err) { resolve(null) }
        const db = client.db(dbName)
        db.collection('Exam').find({ 'ExamSeat.studentCode': username }).project({ '_id': 0, 'password': 0 }).toArray((err, data) => {
          if (err) { throw err }
          client.close()
          return resolve(data)
        })
        client.close()
      })
    })
  }

  getAllExamBySubjectId (SubjectId, username) {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, { useNewUrlParser: true }, (_err, client) => {
        if (_err) { resolve(null) }
        const db = client.db(dbName)
        const regex = new RegExp(`${SubjectId}`)
        db.collection('Exam').find({ 'subjectId': regex, 'ExamSeat.studentCode': username }).project({ '_id': 0, 'password': 0 }).toArray((err, data) => {
          if (err) { throw err }
          client.close()
          return resolve(data)
        })
        client.close()
      })
    })
  }

  insertCourseByThisSubject (subjid, courseData) {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, { useNewUrlParser: true }, (_err, client) => {
        if (_err) { resolve(null) }
        const db = client.db(dbName)
        db.collection('Subject').findOneAndUpdate({ 'subjectId': subjid }, { '$push': { 'courses': courseData } }, (err, result) => {
          if (err) { throw err }
          if (result.value) {
            client.close()
            return resolve(true)
          } else {
            client.close()
            return resolve(false)
          }
        })
        client.close()
      })
    })
  }

  /* ===========[GlobalData DAO]=================== */
  getYearAndTerm () {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
        if (err) { resolve(null) }
        const db = client.db(dbName)
        if (!client) return resolve(null)
        db.collection('GlobalData').findOne({}, (err, data) => {
          if (err) { throw err }
          client.close()
          return resolve(data)
        })
        client.close()
      })
    })
  }

  getAllYearAndTerm () {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
        if (err) { resolve(null) }
        const db = client.db(dbName)
        db.collection('GlobalData').find({}).project({ '_id': 0 }).toArray((err, data) => {
          if (err) { throw err }
          client.close()
          return resolve(data)
        })
        client.close()
      })
    })
  }

  editYearAndTerm (newGlobalData) {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
        if (err) { resolve(null) }
        const db = client.db(dbName)
        db.collection('GlobalData').findOneAndUpdate({ 'id': newGlobalData.id }, { '$set': newGlobalData }, (err, result) => {
          if (err) { throw err }
          if (result.value) {
            client.close()
            return resolve(true)
          } else {
            client.close()
            return resolve(false)
          }
        })
        client.close()
      })
    })
  }

  /* ===========[Room DAO]=================== */

  getAllBuilding () {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, { useNewUrlParser: true }, (_err, client) => {
        if (_err) { resolve(null) }
        const db = client.db(dbName)
        db.collection('Building').find({}).project({ '_id': 0, 'password': 0 }).toArray((err, data) => {
          if (err) { throw err }
          client.close()
          return resolve(data)
        })
        client.close()
      })
    })
  }

  editRoom (newBuildingData) {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, { useNewUrlParser: true }, (_err, client) => {
        const db = client.db(dbName)
        db.collection('Building').findOneAndUpdate({ 'building_name': newBuildingData.building_name }, { '$set': newBuildingData }, (err, result) => {
          if (err) { throw err }
          if (result.value) {
            return resolve(true)
          } else { return resolve(false) }
        })
        client.close()
      })
    })
  }

  getRoomByRoomId (roomId) {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
        if (err) { resolve(null) }
        const db = client.db(dbName)
        if (!client) return resolve(null)
        db.collection('Building').aggregate(
          [
            {
              '$match': { 'Rooms.room': roomId }
            },
            {
              '$project': {
                'rooms': {
                  '$filter': {
                    'input': '$Rooms',
                    'as': 'room',
                    'cond': { '$eq': [ '$$room.room', roomId ] }
                  }
                }
              }
            }
          ]
        ).toArray((err, data) => {
          if (err) { throw err }
          client.close()
          return resolve(data)
        })
        client.close()
      })
    })
  }

  /* ===========[Building DAO]=================== */
  getBuilding () {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
        if (err) { resolve(null) }
        const db = client.db(dbName)
        db.collection('Building').find({}).toArray((err, data) => {
          if (err) { throw err }
          client.close()
          return resolve(data)
        })
        client.close()
      })
    })
  }

  insertBuilding (building) {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
        if (err) { resolve(null) }
        const db = client.db(dbName)
        db.collection('Building').findOne({ 'short_name': building.short_name }, (err, data) => {
          if (err) { throw err }
          if (!data) {
            db.collection('Building').insertOne(building, (err, result) => {
              if (err) { throw err }
              client.close()
              return resolve(true)
            })
          } else {
            client.close()
            return resolve(false)
          }
        })
      })
    })
  }

  deleteBuildingByShortName (shortname) {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
        if (err) { resolve(null) }
        const db = client.db(dbName)
        db.collection('Building').findOne({ 'short_name': shortname }, (err, data) => {
          if (err) { throw err }
          if (data) {
            db.collection('Building').deleteOne({ 'short_name': shortname }, (err, result) => {
              if (err) { throw err }
              client.close()
              return resolve(true)
            })
          } else {
            client.close()
            return resolve(false)
          }
        })
      })
    })
  }

  getAllBuildingByRoom (buildingname, roomname) {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, { useNewUrlParser: true }, (_err, client) => {
        if (_err) { resolve(null) }
        const db = client.db(dbName)
        const regex = new RegExp(`${roomname}`)
        db.collection('Building').find({ 'building_name': buildingname, 'Rooms.room': regex }).project({ '_id': 0, 'password': 0 }).toArray((err, data) => {
          if (err) { throw err }
          client.close()
          return resolve(data)
        })
        client.close()
      })
    })
  }
  /* ===========[Examiner DAO]=================== */

  countUserInCollectionByTypeAndName (type, name) {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
        if (err) { resolve(null) }

        const db = client.db(dbName)
        const regex = new RegExp(`${name}`)
        db.collection('User').find({ 'firstName': regex, 'typeOfUser': type }).count((err, data) => {
          if (err) { throw err }
          client.close()
          return resolve(data)
        })
      })
    })
  }

  getAllUserByTypeAndName (type, name, startPos, limit) {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
        if (err) { resolve(null) }

        const db = client.db(dbName)
        const regex = new RegExp(`${name}`)
        db.collection('User').find({ 'firstName': regex, 'typeOfUser': type }).project({ '_id': 0, 'password': 0 }).skip(Number.parseInt(startPos)).limit(Number.parseInt(limit)).toArray((err, data) => {
          if (err) { throw err }
          client.close()
          return resolve(data)
        })
      })
    })
  }
  /* ===========[Subject DAO]=================== */

  getAllSubjectBySubjectName (subjname) {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
        const db = client.db(dbName)
        const regex = new RegExp(`${subjname}`)
        db.collection('Subject').find({ 'subjectName': regex }).limit(16).project({ '_id': 0 }).toArray((err, data) => {
          if (err) { throw err }
          client.close()
          return resolve(data)
        })
        client.close()
      })
    })
  }

  getAllSubjectBySubjectIdMoreOne (subjid) {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
        const db = client.db(dbName)
        const regex = new RegExp(`${subjid}`)
        db.collection('Subject').find({ 'subjectId': regex }).limit(16).project({ '_id': 0 }).toArray((err, data) => {
          if (err) { throw err }
          client.close()
          return resolve(data)
        })
        client.close()
      })
    })
  }

  getAllSubjectBySubjectId (subjid) {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
        const db = client.db(dbName)
        db.collection('Subject').find({ '$or': [{ 'subjectId': subjid }] }).limit(16).project({ '_id': 0 }).toArray((err, data) => {
          if (err) { throw err }
          client.close()
          return resolve(data)
        })
        client.close()
      })
    })
  }

  getAllSubject () {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
        const db = client.db(dbName)
        db.collection('Subject').find({}).project({ '_id': 0 }).toArray((err, data) => {
          if (err) { throw err }
          client.close()
          return resolve(data)
        })
        client.close()
      })
    })
  }

  insertSubject (subject) {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
        const db = client.db(dbName)
        db.collection('Subject').findOne({ '$or': [{ 'subjectId': subject.subjectId }, { 'subjectName': subject.subjectName }] }, (err, data) => {
          if (err) { throw err }
          if (!data) {
            db.collection('Subject').insertOne(subject, (err, result) => {
              if (err) { throw err }
              client.close()
              return resolve(true)
            })
          } else {
            client.close()
            return resolve(false)
          }
        })
        client.close()
      })
    })
  }

  getAllCourseByThisSubject (subjname) {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
        const db = client.db(dbName)
        db.collection('Subject').find({}).project({ '_id': 0 }).toArray((err, data) => {
          if (err) { throw err }
          client.close()
          return resolve(data)
        })
        client.close()
      })
    })
  }
  /* ===========[Course DAO]=================== */
  // coming with subject name, subject id

  // ******* [BUG?] NEED MATCH OPERATOR TO RETREVE ONLY MATCH OBJECT *******
  getAllCourseByYearAndSemester (year, semester) {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
        if (err) { resolve(null) }

        const db = client.db(dbName)
        db.collection('Subject').aggregate(
          [
            {
              '$match': { '$and':
              [
                { 'courses.school_year': Number.parseInt(year) },
                { 'courses.semester': Number.parseInt(semester) }
              ] }
            },
            {
              '$project': {
                '_id': 0,
                'subjectId': 1,
                'subjectName': 1,
                'courses': {
                  '$filter': {
                    'input': '$courses',
                    'as': 'course',
                    'cond': {
                      '$and': [
                        { '$eq': ['$$course.school_year', Number.parseInt(year)] },
                        { '$eq': ['$$course.semester', Number.parseInt(semester)] }
                      ]
                    }
                  }
                }
              }
            }
          ]
        ).toArray((err, data) => {
          if (err) { throw err }
          client.close()
          return resolve(data)
        })
        client.close()
      })
    })
  }

  getAllCourseByYearSemesterAndSubjectId (year, semester, subjectId, startPos, limit) {
    if (subjectId === 'none') {
      subjectId = ''
    }
    if (limit <= 0) {
      limit = Number.MAX_SAFE_INTEGER
    }

    return new Promise((resolve, reject) => {
      mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
        if (err) { resolve(null) }

        const db = client.db(dbName)

        const regex = new RegExp(`${subjectId}`)
        db.collection('Subject').aggregate(
          [
            {
              '$match': {
                '$and':
                  [
                    { 'subjectId': { '$regex': regex } },
                    { 'courses.school_year': Number.parseInt(year) },
                    { 'courses.semester': Number.parseInt(semester) }
                  ]
              }
            },
            {
              '$project': {
                '_id': 0,
                'subjectId': 1,
                'subjectName': 1,
                'courses': {
                  '$filter': {
                    'input': '$courses',
                    'as': 'course',
                    'cond': {
                      '$and': [
                        { '$eq': ['$$course.school_year', Number.parseInt(year)] },
                        { '$eq': ['$$course.semester', Number.parseInt(semester)] }
                      ]
                    }
                  }
                }
              }
            }
          ]
        ).skip(Number.parseInt(startPos)).limit(Number.parseInt(limit)).toArray((err, data) => {
          if (err) { throw err }
          client.close()
          return resolve(data)
        })
        client.close()
      })
    })
  }

  getAllSubjectCurrent () {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
        if (err) { resolve(null) }
        const db = client.db(dbName)
        this.getYearAndTerm().then((NowCurrent) => {
          db.collection('Subject').find({ 'courses': { $elemMatch: { school_year: NowCurrent.currentStudyYear, semester: NowCurrent.currentStudyTerm } } }).toArray((err, data) => {
            if (err) { throw err }
            for (var i = 0; i < data.length; i++) {
              for (var j = 0; j < data[i].courses.length; j++) {
                if (data[i].courses[j].school_year === NowCurrent.currentStudyYear &&
                  data[i].courses[j].semester === NowCurrent.currentStudyTerm) {
                  data[i].indexCouresCurrent = data[i].courses[j].courseId - 1
                }
              }
            }
            var date = [NowCurrent.currentStudyYear, NowCurrent.currentStudyTerm]
            data.push(date)
            client.close()
            return resolve(data)
          })
        })
        // client.close()
      })
    })
  }

  getObjectRegisterCourseBySubjectId (id) {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
        if (err) { resolve(null) }
        const db = client.db(dbName)
        db.collection('User').find({ typeOfUser: 'student', 'RegisteredCourse': { $elemMatch: { subjectId: id } } }).count((err, StudentData) => {
          if (err) { throw err }
          db.collection('User').find({ typeOfUser: 'professor', 'RegisteredCourse': { $elemMatch: { subjectId: id } } }).toArray((err, TeacherData) => {
            if (err) { throw err }
            client.close()
            let ObjectData = []
            ObjectData.push({ student: StudentData })
            let listTecher = []
            for (var i = 0; i < TeacherData.length; i++) {
              listTecher.push({ firstName: TeacherData[i].firstName, lastName: TeacherData[i].lastName })
            }
            ObjectData.push(listTecher)
            return resolve(ObjectData)
          })
        })
        // client.close()
      })
    })
  }

  getNameTeacherInRegisterCourseBySubjectId (type) {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
        if (err) { resolve(null) }
        const db = client.db(dbName)
        db.collection('User').find(
          { typeOfUser: 'professor', 'RegisteredCourse': { $elemMatch: { subjectId: type } } }).toArray((err, data) => {
          if (err) { throw err }
          var listData = []
          for (var i = 0; i < data.length; i++) {
            var obj = { firstName: data[i].firstName, lastName: data[i].lastName }
            listData.push(obj)
          }
          client.close()
          return resolve(listData)
        })
        // eslint-disable-next-line no-unused-expressions
        // client.close()
      })
    })
  }

  getCountRegisterCourseStudentBySubjectId (id) {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
        if (err) { resolve(null) }
        const db = client.db(dbName)
        db.collection('User').find({ typeOfUser: 'student', 'RegisteredCourse': { $elemMatch: { subjectId: id } } }).count((err, data) => {
          if (err) { throw err }
          client.close()
          return resolve(true)
        })
        // client.close()
      })
    })
  }
  deleteCourse (sjid, cid) {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
        if (err) { resolve(null) }
        const db = client.db(dbName)
        // eslint-disable-next-line no-undef
        console.log(sjid, cid)
        // eslint-disable-next-line no-undef
        db.collection('Subject').updateMany({ subjectId: sjid }, { $pull: { courses: { courseId: Number.parseInt(cid) } } }, (err, data) => {
          if (err) { throw err }
          db.collection('User').updateMany({ '$or': [{ typeOfUser: 'professor' }, { typeOfUser: 'student' }] }, { $pull: { RegisteredCourse: { subjectId: sjid } } }, (err, data) => {
            if (err) { throw err }
            client.close()
            return resolve(true)
          })
        })
        // client.close()
      })
    })
  }

  getCourseBySubjectAndCourseId (subjectId, courseId) {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
        if (err) { resolve(null) }
        const db = client.db(dbName)
        db.collection('Subject').aggregate(
          [
            {
              '$match': { '$and':
              [
                { 'subjectId': subjectId },
                { 'courses.courseId': Number.parseInt(courseId) }
              ] }
            },
            {
              '$project': {
                '_id': 0,
                'subjectId': 1,
                'subjectName': 1,
                'courses': {
                  '$filter': {
                    'input': '$courses',
                    'as': 'course',
                    'cond': { '$eq': [ '$$course.courseId', Number.parseInt(courseId) ] }
                  }
                }
              }
            }
          ]
        ).toArray((err, data) => {
          if (err) { throw err }
          client.close()
          return resolve(data)
        })
        client.close()
      })
    })
  }

  /* ===========[Exam DAO]=================== */

  getAllExamBySubjectIdAndCourseId (subjectId, courseId) {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
        if (err) { resolve(null) }

        const db = client.db(dbName)
        db.collection('Exam').find({ '$and': [{ 'subjectId': subjectId }, { 'courseId': Number.parseInt(courseId) }] }).toArray((err, data) => {
          if (err) { throw err }
          client.close()
          return resolve(data)
        })
        client.close()
      })
    })
  }

  insertExam (examData) {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
        if (err) { resolve(null) }
        const db = client.db(dbName)
        db.collection('Exam').findOne({ 'subjectId': examData.subjectId, 'courseId': examData.courseId, 'date': examData.date }, (err, data) => {
          if (err) { throw err }
          if (!data) {
            db.collection('Exam').insertOne(examData, (err, result) => {
              if (err) { throw err }
              client.close()
              return resolve(result.insertedId)
            })
          } else { client.close(); return resolve(false) }
        })
      })
    })
  }

  deleteExam (objectIdStr) {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
        if (err) { resolve(null) }

        const db = client.db(dbName)
        db.collection('Exam').findOneAndDelete({ '_id': new ObjectId(objectIdStr) }, (err, result) => {
          if (err) { throw err }
          client.close()
          return resolve(true)
        })
        client.close()
      })
    })
  }

  getAllExamByDateAndRoom (date, roomId) {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
        if (err) { resolve(null) }

        const db = client.db(dbName)

        db.collection('Exam').aggregate(
          [
            {
              '$match': { '$and':
              [
                { 'date': date },
                { 'rooms.roomId': roomId }
              ] }
            },
            {
              '$addFields': {
                'rooms': {
                  '$filter': {
                    'input': '$rooms',
                    'as': 'room',
                    'cond': { '$eq': [ '$$room.roomId', roomId ] }
                  }
                }
              }
            }
          ]
        ).toArray((err, data) => {
          if (err) { throw err }
          client.close()
          return resolve(data)
        })
        client.close()
      })
    })
  }

  addRoomIntoExam (examId, roomData) {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
        if (err) { resolve(null) }
        if (!client) return resolve(null)
        const db = client.db(dbName)
        db.collection('Exam').findOneAndUpdate({ '_id': new ObjectId(examId) }, { '$push': { 'rooms': roomData } }, (err, result) => {
          if (err) { throw err }
          if (result) {
            client.close()
            return resolve(true)
          } else { return resolve(false) }
        })
        client.close()
      })
    })
  }

  updateExamData (examId, newData) {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
        if (err) { resolve(null) }
        if (!client) return resolve(null)
        const db = client.db(dbName)
        db.collection('Exam').findOneAndUpdate({ '_id': new ObjectId(examId) }, { '$set': newData }, (err, result) => {
          if (err) { throw err }
          if (result) {
            client.close()
            return resolve(true)
          } else { return resolve(false) }
        })
        client.close()
      })
    })
  }

  deleteExamRoom (objId, roomId, startTime) {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
        if (err) { resolve(null) }
        const db = client.db(dbName)
        // eslint-disable-next-line no-dupe-keys
        db.collection('Exam').findOne({ '_id': new ObjectId(objId), 'rooms': { '$elemMatch': { 'roomId': roomId }, '$elemMatch': { 'startTime': Number.parseInt(startTime) } } }, (err, data) => {
          if (err) { throw err }
          if (data) {
            // eslint-disable-next-line no-dupe-keys
            db.collection('Exam').update({ '_id': new ObjectId(objId), 'rooms': { '$elemMatch': { 'roomId': roomId }, '$elemMatch': { 'startTime': Number.parseInt(startTime) } } }, { $pull: { 'rooms': { 'roomId': roomId, 'startTime': Number.parseInt(startTime) } } }, { multi: true }, (err, result) => {
              if (err) { throw err }
              client.close()
              return resolve(true)
            })
          } else {
            client.close()
            return resolve(false)
          }
        })
      })
    })
  }

  getExamByObjId (objId) {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
        if (err) { resolve(null) }
        if (!client) return resolve(null)
        const db = client.db(dbName)
        db.collection('Exam').findOne({ '_id': new ObjectId(objId) }, (err, data) => {
          if (err) { throw err }
          client.close()
          return resolve(data)
        })
      })
    })
  }

  updateExamSeatType (objId, seatLineUpType, seatOrderType) {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
        if (err) { resolve(null) }
        if (!client) return resolve(null)
        const db = client.db(dbName)
        db.collection('Exam').findOneAndUpdate({ '_id': new ObjectId(objId) }, { $set: { 'seatLineUpType': seatLineUpType, 'seatOrderType': seatOrderType } }, { multi: true }, (err, result) => {
          if (err) { throw err }
          if (result.value) {
            client.close()
            return resolve(true)
          } else { client.close(); return resolve(false) }
        })
        client.close()
      })
    })
  }

  /* ===========[Examiner DAO]=================== */
  addExaminerIntoRoom (Id, Data) {
    return new Promise((resolve, reject) => {
      mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
        if (err) { resolve(null) }
        const db = client.db(dbName)
        db.collection('Exam').findOneAndUpdate({ '_id': new ObjectId(Id) }, { '$set': { 'rooms': Data } }, (err, result) => {
          if (err) { throw err }
          if (result) {
            client.close()
            return resolve(true)
          } else { return resolve(false) }
        })
        client.close()
      })
    })
  }
}

module.exports = WebDAO
