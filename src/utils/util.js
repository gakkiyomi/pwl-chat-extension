export function getDate() {
  let now = new Date()
  return now.getFullYear() + '-' + repair(now.getMonth() + 1) + '-' + repair(now.getDate())
}

export function getDateTime(str) {
  let now = str ? new Date(str) : new Date()
  return now.getFullYear() + '-' + repair(now.getMonth() + 1) + '-' + repair(now.getDate()) + ' ' + repair(now.getHours() + 8) + ':' + repair(now.getMinutes()) + ':' + repair(now.getSeconds())
}

export function isRedPacket(message) {
  return (
    message.content && -1 !== message.content.indexOf('msgType":"redPacket')
  )
}

function repair(s) {
  return s < 10 ? '0' + s : s
}