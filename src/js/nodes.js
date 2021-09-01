export default function Nodes({$app, initStates, onClick, onBackClick}) {
    this.onClick = onClick
    this.onBackClick = onBackClick
    this.states = initStates

    this.$target = document.createElement('div')
    this.$target.className = 'Nodes'
    $app.appendChild(this.$target)

    this.setStates = (newStates) => {
        this.states = newStates
        this.render()
    }

    this.render = () => {
        let nodeTemplate =this.states.nodes.map(node => {
            const iconPath = node.type === 'DIRECTORY'? './assets/directory.png' : './assets/file.png'
            return `<div class="Node" data-node-id="${node.id}"><img src="${iconPath}" /><div>${node.name}</div></div>`
        }).join('')
        
        if(this.states.isRoot) {
            this.$target.innerHTML = `${nodeTemplate}`
        } else {
            this.$target.innerHTML = `<div class="Node"><img src="./assets/prev.png"></div>${nodeTemplate}`
        }
    }

    this.$target.addEventListener('click', (e) => {
        const $node = e.target.closest('.Node')
        if($node) {
            const {nodeId} = $node.dataset
            if(nodeId) {
                const selectedNode = this.states.nodes.find(node => { return node.id === nodeId})
                this.onClick(selectedNode)
            } else {
                this.onBackClick()
            }
            
        }
        
    })
    this.render()
}