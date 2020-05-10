const Cache = {
    data: {},
    get (index) {
        return this.data[index]
    },
    set (index, value) {
        return this.data[index] = value
    },
    getOrSet (index, value) {
        return index in this.data ? this.get(index) : this.set(index, value())
    },
}

export default {
    Cache,
    getDistance (a, b) {
        return Cache.getOrSet(['getDistance', ...[a,b].sort()], () => {
            let [aRed, aGreen, aBlue] = this.toRGB(a)
            let [bRed, bGreen, bBlue] = this.toRGB(b)
            return Math.sqrt(
                Math.pow((aRed - bRed), 2) +
                Math.pow((aGreen - bGreen), 2) +
                Math.pow((aBlue - bBlue), 2)
            )
        })
    },
    toRGB (hex) {
        return Cache.getOrSet(['rgb', hex], () => hex.replace('#', '')
            .match(/.{1,2}/g)
            .map(color => parseInt(color, 16)))
    },
    pathLength (list) {
        return Cache.getOrSet(['pathLength', list], () =>
            list.reduce((acc, curr, i) => acc += this.getDistance(list[i - 1] || list[i], curr), 0))
    },
    swap (list, a, b) {
        return Cache.getOrSet(['swap', list, a, b], () => {
            let copy = [...list]
            copy[a] = [copy[b], copy[b] = copy[a]][0]
            return copy
        })
    }
}