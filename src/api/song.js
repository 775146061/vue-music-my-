import {commonParams} from './config'
import {getUid} from 'common/js/uid'
import axios from 'axios'

export function getSongsUrl(songs) {
    const url = '/api/getPurlUrl'

    let mids = []
    let types = []

    songs.forEach((song) => {
        mids.push(song.mid)
        types.push(0)
    })

    const data = Object.assign({}, commonParams, {
        g_tk: 5381,
        format: 'json',
        platform: 'h5',
        needNewCode: 1,
        uin: 0
        })

        return axios.post(url, {
            comm: data,
            url_mid: genUrlMid(mids, types)
    }).then((res) => {
        return Promise.resolve(res.data)
    })
}

function genUrlMid(mids, types) {
    return {
        module: 'vkey.GetVkeyServer',
        method: 'CgiGetVkey',
        param: {
            guid: getUid(),
            songmid: mids,
            songtype: types,
            uin: '0',
            loginflag: 0,
            platform: '23'
        }
    }
}

export function getLyric(mid) {
    const url = '/api/lyric'

    const data = Object.assign({}, commonParams, {
        songmid: mid,
        pcachetime: new Date(),
        platform: 'yqq',
        hostUin: 0,
        needNewCode: 0,
        g_tk: 67232076,
        format: 'json'
    })

    return axios.get(url, {
        params: data
    }).then((res) => {
        return Promise.resolve(res.data)
    })
}
