import Colors from '@/helpers/colors'
import HexSorting from './hex-sorting'
import Closest from './closest-color'
import SwapNeighbours from './swap-neighbours'
import ClosestStart from './closest-color-start'

function cacheFunctions (obj) {
    return Object.entries(obj).reduce((acc, [name, func]) => {
        acc[name] = (...params) => Colors.Cache.getOrSet([name, ...params], () => func(...params))
        return acc
    }, {})
}

export default cacheFunctions({
    HexSorting,
    Closest,
    SwapNeighbours,
    ClosestStart
})
