import algorithms from './index'
import Colors from '@/helpers/colors'
export default input => {
    let colors = [...algorithms.Closest(input)], index

    const firstIndex = () => index =  colors.length - 2
    firstIndex()

    while (index >= 0) {
        if (Colors.pathLength(colors) < Colors.pathLength(Colors.swap(colors, index, index + 1))) {
            --index
        } else {
            colors = Colors.swap(colors, index, index + 1)
            firstIndex()
        }
    }

    return colors
}
