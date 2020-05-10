import algorithms from './index'
import Colors from '@/helpers/colors'
export default input => {
    let colors = [...input], variations = []

    while (variations.length != colors.length) {
        variations.push(algorithms.SwapNeighbours([...colors]))
        colors.unshift(colors.pop())
    }
    return variations.sort((a, b) => Colors.pathLength(a) - Colors.pathLength(b))[0]
}