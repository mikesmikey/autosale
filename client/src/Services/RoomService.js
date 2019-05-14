import axios from 'axios'
class RoomService{
    editRoom (newBuildingData) {
        return new Promise((resolve, reject) => {
          axios.post(`/building/edit`, { 'BuildingData': newBuildingData }).then((result) => {
            resolve(result.data)
          })
        })
      }
      getRoomByRoomId (roomId) {
        return new Promise((resolve) => {
          var url = `/room/id=${roomId}`
          axios.get(url).then((result) => {
            resolve(result.data)
          })
        })
      }
}
export default RoomService