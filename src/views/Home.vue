<template>
    <div class="home">
        <div class="algorithms">
            <div class="algorithm-item">
                <div class="heading">Sorting Colours</div>
                <div class="introduction">
                    This is a visualization of a colour sorting algorithm.
                    The purpose is to find the shortest path connecting all colours.
                    At each step, I apply a different concept to the previous set of colours.
                    These concepts can help sort (n) dimensional datasets
                </div>
            </div>
            <div class="algorithm-item">
                <button class="flex-btn" @click="updateColors">Generate new colours</button>
                <div class="row-actions">
                    <color-list :colors="colors" @select="startWithColor"></color-list>
                    <button
                        class="action"
                        :class="{selected: path === 0}"
                        @click="path = 0"
                    ><i class="fas fa-wave-square"></i></button>
                </div>
                <small>Length: {{ Math.round($options.Colors.pathLength(colors)) }}</small>
            </div>
            <div class="algorithm-item">
                <div class="title">Sorting by hex value</div>
                <div class="row-actions">
                    <color-list :colors="$options.algorithms.HexSorting([...colors])" @select="startWithColor"></color-list>
                    <button
                        class="action"
                        :class="{selected: path === 1}"
                        @click="path = 1"
                    ><i class="fas fa-wave-square"></i></button>
                </div>
                <small>Length: {{ Math.round($options.Colors.pathLength($options.algorithms.HexSorting([...colors]))) }}</small>
            </div>
            <div class="algorithm-item">
                <div class="title">Nearest colour</div>
                <div class="row-actions">
                    <color-list :colors="$options.algorithms.Closest([...colors])" @select="startWithColor"></color-list>
                    <button
                        class="action"
                        :class="{selected: path === 2}"
                        @click="path = 2"
                    ><i class="fas fa-wave-square"></i></button>
                </div>
                <small>Length: {{ Math.round($options.Colors.pathLength($options.algorithms.Closest([...colors]))) }}</small>
            </div>
            <div class="algorithm-item">
                <div class="title">Swap neighbours</div>
                <div class="row-actions">
                    <color-list :colors="$options.algorithms.SwapNeighbours([...colors])" @select="startWithColor"></color-list>
                    <button
                        class="action"
                        :class="{selected: path === 3}"
                        @click="path = 3"
                    ><i class="fas fa-wave-square"></i></button>
                </div>
                <small>Length: {{ Math.round($options.Colors.pathLength($options.algorithms.SwapNeighbours([...colors]))) }}</small>
            </div>
            <div class="algorithm-item">
                <div class="title">Optimal start position</div>
                <div class="row-actions">
                    <color-list :colors="$options.algorithms.ClosestStart([...colors])" @select="startWithColor"></color-list>
                    <button
                        class="action"
                        :class="{selected: path === 4}"
                        @click="path = 4"
                    ><i class="fas fa-wave-square"></i></button>
                </div>
                <small>Length: {{ Math.round($options.Colors.pathLength($options.algorithms.ClosestStart([...colors]))) }}</small>
            </div>

            <div class="algorithm-item profile">
                <a
                    href="https://asmbatha.github.io/"
                    class="profile-card"
                    target="_blank"
                >
                    <img alt="Vue logo" src="@/assets/avator.jpeg" class="avator">
                    <div class="details">
                        by
                        <div class="name">Ayanda S. Mbatha</div>
                    </div>
                    <span class="portfolio"><i class="fas fa-briefcase"></i> Portfolio</span>
                </a>
                <ul class="contact-card fa-ul">
                    <li>
                        <span class="fa-li"><i class="fab fa-github" aria-hidden="true"></i></span>
                        <a href="https://github.com/asmbatha">github.com/asmbatha</a>
                    </li>
                    <li>
                        <span class="fa-li"><i class="fab fa-linkedin" aria-hidden="true"></i></span>
                        <a href="https://www.linkedin.com/in/asmbatha/" target="_blank">linkedin.com/in/asmbatha</a>
                    </li>
                    <li>
                        <span class="fa-li"><i class="far fa-envelope" aria-hidden="true"></i></span>
                        <a href="mailto:asmbatha.13@gmail.com">asmbatha.13@gmail.com</a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="scatter-plot" ref="viewport">
            <plotly
                :data="data"
                :layout="layout"
                :displayModebar="false"
            ></plotly>
        </div>
    </div>
</template>

<script>
// components
import ColorList from '@/components/ColorList'

// packages
import Colors from '@/helpers/colors'
import algorithms from '@/algorithms/index'
import { Plotly } from 'vue-plotly'
import { mapActions, mapGetters } from 'vuex'

