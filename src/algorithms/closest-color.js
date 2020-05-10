import Colors from '@/helpers/colors'
export default input => {
    let copy = [...input]
    let result = [copy.shift()]

    while (copy.length) {
        let current = result[result.length - 1]
        result.push(copy.sort((a, b) => Colors.getDistance(current, a) - Colors.getDistance(current, b)).shift())
    }
    return result
}