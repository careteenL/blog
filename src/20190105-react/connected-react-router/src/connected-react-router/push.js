
import { CALL_HISTORY_METHOD } from './types';
export default function push(...args) {
    return {
        type: CALL_HISTORY_METHOD,
        payload: {
            //push pop replace go goBack forward
            method: 'push',//将会调用history.push('/counter')
            args           //args=['/counter']
        }
    }
}
/**
 *
export const push = updateLocation('push')
export const replace = updateLocation('replace')
export const go = updateLocation('go')
export const goBack = updateLocation('goBack')
export const goForward = updateLocation('goForward')

history.push('/counter');
hash history window.location.hash = '/counter'
browser history   window.history.pushState(null,null,'/counter');
 */