import coreApiClient from "@/providers/core-api/CoreApi"

export default {
  getEntities() {
    return coreApiClient.sendRequest("get", "/entities", {})
  },

  setStatus(data) {
    return coreApiClient.sendRequest("put", `/entities/${data.id}`, data)
  },

  setFilter(data){
    return coreApiClient.sendRequest("get", `/entities?${data}`)
  }
}
