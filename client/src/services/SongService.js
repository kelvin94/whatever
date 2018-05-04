// this file is for hitting the endpoint in the backend
import Api from '@/services/Api'
// 上面的@符号出现是因为我们用了babel-plugin-root-import in our webpack/babel config, bascially it means 'from the root of the project', aviods writing things like '../../../..'
export default {
  index () {
    // 这里Api要带括号来用是因为在Api.js里面我们是当作function来export
    return Api().get('songs')
  }
}
