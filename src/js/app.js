import Nodes from "./nodes.js"
import ImageViewer from "./modal.js"
import Breadcrumb from "./breadcrumb.js"
import Loading from './loading.js'
import {request} from "../api/index.js"

export default function App ($app) {
    this.cache = {}

    this.state = {
        isRoot : false,
        nodes : [],
        selectedFilePath: null,
        depth: [],
        isShow: true
    }
    
    const breadcrumb = new Breadcrumb({
        $app,
        depth: this.state.depth
    })

    const nodes = new Nodes({
        $app,
        initStates: {
            isRoot: this.state.isRoot,
            nodes: this.state.nodes
        },
        onClick: async (node) => {
            if(node.type === 'DIRECTORY') {
                loading.setIsShow(true)
                
                if(this.cache[node.id]) {
                    nodes.setStates({
                        ...this.state,
                        isRoot: false,
                        nodes: this.cache[node.id]
                    })
                } else {
                    const newNodes = await request(node.id)
                    nodes.setStates({
                        ...this.state,
                        isRoot: false,
                        nodes: newNodes
                    })

                    this.cache[node.id] = newNodes
                }
                
                this.state.depth.push(node)
                breadcrumb.render()
                loading.setIsShow(false)
            } else if(node.type === 'FILE') {
                this.state.selectedFilePath = node.filePath
                imageViewer.setImage(this.state.selectedFilePath)
            }
            
        },
        onBackClick: async() => {
            loading.setIsShow(true)
            const nextState = {...this.state}
            nextState.depth.pop()
            const prevNode = nextState.depth.length == 0 ? null : nextState.depth[nextState.depth.length-1]

            if(prevNode == null) {
                nodes.setStates({
                    ...this.state,
                    isRoot: true,
                    nodes: this.cache.root
                })
            }
            else if(this.cache[prevNode.id]) {
                nodes.setStates({
                    ...this.state,
                    isRoot: false,
                    nodes: this.cache[prevNode.id]
                })
            } else {
                const newNodes = await request(prevNode.id)
                nodes.setStates({
                    ...this.state,
                    isRoot: false,
                    nodes: newNodes
                })
                this.cache[prevNode.id] = newNodes
            }
            
            breadcrumb.setDepth(nextState.depth)
            loading.setIsShow(false)
        }
    })

    const loading = new Loading({
        $app,
        isShow: this.state.isShow
    })

    const imageViewer = new ImageViewer({
        $app,
        imagePath: this.state.selectedFilePath
    })

    const init = async () => {
        try {
            document.documentElement.setAttribute('color-theme', 'dark');
            loading.setIsShow(true)
            const rootNodes = await request('')
            nodes.setStates({
                ...this.state,
                isRoot: true,
                nodes: rootNodes
            })
            this.cache.root = rootNodes
            loading.setIsShow(false)
        } catch (e) {
            console.log(e.message)
        }
    }

    init()
}


