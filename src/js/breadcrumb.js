export default function Breadcrumb({ $app, depth }) {
    this.depth = depth
    this.$target = document.createElement('nav')
    this.$target.className = 'Breadcrumb'

    $app.appendChild(this.$target)

    this.setDepth = (depth) => {
        console.log(depth)
        this.depth = depth
        this.render()
    }

    this.render = () => {
        let breadcrumb = ''
        if(this.depth.length > 0) {
            breadcrumb = this.depth.map(el => {
                return `
                <div>${el.name}</div>
                `
            }).join('')
        }
        this.$target.innerHTML = `<div>root</div>${breadcrumb}`
        
    }

    this.render()
}