export default {
    name: 'Home',
    components: {
        ColorList,
        Plotly
    },
    algorithms,
    Colors,
    data () {
        return {
            path: 4,
            height: 888
        }
    },
    computed: {
        ...mapGetters(['colors']),
        data () {
            return [
                ...[
                    a => a,
                    algorithms.HexSorting,
                    algorithms.Closest,
                    algorithms.SwapNeighbours,
                    algorithms.ClosestStart,
                ][this.path]([...this.colors]).map((color, index) => {
                    let [x, y, z] = Colors.toRGB(color)

                    return {
                        x: [x],
                        y: [y],
                        z: [z],
                        name: color,
                        mode: 'markers',
                        type: 'scatter3d',
                        marker: {
                            color,
                            size: 6,
                        }
                    }
                }),
                (() => {
                    let list = [
                        a => a,
                        algorithms.HexSorting,
                        algorithms.Closest,
                        algorithms.SwapNeighbours,
                        algorithms.ClosestStart,
                    ][this.path]([...this.colors])

                    return {
                        x: list.map(color => Colors.toRGB(color)[0]),
                        y: list.map(color => Colors.toRGB(color)[1]),
                        z: list.map(color => Colors.toRGB(color)[2]),
                        name: Math.round(Colors.pathLength(list)),
                        type: 'scatter3d',
                        marker: {
                            color: 'black',
                            size: 1
                        }
                    }
                })()
            ]
        },
        layout () {
            return {
                autosize: true,
                showlegend: true,
                height: this.height,
                margin: {
                    l: 0,
                    r: 0,
                    b: 0,
                    t: 100,
                    pad: 0
                },
                paper_bgcolor: '#FFFFFF',
                scene: {
                    aspectratio: {
                        x: .7,
                        y: .7,
                        z: .7
                    },
                    camera: {
                        center: {
                            x: 0,
                            y: 0,
                            z: 0
                        },
                        eye: {
                            x: 1,
                            y: 1,
                            z: 1
                        },
                        up: {
                            x: 0,
                            y: 0,
                            z: 1
                        }
                    },
                    xaxis: {
                        showgrid: true,
                        zeroline: false,
                        showticklabels: false,
                    },
                    yaxis: {
                        showgrid: true,
                        zeroline: false,
                        showticklabels: false,
                    },
                    zaxis: {
                        showgrid: true,
                        zeroline: false,
                        showticklabels: false,
                    }
                },
                title: '3D Plot'
            }
        }
    },
    mounted () {
        this.height = this.$refs['viewport'].offsetHeight
    },
    methods: {
        ...mapActions (['updateColors', 'startWithColor']),
    }
}
</script>

<style lang="scss" scoped>
.profile {
    a {
        color: #0366d6;
    }
    .profile-card {
        display: flex;
        align-items: center;
        text-decoration: none;
        // text-align: right;
        color: #333;
        img {
            width: 48px;
            margin-right: 8px;
            border: 1px solid #D4D5D6;
            border-radius: 6px;
        }
        .details {
            flex: 1;
            font-size: 0.825em;
            .name {
                font-size: 1.25em;
            }
        }
        .portfolio {
            font-size: .875em;
            color: #0366d6;
            border: 1px solid #0366d6;
            padding: 4px 6px;
            border-radius: 3px;
        }
    }
    .contact-card {
        li {
            line-height: 1.6em;
            font-size: .875em;
        }
    }
}
.row-actions {
    margin-top: 4px;
    display: flex;
    align-items: center;
    .action {
        height: 26px;
        margin-left: 4px;
        font-size: .75em;
        // border: none;
        cursor: pointer;
        border-width: medium;
        outline: none;
        border-radius: 8px;

        &.selected {
            background: #FFF;
            color: #0366d6;
            border-color: #2196f3;
        }
    }
}
.flex-btn {
    flex: 1;
    padding: .5em;
    font-size: 1em;
    margin-bottom: 4px;
    background-color: #EEE;
    outline-color: #0366d6;
    border-radius: 3px;
    border-width: medium;
}
.home {
    @media screen and (min-width: 800px) {    
        display: flex;
    }
    .algorithms {
        background: #fafbfc;
        border-right: 1px solid #DDD;
        overflow: auto;
        @media screen and (min-width: 800px) {    
            height: 100vh;
            width: 50%;
            max-width: 448px;
        }

        .algorithm-item {
            display: flex;
            flex-direction: column;
            padding: 1em;
            border-bottom: 1px solid #DDD;
            small {
                font-size: .75em;
            }

            .heading {
                padding-top: .5em;
                font-size: 2em;
            }
            .introduction {
                box-sizing: border-box;
                color: #444c50;
                line-height: 1.7em;
                padding: 1em 0;
            }
        }
    }
    .scatter-plot {
        flex: 1;
        height: 100vh;
    }
}
</style>
